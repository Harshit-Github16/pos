import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: { items: { include: { menuItem: true } }, staff: true },
    })
    return NextResponse.json({ success: true, data: orders })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { orderNumber, paymentMethod, staffId, items } = body
    if (!orderNumber || !paymentMethod || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ success: false, error: 'orderNumber, paymentMethod, items are required' }, { status: 400 })
    }

    const totalAmount = items.reduce((sum, it) => sum + Number(it.unitPrice) * Number(it.quantity), 0)

    const created = await prisma.order.create({
      data: {
        orderNumber,
        paymentMethod,
        staffId: staffId ?? null,
        totalAmount,
        items: {
          create: items.map((it) => ({
            menuItemId: it.menuItemId,
            quantity: it.quantity,
            unitPrice: it.unitPrice,
            subtotal: Number(it.unitPrice) * Number(it.quantity),
          })),
        },
      },
      include: { items: true },
    })
    return NextResponse.json({ success: true, data: created }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}


