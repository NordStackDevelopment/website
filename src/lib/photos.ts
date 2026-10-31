// Photo collections. Sample data for now; Phase 3 swaps this for Supabase.
import raw from '../../sample-data/collections.json';

export interface Photo {
  src: string | null;
  caption: string;
  camera: string | null;
  lens: string | null;
  exposure: string | null;
  date: string | null;
}

export interface Collection {
  slug: string;
  title: string;
  place: string;
  year: number;
  dates: string | null;
  latitude: number | null;
  featured: boolean;
  intro: string;
  photos: Photo[];
}

export function hasExif(p: Photo): boolean {
  return Boolean(p.camera || p.lens || p.exposure || p.date);
}

export function formatLatitude(lat: number): string {
  return `${Math.round(Math.abs(lat))}° ${lat >= 0 ? 'N' : 'S'}`;
}

/** Newest year first; within a year, keep file order. */
export async function getCollections(): Promise<Collection[]> {
  return [...(raw as Collection[])].sort((a, b) => b.year - a.year);
}

export function groupByYear(cols: Collection[]): [number, Collection[]][] {
  const map = new Map<number, Collection[]>();
  for (const c of cols) map.set(c.year, [...(map.get(c.year) ?? []), c]);
  return [...map.entries()].sort((a, b) => b[0] - a[0]);
}

export const photoCount = (n: number) => `${n} ${n === 1 ? 'photo' : 'photos'}`;
