// app/api/hello/route.ts

export async function GET() {
  return new Response(JSON.stringify({ message: 'Hello, World!' }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
