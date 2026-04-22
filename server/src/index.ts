import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { events, establishments, communities, nfts, mapPins, stats, recentActivity, users } from "./data";

const app = new Hono();

// Middleware
app.use("*", logger());
app.use(
  "*",
  cors({
    origin: ["https://cafeeverso.fun", "https://www.cafeeverso.fun", "http://localhost:5173"],
    allowMethods: ["GET"],
    allowHeaders: ["Content-Type"],
  })
);

// Health
app.get("/", (c) => c.json({ status: "ok", service: "Café & Verso API", version: "1.0.0" }));

// Stats (dashboard)
app.get("/api/stats", (c) => c.json(stats));

// Recent activity
app.get("/api/activity", (c) => c.json(recentActivity));

// Events
app.get("/api/events", (c) => {
  const mode = c.req.query("mode");
  const category = c.req.query("category");
  const limit = Number(c.req.query("limit") ?? 8);
  let result = [...events];
  if (mode) result = result.filter((e) => e.mode.toLowerCase() === mode.toLowerCase());
  if (category) result = result.filter((e) => e.category.toLowerCase() === category.toLowerCase());
  return c.json(result.slice(0, limit));
});

app.get("/api/events/:id", (c) => {
  const event = events.find((e) => e.id === c.req.param("id"));
  if (!event) return c.json({ error: "Not found" }, 404);
  return c.json(event);
});

// Establishments
app.get("/api/establishments", (c) => {
  const plan = c.req.query("plan");
  const type = c.req.query("type");
  const country = c.req.query("country");
  const limit = Number(c.req.query("limit") ?? 20);
  let result = [...establishments];
  if (plan) result = result.filter((e) => e.plan.toLowerCase() === plan.toLowerCase());
  if (type) result = result.filter((e) => e.type.toLowerCase() === type.toLowerCase());
  if (country) result = result.filter((e) => e.country === country.toUpperCase());
  return c.json(result.slice(0, limit));
});

app.get("/api/establishments/:id", (c) => {
  const est = establishments.find((e) => e.id === c.req.param("id") || e.slug === c.req.param("id"));
  if (!est) return c.json({ error: "Not found" }, 404);
  return c.json(est);
});

// Communities
app.get("/api/communities", (c) => {
  const category = c.req.query("category");
  const limit = Number(c.req.query("limit") ?? 10);
  let result = [...communities];
  if (category) result = result.filter((c) => c.category.toLowerCase().includes(category.toLowerCase()));
  return c.json(result.slice(0, limit));
});

app.get("/api/communities/:id", (c) => {
  const community = communities.find((com) => com.id === c.req.param("id"));
  if (!community) return c.json({ error: "Not found" }, 404);
  return c.json(community);
});

// NFTs
app.get("/api/nfts", (c) => {
  const rarity = c.req.query("rarity");
  const limit = Number(c.req.query("limit") ?? 10);
  let result = [...nfts];
  if (rarity) result = result.filter((n) => n.rarity.toLowerCase() === rarity.toLowerCase());
  return c.json(result.slice(0, limit));
});

app.get("/api/nfts/:id", (c) => {
  const nft = nfts.find((n) => n.id === c.req.param("id"));
  if (!nft) return c.json({ error: "Not found" }, 404);
  return c.json(nft);
});

// Map pins
app.get("/api/map", (c) => {
  const kind = c.req.query("kind");
  let result = [...mapPins];
  if (kind) result = result.filter((p) => p.kind.toLowerCase() === kind.toLowerCase());
  return c.json(result);
});

// Users (demo)
app.get("/api/users/:id", (c) => {
  const user = users.find((u) => u.id === c.req.param("id"));
  if (!user) return c.json({ error: "Not found" }, 404);
  return c.json(user);
});

// 404
app.notFound((c) => c.json({ error: "Route not found" }, 404));

const port = Number(process.env.PORT ?? 3001);
console.log(`🚀 Café & Verso API running on port ${port}`);

export default {
  port,
  fetch: app.fetch,
};
