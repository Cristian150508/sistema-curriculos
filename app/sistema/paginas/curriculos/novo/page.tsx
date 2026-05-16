'use client';

import type { ChangeEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray, type Resolver } from "react-hook-form";
import { FiMinus, FiPlus } from "react-icons/fi";
import InputMask from "react-input-mask-next";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Toaster, toast } from "sonner";
import type { Resume } from "../../../../sistema/paginas/curriculos/data";
import { saveStoredResume } from "../../../../lib/storage";
import { Button } from "../../../../components/ui/button";
import { Card } from "../../../../components/ui/card";

const schema = yup.object({
  name: yup.string().min(3, "Nome precisa ter pelo menos 3 caracteres").required("Nome é obrigatório"),
  role: yup.string().min(5, "Cargo precisa ter pelo menos 5 caracteres").required("Cargo desejado é obrigatório"),
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  phone: yup.string().required("Telefone é obrigatório"),
  cpf: yup
    .string()
    .matches(/^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/, "CPF deve seguir o formato 000.000.000-00")
    .required("CPF é obrigatório"),
  dateOfBirth: yup
    .string()
    .matches(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/, "Data deve seguir o formato DD/MM/AAAA")
    .required("Data de nascimento é obrigatória"),
  summary: yup.string().min(20, "Resumo profissional precisa ter pelo menos 20 caracteres").required("Resumo profissional é obrigatório"),
  experience: yup
    .array()
    .of(
      yup.object({
        value: yup.string().min(10, "Cada experiência precisa ter pelo menos 10 caracteres").required("Experiência é obrigatória"),
      })
    )
    .min(1, "Adicione pelo menos uma experiência profissional"),
  education: yup
    .array()
    .of(
      yup.object({
        value: yup.string().min(10, "Cada formação precisa ter pelo menos 10 caracteres").required("Formação é obrigatória"),
      })
    )
    .min(1, "Adicione pelo menos uma formação acadêmica"),
  skills: yup.string().min(5, "Habilidades precisam ter pelo menos 5 caracteres").required("Habilidades são obrigatórias"),
});

type FormData = {
  name: string;
  role: string;
  email: string;
  phone: string;
  cpf: string;
  dateOfBirth: string;
  summary: string;
  experience: Array<{ value: string }>;
  education: Array<{ value: string }>;
  skills: string;
};

