import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const items = await prisma.menuItem.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json({ success: true, data: items })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, description, price, category, imageUrl, isAvailable } = body
    if (!name || price == null || !category) {
      return NextResponse.json({ success: false, error: 'name, price, category are required' }, { status: 400 })
    }
    const created = await prisma.menuItem.create({
      data: { name, description, price, category, imageUrl, isAvailable: isAvailable ?? true },
    })
    return NextResponse.json({ success: true, data: created }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}


