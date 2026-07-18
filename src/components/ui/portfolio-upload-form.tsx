'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createPortfolioWithImages } from '@/actions/portfolio-upload'
import { ImagePlus, X, Loader2 } from 'lucide-react'

interface PreviewImage {
  file: File
  previewUrl: string
}

export function PortfolioUploadForm() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [files, setFiles] = useState<PreviewImage[]>([])
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || [])
    const previews = selected.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }))
    setFiles((current) => [...current, ...previews])
    e.target.value = ''
  }

  const removeFile = (index: number) => {
    setFiles((current) => current.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      setError('Please enter a project title.')
      return
    }
    if (files.length === 0) {
      setError('Please add at least one image.')
      return
    }

    setUploading(true)
    setError('')

    try {
      const uploadedImages = []
      for (const { file } of files) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('folder', 'lewitt-signs/portfolio')

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })
        const result = await res.json()

        if (!result.success) {
          throw new Error(result.error || 'Image upload failed')
        }

        uploadedImages.push({
          url: result.data.url,
          publicId: result.data.publicId,
          width: result.data.width,
          height: result.data.height,
          format: result.data.format,
          bytes: result.data.bytes,
        })
      }

      await createPortfolioWithImages({
        title: title.trim(),
        description: description.trim() || undefined,
        category: category.trim() || undefined,
        images: uploadedImages,
      })

      setTitle('')
      setDescription('')
      setCategory('')
      setFiles([])
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 space-y-4">
      <h2 className="text-lg font-semibold text-white">Add Project</h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm text-muted mb-1">Project title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-background/70 px-4 py-2.5 text-sm text-white outline-none"
            placeholder="e.g. Downtown Office Signage"
          />
        </div>
        <div>
          <label className="block text-sm text-muted mb-1">Category</label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-background/70 px-4 py-2.5 text-sm text-white outline-none"
            placeholder="e.g. Commercial Signage"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-muted mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full rounded-lg border border-white/10 bg-background/70 px-4 py-2.5 text-sm text-white outline-none"
          placeholder="Brief description of the project"
        />
      </div>

      <div>
        <label className="block text-sm text-muted mb-2">Project images</label>
        <div className="flex flex-wrap gap-3">
          {files.map((f, index) => (
            <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden border border-white/10">
              <img src={f.previewUrl} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute top-1 right-1 p-1 rounded-full bg-black/60 text-white hover:bg-red-500/80"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
          <label className="w-24 h-24 rounded-lg border border-dashed border-white/20 flex flex-col items-center justify-center text-muted cursor-pointer hover:border-primary/50 hover:text-primary transition-colors">
            <ImagePlus className="w-5 h-5" />
            <span className="text-[10px] mt-1">Add image</span>
            <input type="file" accept="image/*" multiple className="hidden" onChange={handleFileSelect} />
          </label>
        </div>
      </div>

      {error ? <p className="text-sm text-red-400">{error}</p> : null}

      <button type="submit" disabled={uploading} className="btn-primary">
        {uploading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" /> Uploading...
          </span>
        ) : (
          'Add Project'
        )}
      </button>
    </form>
  )
}
