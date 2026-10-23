import { respond, storageReady, readReviews, parseReview, saveReview } from "../lib/reviewStore.js";
export default async function handler(req, res) {
  if (!storageReady()) return respond(res, 503, { error: "storage_unavailable" });
  if (req.method === "GET") {
    try {
      const entries = await readReviews("approved", 100);
      return respond(res, 200, { reviews: entries.map(({ id, name, comment, stars, createdAt }) => ({ id, name, comment, stars, createdAt })) });
    } catch { return respond(res, 503, { error: "read_failed" }); }
  }
  if (req.method !== "POST") return respond(res, 405, { error: "method_not_allowed" });
  if (Number(req.headers["content-length"] || 0) > 6000) return respond(res, 413, { error: "too_large" });
  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { return respond(res, 400, { error: "invalid_json" }); }
  }
  if (body?.website) return respond(res, 200, { accepted: true });
  const review = parseReview(body);
  if (!review) return respond(res, 400, { error: "invalid_review" });
  try { await saveReview("pending", review); return respond(res, 201, { accepted: true }); }
  catch { return respond(res, 503, { error: "save_failed" }); }
}
