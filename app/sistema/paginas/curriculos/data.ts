export interface Resume {
  id: string;
  name: string;
  role: string;
  summary: string;
  location: string;
  experience: { value: string }[];
  education: { value: string }[];
  skills: string[];
  email: string;
  phone: string;
  cpf: string;
  dateOfBirth: string;
  portfolio: string;
  image: string;
}

export const resumes: Resume[] = [
  {
    id: "1",
    name: "Marina Souza",
    role: "Desenvolvedora Front-end",
    summary:
      "Criadora de interfaces responsivas e acessíveis com foco em experiência do usuário.",
    location: "São Paulo, SP",
    experience: [
      { value: "5 anos de experiência em Next.js, React, Tailwind CSS e integrações com APIs REST." }
    ],
    education: [
      { value: "Bacharel em Ciência da Computação pela USP" }
    ],
    skills: ["Next.js", "React", "Tailwind", "TypeScript", "Yup"],
    email: "marina.souza@example.com",
    phone: "+55 (11) 98765-4321",
    cpf: "123.456.789-00",
    dateOfBirth: "15/06/1992",
    portfolio: "https://marinasouza.dev",
    image: "/profile-1.svg",
  },
  {
    id: "2",
    name: "Gabriel Lima",
    role: "Analista de Produto",
    summary:
      "Profissional com visão estratégica e comunicação clara entre design e desenvolvimento.",
    location: "Rio de Janeiro, RJ",
    experience: [
      { value: "4 anos trabalhando com produtos digitais e gerenciamento de requisitos." }
    ],
    education: [
      { value: "MBA em Gestão de Produtos Digitais pela FGV" }
    ],
    skills: ["Product", "UX", "Roadmap", "Miro", "Figma"],
    email: "gabriel.lima@example.com",
    phone: "+55 (21) 99876-5432",
    cpf: "987.654.321-00",
    dateOfBirth: "28/02/1990",
    portfolio: "https://gabriellima.com",
    image: "/profile-2.svg",
  },
  {
    id: "3",
    name: "Beatriz Oliveira",
    role: "Engenheira de Dados",
    summary:
      "Especialista em pipelines, banco de dados e visualização de indicadores.",
    location: "Belo Horizonte, MG",
    experience: [
      { value: "6 anos com ETL, AWS e automação de relatórios para equipes de dados." }
    ],
    education: [
      { value: "Engenharia de Computação pela UFMG" }
    ],
    skills: ["Python", "SQL", "AWS", "Airflow", "Power BI"],
    email: "beatriz.oliveira@example.com",
    phone: "+55 (31) 91234-5678",
    cpf: "321.654.987-00",
    dateOfBirth: "12/09/1988",
    portfolio: "https://beatrizoliveira.dev",
    image: "/profile-3.svg",
  },
];

export function getResumeById(id: string) {
  return resumes.find((resume) => resume.id === id);
}
