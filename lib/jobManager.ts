import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

export interface Job {
  id: string;
  keyword: string;
  silo: string;
  status: 'pending' | 'research' | 'outline' | 'article' | 'meta' | 'links' | 'completed' | 'error';
  progress: number; // 0-100
  startedAt: string;
  completedAt?: string;
  error?: string;
  result?: {
    filePath: string;
    url: string;
    metadata: any;
    validation?: any;
  };
}

const JOBS_DIR = join(process.cwd(), 'jobs');

export function createJob(keyword: string, silo: string): Job {
  const job: Job = {
    id: `job-${Date.now()}-${Math.random().toString(36).substring(7)}`,
    keyword,
    silo,
    status: 'pending',
    progress: 0,
    startedAt: new Date().toISOString(),
  };

  saveJob(job);
  return job;
}

export function getJob(jobId: string): Job | null {
  const filePath = join(JOBS_DIR, `${jobId}.json`);
  if (!existsSync(filePath)) {
    return null;
  }

  try {
    const content = readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
}

export function updateJob(jobId: string, updates: Partial<Job>): void {
  const job = getJob(jobId);
  if (!job) return;

  const updatedJob = { ...job, ...updates };
  saveJob(updatedJob);
}

function saveJob(job: Job): void {
  const filePath = join(JOBS_DIR, `${job.id}.json`);
  writeFileSync(filePath, JSON.stringify(job, null, 2));
}
