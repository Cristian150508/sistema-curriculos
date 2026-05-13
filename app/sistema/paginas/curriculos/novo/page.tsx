'use client';

import type { ChangeEvent } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
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
  experience: yup.string().min(10, "Experiências precisam ter pelo menos 10 caracteres").required("Experiências profissionais são obrigatórias"),
  education: yup.string().min(10, "Formações precisam ter pelo menos 10 caracteres").required("Formações acadêmicas são obrigatórias"),
  skills: yup.string().min(5, "Habilidades precisam ter pelo menos 5 caracteres").required("Habilidades são obrigatórias"),
});

type FormData = yup.InferType<typeof schema>;

export default function NewResumePage() {
  const [imageName, setImageName] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  function onSubmit(data: FormData) {
    const newResume: Resume = {
      id: String(Date.now()),
      name: data.name.trim(),
      role: data.role.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      cpf: data.cpf.trim(),
      dateOfBirth: data.dateOfBirth,
      summary: data.summary.trim(),
      experience: data.experience.trim(),
      education: data.education.trim(),
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
  }

  function onError(errors: Record<string, any>) {
    const firstError = Object.values(errors)[0]?.message;
    toast.error(firstError ?? "Revise os campos obrigatórios do formulário.");
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

            <label className="grid gap-2 text-sm font-medium text-slate-100">
              Experiências profissionais
              <textarea
                {...register("experience")}
                rows={4}
                className="rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Descreva as principais experiências profissionais"
              />
              {errors.experience && <span className="text-sm text-destructive">{errors.experience.message}</span>}
            </label>

            <label className="grid gap-2 text-sm font-medium text-slate-100">
              Formações acadêmicas
              <textarea
                {...register("education")}
                rows={4}
                className="rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                placeholder="Detalhe cursos, graduação e certificações"
              />
              {errors.education && <span className="text-sm text-destructive">{errors.education.message}</span>}
            </label>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">Salvar currículo</Button>
              <Button
                type="button"
                variant="outline"
                className="border-slate-700 text-slate-100 hover:border-blue-500 hover:text-white"
                onClick={() => {
                  reset();
                  setImageName(null);
                }}
              >
                Limpar formulário
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
