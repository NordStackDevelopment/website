// Reads build logs written as Markdown in content/<slug>/build-log.md.
// Until Supabase is connected (Phase 3) these files are where build logs live.
import { marked } from 'marked';

export type LayerStatus = 'Done' | 'In progress' | 'Next';

export interface Layer {
  number: number;
  title: string;
  status: LayerStatus;
  dates: string;
  photo: string | null;
  caption: string;
  html: string;
  words: number;
}

export interface PartsTable {
  headers: string[];
  rows: string[][];
}

export interface BuildLog {
  slug: string;
  title: string;
  summary: string;
  status: string;
  started: string;
  updated: string;
  layers: Layer[];
  parts: PartsTable | null;
  files: { label: string; href: string }[];
  readingMinutes: number;
}

const sources = import.meta.glob('/content/*/build-log.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const images = import.meta.glob('/content/*/images/*', { query: '?url', import: 'default', eager: true }) as Record<string, string>;

function frontmatter(src: string): [Record<string, string>, string] {
  const m = src.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return [{}, src];
  const data: Record<string, string> = {};
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i > 0) data[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return [data, src.slice(m[0].length)];
}

function splitSections(body: string): { heading: string; text: string }[] {
  const clean = body.replace(/<!--[\s\S]*?-->/g, '');
  const parts = clean.split(/^## /m).slice(1);
  return parts.map((p) => {
    const nl = p.indexOf('\n');
    return { heading: p.slice(0, nl).trim(), text: p.slice(nl + 1) };
  });
}

function field(text: string, name: string): string {
  const m = text.match(new RegExp(`^- \\*\\*${name}:\\*\\*\\s*(.*)$`, 'm'));
  return m ? m[1].trim() : '';
}

function stripFields(text: string): string {
  return text.replace(/^- \*\*(Status|Dates|Photo|Caption):\*\*.*$\n?/gm, '').trim();
}

function parseTable(text: string): PartsTable | null {
  const lines = text.split('\n').filter((l) => l.trim().startsWith('|'));
  if (lines.length < 2) return null;
  const cells = (l: string) => l.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());
  const rows = lines.slice(2).map(cells).filter((r) => r.some(Boolean));
  return rows.length ? { headers: cells(lines[0]), rows } : null;
}

function resolvePhoto(slug: string, value: string): string | null {
  const path = value.replace(/`/g, '').trim();
  if (!path || path.toLowerCase().startsWith('none')) return null;
  return images[`/content/${slug}/${path}`] ?? null;
}

function parse(path: string, src: string): BuildLog {
  const slug = path.split('/')[2];
  const [fm, body] = frontmatter(src);
  const layers: Layer[] = [];
  let parts: PartsTable | null = null;
  const files: { label: string; href: string }[] = [];

  for (const s of splitSections(body)) {
    const lm = s.heading.match(/^Layer (\d+)\s*·\s*(.+)$/);
    if (lm) {
      const notes = stripFields(s.text);
      layers.push({
        number: Number(lm[1]),
        title: lm[2].trim(),
        status: (field(s.text, 'Status') || 'Next') as LayerStatus,
        dates: field(s.text, 'Dates'),
        photo: resolvePhoto(slug, field(s.text, 'Photo')),
        caption: field(s.text, 'Caption'),
        html: marked.parse(notes, { async: false }),
        words: notes.split(/\s+/).filter(Boolean).length,
      });
    } else if (/^parts/i.test(s.heading)) {
      parts = parseTable(s.text);
    } else if (/^files/i.test(s.heading)) {
      for (const m of s.text.matchAll(/^- \[(.+?)\]\((.+?)\)/gm)) files.push({ label: m[1], href: m[2] });
    }
  }

  layers.sort((a, b) => a.number - b.number);
  const words = layers.reduce((n, l) => n + l.words, 0);
  return {
    slug,
    title: fm.title ?? slug,
    summary: fm.summary ?? '',
    status: fm.status ?? 'In progress',
    started: fm.started ?? '',
    updated: fm.updated ?? fm.started ?? '',
    layers,
    parts,
    files,
    readingMinutes: Math.max(1, Math.round(words / 200)),
  };
}

export function getBuildLogs(): BuildLog[] {
  return Object.entries(sources)
    .map(([p, src]) => parse(p, src))
    .sort((a, b) => b.updated.localeCompare(a.updated));
}

/** The newest layer that has a photo: shown first, as "where it stands now". */
export function latestPhoto(log: BuildLog): Layer | undefined {
  return [...log.layers].reverse().find((l) => l.photo);
}
