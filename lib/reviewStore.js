import { get, list, put, del } from "@vercel/blob";
import { randomUUID, timingSafeEqual } from "node:crypto";
const PREFIX = "hery-reviews-v1/";
export function respond(res, status, data) {
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Content-Type-Options", "nosniff");
  return res.status(status).json(data);
}
export function isAdmin(req) {
  const expected = process.env.REVIEWS_ADMIN_TOKEN || "";
  const supplied = String(req.headers.authorization || "").replace(/^Bearer\s+/i, "");
  if (!expected || !supplied || Buffer.byteLength(expected) !== Buffer.byteLength(supplied)) return false;
  return timingSafeEqual(Buffer.from(expected), Buffer.from(supplied));
}
export const storageReady = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);
export async function readReviews(status, limit = 100) {
  let cursor; const blobs = [];
  do {
    const page = await list({ prefix: PREFIX + status + "/", limit: 500, ...(cursor ? { cursor } : {}) });
    blobs.push(...page.blobs);
    cursor = page.cursor;
  } while (cursor && blobs.length < limit);
  const values = await Promise.all(blobs.slice(0, limit).map(async b => {
    try {
      const value = await get(b.pathname, { access: "private" });
      return value?.stream ? JSON.parse(await new Response(value.stream).text()) : null;
    } catch { return null; }
  }));
  return values.filter(Boolean).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
export async function saveReview(status, review) {
  return put(PREFIX + status + "/" + review.id + ".json", JSON.stringify(review), {
    access: "private", addRandomSuffix: false, contentType: "application/json"
  });
}
export async function removeReview(status, id) {
  return del(PREFIX + status + "/" + id + ".json");
}
export function parseReview(body) {
  const name = typeof body?.name === "string" ? body.name.trim().slice(0, 80) : "";
  const comment = typeof body?.comment === "string" ? body.comment.trim().slice(0, 1200) : "";
  const stars = Number(body?.stars);
  if (name.length < 2 || comment.length < 20 || !Number.isInteger(stars) || stars < 1 || stars > 5 || body?.consent !== true) return null;
  return { id: randomUUID(), name, comment, stars, createdAt: new Date().toISOString(), status: "pending" };
}
