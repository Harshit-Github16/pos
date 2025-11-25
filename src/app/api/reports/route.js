import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const totalSalesAgg = await prisma.order.aggregate({ _sum: { totalAmount: true } })
    const totalOrders = await prisma.order.count()
    const topItems = await prisma.orderItem.groupBy({
      by: ['menuItemId'],
      _sum: { quantity: true, subtotal: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: 5,
    })

    return NextResponse.json({
      success: true,
      data: {
        totalSales: totalSalesAgg._sum.totalAmount ?? 0,
        totalOrders,
        topItems,
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}


