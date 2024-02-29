import { RecpieRepository } from "@/model/RecipeRepository"
import { IRecipe } from "@/types/IRecipe"
import { NextRequest, NextResponse } from "next/server"
const repository = RecpieRepository



export async function POST(req: NextRequest) {
  const body = await req.json()
  if (!body.id) return NextResponse.json({ ok: false, error: "Id Required" }, { status: 400 })
  if (!body.title) return NextResponse.json({ ok: false, error: "Title Required" }, { status: 400 })
  if (!body.category) return NextResponse.json({ ok: false, error: "Category Required" }, { status: 400 })
  if (!body.description) return NextResponse.json({ ok: false, error: "Description Required" }, { status: 400 })

  const newRecipe: IRecipe = {
    id: body.id,
    title: body.title,
    category: body.category,
    description: body.description
  }
  repository.create(newRecipe)
  return NextResponse.json("Ok")
}

export async function GET(req: NextRequest) {
  return NextResponse.json(repository.get())
}




