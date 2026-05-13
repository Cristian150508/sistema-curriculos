import Link from "next/link";
import { Card } from "./ui/card";
import type { Resume } from "../sistema/paginas/curriculos/data";

interface ResumeCardProps {
  resume: Resume;
}

export function ResumeCard({ resume }: ResumeCardProps) {
  return (
    <Card className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-accent-foreground">
            {resume.role}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-slate-950">
            {resume.name}
          </h3>
        </div>
      </div>

      <p className="text-sm leading-6 text-slate-600">{resume.summary}</p>
      <div className="flex flex-wrap gap-2">
        {resume.skills.map((skill) => (
          <span key={skill} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
            {skill}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Link href={`/sistema/paginas/curriculos/${resume.id}`}>
          <span className="inline-flex cursor-pointer items-center rounded-full border border-input px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-slate-100">
            Ver detalhes
          </span>
        </Link>
      </div>
    </Card>
  );
}
