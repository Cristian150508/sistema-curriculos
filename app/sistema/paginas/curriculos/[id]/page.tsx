'use client';

import Image from "next/image";
import Link from "next/link";
import { FiGlobe, FiLayers, FiMail, FiMapPin, FiPhone, FiShield, FiUser } from "react-icons/fi";
import { useEffect, useState } from "react";
import { getResumeById, type Resume } from "../data";
import { getStoredResumeById } from "../../../../lib/storage";
import { Button } from "../../../../components/ui/button";
import { Card } from "../../../../components/ui/card";

interface Props {
  params: {
    id: string;
  };
}

export default function ResumeDetailsPage({ params }: Props) {
  const [resume, setResume] = useState<Resume | null | undefined>(undefined);

  useEffect(() => {
    const storedResume = getStoredResumeById(params.id);
    if (storedResume) {
      setResume(storedResume);
      return;
    }

    const defaultResume = getResumeById(params.id);
    setResume(defaultResume ?? null);
  }, [params.id]);

  if (resume === undefined) {
    return (
      <div className="bg-slate-950 py-16 text-slate-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-base text-slate-300">Carregando currículo...</p>
        </div>
      </div>
    );
  }

  if (resume === null) {
    return (
      <div className="bg-slate-950 py-16 text-slate-100">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-base text-red-400">Currículo não encontrado.</p>
          <Link href="/sistema/paginas/curriculos">
            <Button variant="secondary">Voltar à lista</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 py-16 text-slate-100">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Image
              src={resume.image}
              alt={resume.name}
              width={96}
              height={96}
              className="rounded-full bg-slate-800 object-cover"
            />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">Detalhes do Currículo</p>
              <h1 className="mt-3 text-4xl font-semibold text-white">{resume.name}</h1>
              <p className="mt-2 text-base text-slate-300">{resume.role} · {resume.location}</p>
            </div>
          </div>
          <Link href="/sistema/paginas/curriculos">
            <Button variant="secondary">Voltar à lista</Button>
          </Link>
        </div>
        <div className="mb-4 flex items-center gap-2 text-sm text-slate-300">
          <FiMapPin className="h-4 w-4 text-blue-300" />
          <span>{resume.location}</span>
        </div>

        <Card className="space-y-6 border border-slate-800 bg-slate-900 text-slate-100">
          <section className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3 rounded-3xl border border-slate-800 bg-slate-950 p-6">
              <h3 className="text-lg font-semibold text-white">Dados principais</h3>
              <p className="inline-flex items-center gap-2 text-slate-300">
                <FiUser className="h-4 w-4 text-primary" />
                Nascimento: {resume.dateOfBirth}
              </p>
              <p className="inline-flex items-center gap-2 text-slate-300">
                <FiShield className="h-4 w-4 text-red-400" />
                CPF: {resume.cpf}
              </p>
              <p className="inline-flex items-center gap-2 text-slate-300">
                <FiLayers className="h-4 w-4 text-blue-400" />
                Formação: {resume.education}
              </p>
            </div>
            <div className="space-y-3 rounded-3xl border border-slate-800 bg-slate-950 p-6">
              <h3 className="text-lg font-semibold text-white">Contato</h3>
              <p className="inline-flex items-center gap-2 text-slate-300">
                <FiMail className="h-4 w-4 text-blue-300" />
                Email: {resume.email}
              </p>
              <p className="inline-flex items-center gap-2 text-slate-300">
                <FiPhone className="h-4 w-4 text-blue-300" />
                Telefone: {resume.phone}
              </p>
              <p className="inline-flex items-center gap-2 text-slate-300">
                <FiGlobe className="h-4 w-4 text-blue-300" />
                Portfolio: {resume.portfolio}
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-slate-950">Resumo profissional</h2>
            <p className="text-slate-600">{resume.summary}</p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-950">Experiência</h3>
            <p className="text-slate-600">{resume.experience}</p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-950">Competências</h3>
            <div className="flex flex-wrap gap-3">
              {resume.skills.map((skill) => (
                <span key={skill} className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </Card>

        <div className="mt-8 flex flex-wrap gap-3">
          <button className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">
            Aprovar candidato
          </button>
          <button className="rounded-full border border-input bg-transparent px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-slate-100">
            Rejeitar candidato
          </button>
          <button className="rounded-full border border-destructive bg-destructive/10 px-6 py-3 text-sm font-semibold text-destructive transition hover:bg-destructive/20">
            Marcar para revisão
          </button>
        </div>
      </div>
    </div>
  );
}
