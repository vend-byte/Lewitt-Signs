import { NextRequest, NextResponse } from 'next/server'
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary'
import { db } from '@/lib/db'
import { requireAdmin, UnauthorizedError } from '@/lib/require-admin'
import { uploadRateLimit, getClientIp } from '@/lib/rate-limit'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

export async function POST(request: NextRequest) {
  try {
    await requireAdmin()

    const ip = getClientIp(request)
    const { success } = await uploadRateLimit.limit(ip)
    if (!success) {
      return NextResponse.json(
        { error: 'Too many uploads. Please wait a few minutes and try again.' },
        { status: 429 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const folder = (formData.get('folder') as string) || 'lewitt-signs'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Only JPEG, PNG, WebP, and GIF images are allowed.' },
        { status: 400 }
      )
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File is too large. Maximum size is 10MB.' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = `data:${file.type};base64,${buffer.toString('base64')}`

    const result = await uploadToCloudinary(base64, {
      folder,
      resourceType: 'image',
    })

    const media = await db.media.create({
      data: {
        url: result.url,
        publicId: result.publicId,
        width: result.width,
        height: result.height,
        format: result.format,
        bytes: result.bytes,
        folder,
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        id: media.id,
        url: media.url,
        publicId: media.publicId,
        width: media.width,
        height: media.height,
        format: media.format,
        bytes: media.bytes,
      },
    })
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}

export async function GET() {
  try {
    await requireAdmin()

    const media = await db.media.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({
      success: true,
      data: media,
    })
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Fetch media error:', error)
    return NextResponse.json({ error: 'Failed to fetch media' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await requireAdmin()

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'No ID provided' }, { status: 400 })
    }

    const media = await db.media.findUnique({
      where: { id },
    })

    if (!media) {
      return NextResponse.json({ error: 'Media not found' }, { status: 404 })
    }

    if (media.publicId) {
      await deleteFromCloudinary(media.publicId)
    }

    await db.media.delete({ where: { id } })

    return NextResponse.json({
      success: true,
      message: 'Media deleted successfully',
    })
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    console.error('Delete error:', error)
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}
