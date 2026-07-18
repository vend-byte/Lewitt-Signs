'use client'

import React, { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import {
  Plus,
  Loader2,
  Trash2,
  Eye,
  EyeOff,
  X,
  GripVertical,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  createService,
  updateService,
  deleteService,
} from '@/actions/services'
import { SERVICE_ICONS } from '@/lib/utils'

interface Service {
  id: string
  title: string
  description: string | null
  icon: string | null
  order: number
  status: boolean
}

export function ServicesManager({ services }: { services: Service[] }) {
  const [showAdd, setShowAdd] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [icon, setIcon] = useState('Sparkles')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [busyId, setBusyId] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  function onAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return

    startTransition(async () => {
      await createService({
        title: title.trim(),
        description: description.trim() || undefined,
        icon,
        order: services.length,
        status: true,
      })
      setTitle('')
      setDescription('')
      setIcon('Sparkles')
      setShowAdd(false)
      router.refresh()
    })
  }

  function onToggleStatus(service: Service) {
    setBusyId(service.id)
    startTransition(async () => {
      await updateService(service.id, { status: !service.status })
      setBusyId(null)
      router.refresh()
    })
  }

  function onDelete(id: string) {
    setBusyId(id)
    startTransition(async () => {
      await deleteService(id)
      setBusyId(null)
      setDeleteConfirm(null)
      router.refresh()
    })
  }

  return (
    <div className="space-y-4">
      {/* Add service */}
      <div className="flex justify-end">
        <button onClick={() => setShowAdd(true)} className="btn-primary text-sm">
          <Plus className="w-4 h-4" />
          Add Service
        </button>
      </div>

      {/* Add form modal */}
      {showAdd && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowAdd(false)}
        >
          <div
            className="card w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-white">Add New Service</h2>
              <button
                onClick={() => setShowAdd(false)}
                className="p-2 rounded-lg text-muted hover:bg-white/5 hover:text-white transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={onAdd} className="space-y-4">
              <div>
                <label className="label">Service Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input"
                  placeholder="e.g., Window Graphics"
                  required
                />
              </div>
              <div>
                <label className="label">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="input resize-none"
                  placeholder="Short description of the service"
                />
              </div>
              <div>
                <label className="label">Icon</label>
                <select value={icon} onChange={(e) => setIcon(e.target.value)} className="input">
                  {SERVICE_ICONS.map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" disabled={isPending} className="btn-primary w-full justify-center">
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Add Service
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Services list */}
      <div className="card !p-0 overflow-hidden">
        {services.length === 0 ? (
          <div className="p-12 text-center text-muted">
            No services yet. Click &quot;Add Service&quot; to create your first one.
          </div>
        ) : (
          <ul>
            {services.map((service) => (
              <li
                key={service.id}
                className="flex items-center gap-4 px-5 py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors duration-200"
              >
                <GripVertical className="w-4 h-4 text-muted/40 shrink-0" />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-white truncate">{service.title}</p>
                    {!service.status && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-gray-500/10 text-gray-400 border border-gray-500/20">
                        HIDDEN
                      </span>
                    )}
                  </div>
                  {service.description && (
                    <p className="text-muted text-sm truncate mt-0.5">{service.description}</p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {busyId === service.id && isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  ) : (
                    <>
                      <button
                        onClick={() => onToggleStatus(service)}
                        title={service.status ? 'Hide service' : 'Show service'}
                        className={cn(
                          'p-2 rounded-lg transition-all duration-200',
                          service.status
                            ? 'text-primary bg-primary/10 hover:bg-primary/20'
                            : 'text-muted bg-white/5 hover:bg-white/10'
                        )}
                      >
                        {service.status ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>

                      {deleteConfirm === service.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => onDelete(service.id)}
                            className="px-3 py-2 rounded-lg text-xs font-medium bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all duration-200"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="px-3 py-2 rounded-lg text-xs font-medium bg-white/5 text-muted hover:bg-white/10 transition-all duration-200"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(service.id)}
                          title="Delete service"
                          className="p-2 rounded-lg text-muted bg-white/5 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
