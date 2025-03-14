import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const orcidId = params.id;
  const url = `https://pub.orcid.org/v3.0/${orcidId}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    return new Response("Failed to fetch ORCID data", { status: res.status });
  }

  const data = await res.json();
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
