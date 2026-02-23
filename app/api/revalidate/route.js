import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

/**
 * On-demand revalidation for article/explore pages.
 * Call via POST with secret in header to reflect DB changes (e.g. article description) in production.
 *
 * Postman: POST /api/revalidate
 * Header: x-revalidate-secret: <REVALIDATE_SECRET>
 *
 * Set REVALIDATE_SECRET in your production env (e.g. Vercel).
 */
export async function POST(request) {
  const secret =
    request.headers.get("x-revalidate-secret") ??
    request.headers.get("authorization")?.replace("Bearer ", "");

  if (!process.env.REVALIDATE_SECRET) {
    console.error("[revalidate] REVALIDATE_SECRET is not set");
    return NextResponse.json(
      { error: "Revalidation not configured" },
      { status: 500 }
    );
  }

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  try {
    revalidatePath("/explore", "layout");
    return NextResponse.json({
      revalidated: true,
      path: "/explore",
      message:
        "Article pages revalidated; next request will reflect latest DB data.",
    });
  } catch (err) {
    console.error("[revalidate]", err);
    return NextResponse.json(
      { error: "Revalidation failed", details: err.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Use POST with x-revalidate-secret header" },
    { status: 405 }
  );
}
