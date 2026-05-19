import { NextRequest, NextResponse } from "next/server";

const BACKEND = "https://whatsap-agent-whatsap-agent.nctu8q.easypanel.host";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const res = await fetch(`${BACKEND}/n8n/lead`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(body),
      // server-side fetch has no CORS restriction
    });

    const data = await res.text();

    return new NextResponse(data, {
      status:  res.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("[/api/lead] Erro ao repassar para o backend:", e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
