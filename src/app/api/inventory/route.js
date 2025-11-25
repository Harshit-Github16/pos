import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const items = await prisma.inventoryItem.findMany({ orderBy: { updatedAt: 'desc' } })
    return NextResponse.json({ success: true, data: items })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, sku, quantity, unit, reorderLevel, costPrice } = body
    if (!name || !sku || unit == null) {
      return NextResponse.json({ success: false, error: 'name, sku, unit are required' }, { status: 400 })
    }
    const created = await prisma.inventoryItem.create({
      data: {
        name,
        sku,
        quantity: quantity ?? 0,
        unit,
        reorderLevel: reorderLevel ?? 0,
        costPrice: costPrice ?? 0,
      },
    })
    return NextResponse.json({ success: true, data: created }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}


