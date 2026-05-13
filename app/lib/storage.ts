import type { Resume } from "../sistema/paginas/curriculos/data";

const STORAGE_KEY = "sistema-curriculos-resumes";

export function loadStoredResumes(): Resume[] {
  if (typeof window === "undefined") {
    return [];
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored) as Resume[];
  } catch {
    return [];
  }
}

export function saveStoredResume(resume: Resume) {
  const stored = loadStoredResumes();
  const updated = stored.filter((item) => item.id !== resume.id);
  updated.unshift(resume);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}

export function getStoredResumeById(id: string) {
  return loadStoredResumes().find((resume) => resume.id === id);
}
