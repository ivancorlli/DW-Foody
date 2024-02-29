import { CategoryRepository } from "@/model/CategoryRepository";
import { ICategory } from "@/types/ICategory";
import { NextRequest, NextResponse } from "next/server";
const repository = CategoryRepository


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;
  if (!id) return NextResponse.json({ ok: false, error: "Id required" }, { status: 400 })
  const body = await req.json()
  if (!body.name) return NextResponse.json({ ok: false, error: "Name required" }, { status: 400 })
  if (!body.id) return NextResponse.json({ ok: false, error: "Id required" }, { status: 400 })
  repository.delete(id)
  const newCategory: ICategory = {
    id: body.id,
    name: body.name
  }
  repository.create(newCategory)
  return NextResponse.json("")
}
