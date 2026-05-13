'use client';

import Image from "next/image";
import Link from "next/link";
import { FiChevronRight, FiMapPin } from "react-icons/fi";
import { useEffect, useState } from "react";
import { loadStoredResumes } from "../../../lib/storage";
import { resumes, type Resume } from "./data";
import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";

export default function CurriculosPage() {
  const [resumeList, setResumeList] = useState<Resume[]>(resumes);

  useEffect(() => {
    const stored = loadStoredResumes();
    const merged = new Map<string, Resume>();

    stored.forEach((item) => merged.set(item.id, item));
    resumes.forEach((item) => {
      if (!merged.has(item.id)) {
        merged.set(item.id, item);
      }
    });

    setResumeList(Array.from(merged.values()));
  }, []);

  return (
    <div className="bg-slate-950 py-16 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">Lista de Currículos</p>
            <h1 className="mt-3 text-4xl font-semibold text-white">Candidatos prontos para avaliação</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">
              Veja perfis resumidos com nome, cargo e resumo profissional. Clique para abrir detalhes ou realizar ações de gestão.
            </p>
          </div>
          <Link href="/sistema/paginas/curriculos/novo">
            <Button className="bg-blue-600 text-white hover:bg-blue-700">Adicionar novo currículo</Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {resumeList.map((resume) => (
            <Card key={resume.id} className="space-y-5 border border-slate-800 bg-slate-900 text-slate-100 shadow-lg shadow-blue-950/20">
              <div className="flex items-center gap-4">
                <Image
                  src={resume.image}
                  alt={resume.name}
                  width={56}
                  height={56}
                  className="h-14 w-14 rounded-full bg-slate-800 object-cover"
                />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">{resume.role}</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">{resume.name}</h2>
                </div>
              </div>

              <p className="text-sm leading-6 text-slate-300">{resume.summary}</p>
              <div className="flex flex-wrap gap-2">
                {resume.skills.map((skill) => (
                  <span key={skill} className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-200">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link href={`/sistema/paginas/curriculos/${resume.id}`}>
                  <span className="inline-flex cursor-pointer items-center rounded-full border border-blue-500 bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
                    Ver detalhes
                    <FiChevronRight className="ml-2 h-4 w-4" />
                  </span>
                </Link>
                <span className="inline-flex items-center gap-1 text-sm text-slate-400">
                  <FiMapPin className="h-4 w-4 text-blue-300" />
                  {resume.location}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
