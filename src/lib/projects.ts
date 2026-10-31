// Reads projects written as Markdown in content/projects/<slug>.md.
// Until Supabase is connected (Phase 3) these files are where projects live.
import { marked } from 'marked';

export type ProjectKind = 'app' | 'tool' | 'web' | 'script';

export interface Shot { src: string; caption: string }

export interface Project {
  slug: string;
  title: string;
  kind: ProjectKind;
  year: string;
  status: string;
  summary: string;
  stack: string;
  role: string;
  started: string;
  github: string | null;
  live: string | null;
  tags: string[];
  cover: string | null;
  screenshots: Shot[];
  series: string | null;
  seriesPart: number | null;
  seriesTotal: number | null;
  build: string | null;
  html: string;
}

export const kindLabels: Record<ProjectKind, string> = { app: 'App', tool: 'Tool', web: 'Web', script: 'Script' };

const sources = import.meta.glob('/content/projects/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const images = import.meta.glob('/content/projects/images/*', { query: '?url', import: 'default', eager: true }) as Record<string, string>;

function parseFrontmatter(src: string): [Record<string, string[]>, string] {
  const m = src.match(/^---\n([\s\S]*?)\n---\n?/);
  const data: Record<string, string[]> = {};
  if (!m) return [data, src];
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i > 0) (data[line.slice(0, i).trim()] ??= []).push(line.slice(i + 1).trim());
  }
  return [data, src.slice(m[0].length)];
}

const img = (p?: string) => (p ? images[`/content/projects/${p.trim()}`] ?? null : null);
const list = (v?: string) => (v ? v.split(',').map((s) => s.trim()).filter(Boolean) : []);

function parse(path: string, src: string): Project & { published: boolean } {
  const [fm, body] = parseFrontmatter(src);
  const one = (k: string) => fm[k]?.[0] ?? '';
  const [part, total] = one('series_part').split('/').map((n) => Number(n.trim()) || null);
  return {
    slug: one('slug') || path.split('/').pop()!.replace(/\.md$/, ''),
    title: one('title'),
    kind: (one('kind') || 'web') as ProjectKind,
    year: one('year'),
    status: one('status'),
    summary: one('summary'),
    stack: one('stack'),
    role: one('role'),
    started: one('started'),
    github: one('github') || null,
    live: one('live') || null,
    tags: list(one('tags')),
    cover: img(one('cover')),
    screenshots: (fm.screenshot ?? []).map((s) => {
      const [p, caption = ''] = s.split('|').map((x) => x.trim());
      return { src: img(p) ?? '', caption };
    }).filter((s) => s.src),
    series: one('series') || null,
    seriesPart: part ?? null,
    seriesTotal: total ?? null,
    build: one('build') || null,
    html: marked.parse(body.trim(), { async: false }),
    published: one('published') !== 'false',
  };
}

export function getProjectList(): Project[] {
  return Object.entries(sources)
    .map(([p, s]) => parse(p, s))
    .filter((p) => p.published)
    .sort((a, b) => b.started.localeCompare(a.started) || a.title.localeCompare(b.title));
}
