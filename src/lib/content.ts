// The one place pages get their content from.
// Phase 1–2: sample JSON in sample-data/. Phase 3: the same functions read published rows from Supabase.
import settings from '../../sample-data/settings.json';
import builds from '../../sample-data/builds.json';
import work from '../../sample-data/work.json';
import homePhotos from '../../sample-data/home-photos.json';

export type LayerStatus = 'Done' | 'In progress' | 'Next';

export interface Settings {
  role_line: string;
  about_short: string;
  github: string;
  instagram: string | null;
  email: string | null;
}

export interface BuildLayerSummary {
  number: number;
  title: string;
  status: LayerStatus;
}

export interface Build {
  slug: string;
  title: string;
  summary: string;
  status: string;
  started: string;
  updated: string;
  published: boolean;
  layers: BuildLayerSummary[];
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

export async function getBuilds(): Promise<Build[]> {
  return (builds as Build[]).filter((b) => b.published);
}

/** The build shown under "Now building" on Home: the most recently updated one still in progress. */
export async function getCurrentBuild(): Promise<Build | undefined> {
  const all = await getBuilds();
  return all
    .filter((b) => b.status === 'In progress')
    .sort((a, b) => b.updated.localeCompare(a.updated))[0];
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
