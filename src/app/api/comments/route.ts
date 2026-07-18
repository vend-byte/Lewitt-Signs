import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const comments = await db.comment.findMany({
      where: { status: 'APPROVED' },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        authorName: true,
        message: true,
        rating: true,
        createdAt: true,
      },
    })

    return NextResponse.json(comments)
  } catch (error) {
    console.error('comments fetch failed', error)
    return NextResponse.json([], { status: 200 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { authorName, email, message, rating, pageSlug } = body || {}

    if (!authorName || !message) {
      return NextResponse.json({ success: false, error: 'Name and review are required.' }, { status: 400 })
    }

    const parsedRating = Number(rating)
    const safeRating = Number.isInteger(parsedRating) && parsedRating >= 1 && parsedRating <= 5
      ? parsedRating
      : 5

    const comment = await db.comment.create({
      data: {
        authorName: String(authorName).trim(),
        email: email ? String(email).trim() : null,
        message: String(message).trim(),
        rating: safeRating,
        pageSlug: pageSlug ? String(pageSlug).trim() : null,
        status: 'APPROVED',
        approvedAt: new Date(),
      },
    })

    return NextResponse.json({ success: true, comment })
  } catch (error) {
    console.error('comment create failed', error)
    return NextResponse.json({ success: false, error: 'Unable to submit your review.' }, { status: 500 })
  }
}
