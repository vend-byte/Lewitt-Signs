import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { commentsRateLimit, getClientIp } from '@/lib/rate-limit'

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
    const ip = getClientIp(request)
    const { success, remaining } = await commentsRateLimit.limit(ip)

    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Too many reviews submitted. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { authorName, email, message, rating, pageSlug } = body || {}

    if (!authorName || !message) {
      return NextResponse.json({ success: false, error: 'Name and review are required.' }, { status: 400 })
    }

    if (String(authorName).length > 100) {
      return NextResponse.json({ success: false, error: 'Name is too long.' }, { status: 400 })
    }

    if (String(message).length > 2000) {
      return NextResponse.json({ success: false, error: 'Review is too long.' }, { status: 400 })
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
