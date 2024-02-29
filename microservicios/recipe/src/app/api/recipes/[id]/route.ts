import { NextRequest, NextResponse } from "next/server";
import { RecpieRepository } from "@/model/RecipeRepository"
import { IRecipe } from "@/types/IRecipe"
const repo = RecpieRepository



export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id
  if (!id) return NextResponse.json({ ok: false, error: "Id required" }, { status: 400 })
  const data = repo.get()
  return NextResponse.json(data.find(x => x.id === id))
}
