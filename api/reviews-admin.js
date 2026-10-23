import { respond, isAdmin, storageReady, readReviews, saveReview, removeReview } from "../lib/reviewStore.js";
export default async function handler(req, res) {
  if (!isAdmin(req)) return respond(res, 401, { error: "unauthorized" });
  if (!storageReady()) return respond(res, 503, { error: "storage_unavailable" });
  if (req.method === "GET") {
    try {
      const [pending, approved] = await Promise.all([readReviews("pending", 150), readReviews("approved", 150)]);
      return respond(res, 200, { pending, approved });
    } catch { return respond(res, 503, { error: "read_failed" }); }
  }
  if (req.method !== "POST") return respond(res, 405, { error: "method_not_allowed" });
  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch { return respond(res, 400, { error: "invalid_json" }); } }
  const id = body?.id, action = body?.action;
  if (typeof id !== "string" || !/^[0-9a-f-]{36}$/i.test(id) || !["approve", "reject", "remove"].includes(action)) {
    return respond(res, 400, { error: "invalid_action" });
  }
  try {
    if (action === "remove") {
      const published = await readReviews("approved", 150);
      if (!published.some(r => r.id === id)) return respond(res, 404, { error: "not_found" });
      await removeReview("approved", id);
    } else {
      const waiting = await readReviews("pending", 150);
      const entry = waiting.find(r => r.id === id);
      if (!entry) return respond(res, 404, { error: "not_found" });
      if (action === "approve") await saveReview("approved", { ...entry, status: "approved", approvedAt: new Date().toISOString() });
      await removeReview("pending", id);
    }
    return respond(res, 200, { success: true });
  } catch { return respond(res, 503, { error: "moderation_failed" }); }
}