export default function NewResumePage() {
  const router = useRouter();
  const [imageName, setImageName] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema) as Resolver<FormData>,
    defaultValues: {
      experience: [{ value: "" }],
      education: [{ value: "" }],
    },
    mode: "onChange", // Validação em tempo real
  });
  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({ control, name: "experience" as const });
  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({ control, name: "education" as const });

  const getFirstErrorMessage = (errorObj: any): string | null => {
    if (typeof errorObj === 'string') return errorObj;
    if (errorObj?.message) return errorObj.message;
    if (Array.isArray(errorObj)) {
      for (const item of errorObj) {
        const msg = getFirstErrorMessage(item);
        if (msg) return msg;
      }
    }
    if (typeof errorObj === 'object' && errorObj !== null) {
      for (const key in errorObj) {
        const msg = getFirstErrorMessage(errorObj[key]);
        if (msg) return msg;
      }
    }
    return null;
  };

  async function onSubmit(data: FormData) {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      // Simular delay de processamento
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newResume: Resume = {
        id: String(Date.now()),
        name: data.name.trim(),
        role: data.role.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        cpf: data.cpf.trim(),
        dateOfBirth: data.dateOfBirth,
        summary: data.summary.trim(),
        experience: data.experience.filter((item) => item.value.trim() !== ""),
        education: data.education.filter((item) => item.value.trim() !== ""),
        skills: data.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
        location: "Localidade não especificada",
        portfolio: "https://example.com",
        image: "/profile-placeholder.svg",
      };

      saveStoredResume(newResume);
      toast.success("Currículo cadastrado com sucesso (upload fake)!");
      reset();
      setImageName(null);
      router.push("/sistema/paginas/curriculos");
    } catch (error) {
      toast.error("Erro ao salvar currículo. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function onError(errors: Record<string, any>) {
    const firstError = getFirstErrorMessage(errors);
    setSubmitError(firstError || "Revise os campos obrigatórios do formulário.");
    toast.error(firstError || "Revise os campos obrigatórios do formulário.");
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      setImageName(file.name);
      toast(`Imagem selecionada: ${file.name}`);
    }
  }

  return (
    <div className="bg-slate-950 py-16 text-slate-100">
      <Toaster position="top-right" />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">Cadastro</p>
          <h1 className="mt-3 text-4xl font-semibold text-white">Novo currículo</h1>
          <p className="mt-3 text-base leading-7 text-slate-300">
            Preencha o formulário abaixo para criar um novo currículo. O upload de imagem é simulado para demonstrar o fluxo.
          </p>
        </div>

        <Card className="space-y-8 p-8 border border-slate-800 bg-slate-900 text-slate-100">
          <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium text-slate-100">
                Nome completo
                <input
                  {...register("name")}
                  className="rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Marina Souza"
                />
                {errors.name && <span className="text-sm text-destructive">{errors.name.message}</span>}
              </label>
              <label className="grid gap-2 text-sm font-medium text-slate-100">
                Cargo desejado
                <input
                  {...register("role")}
                  className="rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Desenvolvedora Front-end"
                />
                {errors.role && <span className="text-sm text-destructive">{errors.role.message}</span>}
              </label>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium text-slate-100">
                Email
                <input
                  {...register("email")}
                  className="rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="marina@example.com"
                />
                {errors.email && <span className="text-sm text-destructive">{errors.email.message}</span>}
              </label>
              <label className="grid gap-2 text-sm font-medium text-slate-100">
                Data de nascimento
                <InputMask
                  mask="99/99/9999"
                  {...register("dateOfBirth")}
                  className="rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="DD/MM/AAAA"
                />
                {errors.dateOfBirth && <span className="text-sm text-destructive">{errors.dateOfBirth.message}</span>}
              </label>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium text-slate-100">
                Telefone
                <InputMask
                  mask="(99) 99999-9999"
                  {...register("phone")}
                  className="rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="(11) 99999-9999"
                />
                {errors.phone && <span className="text-sm text-destructive">{errors.phone.message}</span>}
              </label>
              <label className="grid gap-2 text-sm font-medium text-slate-100">
                CPF
                <InputMask
                  mask="999.999.999-99"
                  {...register("cpf")}
                  className="rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="000.000.000-00"
                />
                {errors.cpf && <span className="text-sm text-destructive">{errors.cpf.message}</span>}
              </label>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <label className="grid gap-2 text-sm font-medium text-slate-100">
                Habilidades
                <input
                  {...register("skills")}
                  className="rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Next.js, TypeScript, UX, comunicação"
                />
                {errors.skills && <span className="text-sm text-destructive">{errors.skills.message}</span>}
              </label>
              <label className="grid gap-2 text-sm font-medium text-slate-100">
                Foto do candidato (upload fake)
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                {imageName && <span className="text-sm text-slate-500">Arquivo selecionado: {imageName}</span>}
              </label>
            </div>

            <label className="grid gap-2 text-sm font-medium text-slate-100">
              Resumo profissional
              <textarea
                {...register("summary")}
                rows={5}
                className="rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Descreva a experiência e os diferenciais do candidato"
              />
              {errors.summary && <span className="text-sm text-destructive">{errors.summary.message}</span>}
            </label>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-4 rounded-3xl border border-slate-700 bg-slate-950 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">Experiências profissionais</p>
                    <p className="text-sm text-slate-300">Adicione experiências separadas.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => appendExperience({ value: "" })}
                    className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    <FiPlus className="h-4 w-4" />
                    Adicionar
                  </button>
                </div>
                {experienceFields.map((field, index) => (
                  <label key={field.id} className="grid gap-2 text-sm font-medium text-slate-100">
                    Experiência #{index + 1}
                    <textarea
                      {...register(`experience.${index}.value` as const)}
                      rows={3}
                      className="rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      placeholder="Descrição da experiência"
                    />
                    {errors.experience?.[index]?.value && (
                      <span className="text-sm text-red-400">{errors.experience[index]?.value?.message as string}</span>
                    )}
                    {experienceFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeExperience(index)}
                        className="inline-flex items-center gap-2 text-sm font-medium text-red-400 hover:text-red-300"
                      >
                        <FiMinus className="h-4 w-4" />
                        Remover
                      </button>
                    )}
                  </label>
                ))}
                {errors.experience && !Array.isArray(errors.experience) && (
                  <span className="text-sm text-red-400">{errors.experience.message as string}</span>
                )}
              </div>

              <div className="space-y-4 rounded-3xl border border-slate-700 bg-slate-950 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">Formações acadêmicas</p>
                    <p className="text-sm text-slate-300">Registre cada formação separadamente.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => appendEducation({ value: "" })}
                    className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    <FiPlus className="h-4 w-4" />
                    Adicionar
                  </button>
                </div>
                {educationFields.map((field, index) => (
                  <label key={field.id} className="grid gap-2 text-sm font-medium text-slate-100">
                    Formação #{index + 1}
                    <textarea
                      {...register(`education.${index}.value` as const)}
                      rows={3}
                      className="rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      placeholder="Descrição da formação"
                    />
                    {errors.education?.[index]?.value && (
                      <span className="text-sm text-red-400">{errors.education[index]?.value?.message as string}</span>
                    )}
                    {educationFields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeEducation(index)}
                        className="inline-flex items-center gap-2 text-sm font-medium text-red-400 hover:text-red-300"
                      >
                        <FiMinus className="h-4 w-4" />
                        Remover
                      </button>
                    )}
                  </label>
                ))}
                {errors.education && !Array.isArray(errors.education) && (
                  <span className="text-sm text-red-400">{errors.education.message as string}</span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white hover:bg-blue-700 disabled:bg-slate-600 disabled:text-slate-400"
              >
                {isSubmitting ? "Salvando..." : "Salvar currículo"}
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={isSubmitting}
                className="border-slate-700 text-slate-100 hover:border-blue-500 hover:text-white disabled:border-slate-600 disabled:text-slate-500"
                onClick={() => {
                  reset();
                  setImageName(null);
                }}
              >
                Limpar formulário
              </Button>
            </div>
            {isSubmitted && submitError && (
              <p className="text-sm text-red-400">{submitError}</p>
            )}
          </form>
        </Card>
      </div>
    </div>
  );
}
