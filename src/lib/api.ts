const BASE = import.meta.env.VITE_API_URL ?? "/api";

async function get<T>(path: string, params?: Record<string, string>): Promise<T> {
  const url = new URL(`${BASE}${path}`, window.location.origin);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      if (v) url.searchParams.set(k, v);
    }
  }
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json() as Promise<T>;
}

export type Event = {
  id: string;
  title: string;
  host: string;
  host_id: string;
  city: string;
  country: string | null;
  langs: string[];
  verso_reward: number;
  nft: boolean;
  mode: string;
  category: string;
  date: string;
  date_label: string;
  participants: number;
  capacity: number;
  image_tone: string;
  description: string;
};

export type Establishment = {
  id: string;
  name: string;
  slug: string;
  city: string;
  country: string | null;
  type: string;
  plan: string;
  plan_id: number;
  status: string;
  verified: boolean;
  langs: string[];
  verso_received: number;
  nfts_issued: number;
  active_campaigns: number;
  members_reached: number;
  wallet: string;
  rating: number;
  reviews: number;
  description: string;
  coordinates: { x: number; y: number } | null;
};

export type Community = {
  id: string;
  name: string;
  category: string;
  langs: string[];
  members: number;
  active_now: number;
  events_this_month: number;
  country_flags: string[];
  tone: string;
  description: string;
};

export type NFT = {
  id: string;
  name: string;
  collection: string;
  edition: string;
  description: string;
  total_supply: number | null;
  issued: number;
  tone: string;
  rarity: string;
  perks: string[];
};

export type MapPin = {
  id: string;
  est_id?: string;
  city: string;
  country: string;
  x: number;
  y: number;
  kind: string;
  plan: number;
  verified: boolean;
  name?: string;
};

export type Stats = {
  users_active: number;
  users_growth_pct: number;
  establishments_total: number;
  events_scheduled: number;
  nfts_issued: number;
  verso_distributed: number;
  donations_total: number;
  campaigns_pending: number;
  reports_pending: number;
  countries: number;
  languages: number;
};

export const api = {
  stats: () => get<Stats>("/stats"),
  events: (params?: Record<string, string>) => get<Event[]>("/events", params),
  event: (id: string) => get<Event>(`/events/${id}`),
  establishments: (params?: Record<string, string>) => get<Establishment[]>("/establishments", params),
  establishment: (id: string) => get<Establishment>(`/establishments/${id}`),
  communities: (params?: Record<string, string>) => get<Community[]>("/communities", params),
  nfts: (params?: Record<string, string>) => get<NFT[]>("/nfts", params),
  map: (params?: Record<string, string>) => get<MapPin[]>("/map", params),
};
