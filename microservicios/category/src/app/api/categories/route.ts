import { CategoryRepository } from "@/model/CategoryRepository"
import { ICategory } from "@/types/ICategory"
import { NextRequest, NextResponse } from "next/server"
const repository = CategoryRepository


export async function POST(req: NextRequest) {
  const body = await req.json()
  if (!body.id) return NextResponse.json({ ok: false, error: "Id Required" }, { status: 400 })
  if (!body.name) return NextResponse.json({ ok: false, error: "name Required" }, { status: 400 })

  const newRecipe: ICategory = {
    id: body.id,
    name: body.name,
  }
  repository.create(newRecipe)
  return NextResponse.json("Ok")
}

export async function GET(req: NextRequest) {
  const data = repository.get()
  return NextResponse.json(data)
}

