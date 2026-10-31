// The one place pages get their content from.
// Phase 1–2: sample JSON in sample-data/ and Markdown build logs in content/. Phase 3: the same functions read published rows from Supabase.
import settings from '../../sample-data/settings.json';
import { getBuildLogs, type BuildLog } from './buildlog';
import { getProjectList, type Project } from './projects';
import work from '../../sample-data/work.json';
import homePhotos from '../../sample-data/home-photos.json';

export type { BuildLog, Layer, LayerStatus } from './buildlog';
export type { Project, ProjectKind } from './projects';
export { kindLabels } from './projects';

export interface Settings {
  role_line: string;
  about_short: string;
  github: string;
  instagram: string | null;
  email: string | null;
}

export type WorkKind = 'project' | 'build' | 'photo';

export interface WorkItem {
  kind: WorkKind;
  href: string;
  meta: string;
  title: string;
  line: string;
}

export interface HomePhoto {
  caption: string;
  alt: string;
  src: string | null;
  wide: boolean;
}

export async function getSettings(): Promise<Settings> {
  return settings as Settings;
}

export async function getBuilds(): Promise<BuildLog[]> {
  return getBuildLogs();
}

/** The build shown under "Now building" on Home: the most recently updated one still in progress. */
export async function getCurrentBuild(): Promise<BuildLog | undefined> {
  return (await getBuilds()).find((b) => b.status === 'In progress');
}

export async function getProjects(): Promise<Project[]> {
  return getProjectList();
}

/** "2026-10" → "October 2026" */
export function formatMonth(ym: string): string {
  if (!/^\d{4}-\d{2}$/.test(ym)) return ym;
  return new Date(ym + '-01T00:00:00Z').toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' });
}

export async function getWork(): Promise<WorkItem[]> {
  return work as WorkItem[];
}

export async function getHomePhotos(): Promise<HomePhoto[]> {
  return homePhotos as HomePhoto[];
}

export function formatDate(iso: string): string {
  return new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC',
  });
}

/** Formats "2026-10-30 – 2026-10-31" or "2026-10-31 –" as readable dates. */
export function formatRange(range: string): string {
  return range.replace(/\d{4}-\d{2}-\d{2}/g, (d) => formatDate(d)).trim();
}
