export async function POST(request: Request) {
  const { url } = await request.json();

  return new Response(
    JSON.stringify({ ok: true, data: { name: "Apple", price: "$120" } })
  );
}
