export const revalidate = 120

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const res = await fetch(`http://localhost:3000/product/${id}`)
    const data = await res.json()
    return Response.json(data)
}