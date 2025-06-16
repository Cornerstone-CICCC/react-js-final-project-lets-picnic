export const revalidate = 120

export async function GET() {
  const res = await fetch("http://localhost:3000/category")
  const data = await res.json()

  return Response.json(data)
}