import { NextRequest, NextResponse } from 'next/server'
import { uploadToCloudinary } from '@/lib/cloudinary'
import { db } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const folder = formData.get('folder') as string || 'lewitt-signs'

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = `data:${file.type};base64,${buffer.toString('base64')}`

    // Upload to Cloudinary
    const result = await uploadToCloudinary(base64, {
      folder,
      resourceType: file.type.startsWith('video/') ? 'video' : 'image',
    })

    // Save to database
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
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const media = await db.media.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({
      success: true,
      data: media,
    })
  } catch (error) {
    console.error('Fetch media error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch media' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'No ID provided' },
        { status: 400 }
      )
    }

    const media = await db.media.findUnique({
      where: { id },
    })

    if (!media) {
      return NextResponse.json(
        { error: 'Media not found' },
        { status: 404 }
      )
    }

    // Delete from Cloudinary
    if (media.publicId) {
      const { deleteFromCloudinary } = await import('@/lib/cloudinary')
      await deleteFromCloudinary(media.publicId)
    }

    // Delete from database
    await db.media.delete({
      where: { id },
    })

    return NextResponse.json({
      success: true,
      message: 'Media deleted successfully',
    })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json(
      { error: 'Delete failed' },
      { status: 500 }
    )
  }
}
