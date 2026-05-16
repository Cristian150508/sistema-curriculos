'use client';

import Image from "next/image";
import Link from "next/link";
import { FiGlobe, FiLayers, FiMail, FiMapPin, FiPhone, FiShield, FiUser } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getResumeById, type Resume } from "../data";
import { getStoredResumeById } from "../../../../lib/storage";
import { Button } from "../../../../components/ui/button";
import { Card } from "../../../../components/ui/card";

export default function ResumeDetailsPage() {
  const params = useParams();
  const resumeId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const [resume, setResume] = useState<Resume | null | undefined>(undefined);

  useEffect(() => {
    if (!resumeId) {
      setResume(null);
      return;
    }

    const storedResume = getStoredResumeById(resumeId);
    if (storedResume) {
      setResume(storedResume);
      return;
    }

    const defaultResume = getResumeById(resumeId);
    setResume(defaultResume ?? null);
  }, [resumeId]);

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
              <div className="space-y-2">
                <p className="inline-flex items-center gap-2 text-slate-300">
                  <FiLayers className="h-4 w-4 text-blue-400" />
                  Formação:
                </p>
                <div className="ml-7 space-y-1 text-slate-300">
                  {resume.education.map((edu, index) => (
                    <p key={index}>{edu.value}</p>
                  ))}
                </div>
              </div>
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
            <h2 className="text-2xl font-semibold text-white">Resumo profissional</h2>
            <p className="text-slate-300">{resume.summary}</p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Experiência</h3>
            <div className="space-y-2 text-slate-300">
              {resume.experience.map((exp, index) => (
                <p key={index}>{exp.value}</p>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Competências</h3>
            <div className="flex flex-wrap gap-3">
              {resume.skills.map((skill) => (
                <span key={skill} className="rounded-full bg-slate-800 px-3 py-1 text-sm font-medium text-slate-200">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        </Card>

        <div className="mt-8 flex flex-wrap gap-3">
          <button className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
            Aprovar candidato
          </button>
          <button className="rounded-full border border-slate-700 bg-transparent px-6 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-800">
            Rejeitar candidato
          </button>
          <button className="rounded-full border border-red-500 bg-red-600/10 px-6 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-600/20">
            Marcar para revisão
          </button>
        </div>
      </div>
    </div>
  );
}
