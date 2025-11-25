import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    const items = await prisma.staff.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json({ success: true, data: items })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, role, active } = body
    if (!name || !email || !role) {
      return NextResponse.json({ success: false, error: 'name, email, role are required' }, { status: 400 })
    }
    const created = await prisma.staff.create({
      data: { name, email, role, active: active ?? true },
    })
    return NextResponse.json({ success: true, data: created }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}


