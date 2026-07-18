'use client'

import React, { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import {
  MessageCircle,
  Globe,
  Settings2,
  Phone,
  Share2,
  Search,
  Loader2,
  CheckCircle,
  Save,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { saveSettings } from '@/actions/settings'

type TabId = 'whatsapp' | 'general' | 'website' | 'contact' | 'social' | 'seo'

const TABS: { id: TabId; label: string; icon: any }[] = [
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
  { id: 'general', label: 'General', icon: Settings2 },
  { id: 'website', label: 'Website', icon: Globe },
  { id: 'contact', label: 'Contact', icon: Phone },
  { id: 'social', label: 'Social Media', icon: Share2 },
  { id: 'seo', label: 'SEO', icon: Search },
]

// ---------------------------------------------------------------------------
// Field components
// ---------------------------------------------------------------------------

function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  hint,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  hint?: string
}) {
  return (
    <div>
      <label className="label">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input"
      />
      {hint && <p className="text-muted text-xs mt-1.5">{hint}</p>}
    </div>
  )
}

function ToggleField({
  label,
  description,
  checked,
  onChange,
}: {
  label: string
  description?: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="w-full flex items-center justify-between gap-4 p-4 rounded-lg bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all duration-200 text-left"
    >
      <div>
        <p className="text-sm font-medium text-white">{label}</p>
        {description && <p className="text-muted text-xs mt-0.5">{description}</p>}
      </div>
      <span
        className={cn(
          'relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0',
          checked ? 'bg-primary' : 'bg-white/10'
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200',
            checked && 'translate-x-5'
          )}
        />
      </span>
    </button>
  )
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <div>
      <label className="label">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="input">
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div>
      <label className="label">{label}</label>
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-12 h-11 rounded-md bg-input border border-white/10 cursor-pointer p-1"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="input flex-1 font-mono text-sm"
          placeholder="#25D366"
        />
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main settings form
// ---------------------------------------------------------------------------

export function SettingsForm({ initial }: { initial: Record<string, string> }) {
  const [values, setValues] = useState<Record<string, string>>(initial)
  const [tab, setTab] = useState<TabId>('whatsapp')
  const [saved, setSaved] = useState(false)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const get = (key: string) => values[key] ?? ''
  const set = (key: string, value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }))
  const boolVal = (key: string) => get(key) === 'true'
  const toggle = (key: string, v: boolean) => set(key, v ? 'true' : 'false')

  function onSave() {
    startTransition(async () => {
      const result = await saveSettings(values)
      if (result.success) {
        setSaved(true)
        router.refresh()
        setTimeout(() => setSaved(false), 3000)
      }
    })
  }

  return (
    <div className="grid lg:grid-cols-[220px_1fr] gap-6">
      {/* Tab navigation */}
      <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap',
              tab === id
                ? 'bg-primary/10 text-primary border border-primary/20'
                : 'text-muted hover:bg-white/5 hover:text-white border border-transparent'
            )}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Panel */}
      <div className="card">
        {/* ---------------- WhatsApp ---------------- */}
        {tab === 'whatsapp' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-white/5">
              <div className="w-10 h-10 rounded-lg bg-whatsapp/15 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-whatsapp" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white">Floating WhatsApp Button</h2>
                <p className="text-muted text-sm">
                  Control the floating chat button shown on every page.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <TextField
                label="WhatsApp Number"
                value={get('whatsapp.number')}
                onChange={(v) => set('whatsapp.number', v)}
                placeholder="254795109943"
                hint="International format, digits only. Opens https://wa.me/{number}"
              />
              <ColorField
                label="Button Color"
                value={get('whatsapp.color') || '#25D366'}
                onChange={(v) => set('whatsapp.color', v)}
              />
            </div>

            <SelectField
              label="Button Position"
              value={get('whatsapp.position') || 'bottom-right'}
              onChange={(v) => set('whatsapp.position', v)}
              options={[
                { value: 'bottom-right', label: 'Bottom Right' },
                { value: 'bottom-left', label: 'Bottom Left' },
              ]}
            />

            <div className="grid sm:grid-cols-2 gap-3">
              <ToggleField
                label="Enable Floating WhatsApp"
                description="Show the button on the website"
                checked={boolVal('whatsapp.enabled')}
                onChange={(v) => toggle('whatsapp.enabled', v)}
              />
              <ToggleField
                label="Pulse Animation"
                description="Expanding ring that attracts attention"
                checked={boolVal('whatsapp.pulse')}
                onChange={(v) => toggle('whatsapp.pulse', v)}
              />
              <ToggleField
                label="Glow Effect"
                description="Soft colored glow around the button"
                checked={boolVal('whatsapp.glow')}
                onChange={(v) => toggle('whatsapp.glow', v)}
              />
              <ToggleField
                label="Open in New Tab"
                description="Launch WhatsApp chat in a new browser tab"
                checked={boolVal('whatsapp.newTab')}
                onChange={(v) => toggle('whatsapp.newTab', v)}
              />
            </div>

            {/* Live preview */}
            <div className="rounded-lg border border-white/5 bg-background/60 p-5">
              <p className="text-muted text-xs uppercase tracking-wider mb-4">Preview</p>
              <div className="relative h-28 rounded-lg bg-card border border-white/5 overflow-hidden">
                <div
                  className={cn(
                    'absolute bottom-4',
                    get('whatsapp.position') === 'bottom-left' ? 'left-4' : 'right-4'
                  )}
                >
                  {boolVal('whatsapp.enabled') && (
                    <div
                      className={cn(
                        'w-12 h-12 rounded-full flex items-center justify-center shadow-lg',
                        boolVal('whatsapp.pulse') && 'wa-pulse',
                        boolVal('whatsapp.glow') && 'wa-glow'
                      )}
                      style={{
                        backgroundColor: get('whatsapp.color') || '#25D366',
                        ['--wa-color' as any]: get('whatsapp.color') || '#25D366',
                        position: 'relative',
                      }}
                    >
                      <svg viewBox="0 0 24 24" fill="#fff" className="w-6 h-6">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                      </svg>
                    </div>
                  )}
                </div>
                {!boolVal('whatsapp.enabled') && (
                  <p className="absolute inset-0 flex items-center justify-center text-muted text-sm">
                    Button is disabled
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ---------------- General ---------------- */}
        {tab === 'general' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-white/5">
              <h2 className="text-lg font-semibold text-white">General Settings</h2>
              <p className="text-muted text-sm">Core identity of your website.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <TextField label="Website Name" value={get('general.siteName')} onChange={(v) => set('general.siteName', v)} />
              <TextField label="Tagline" value={get('general.tagline')} onChange={(v) => set('general.tagline', v)} />
              <TextField label="Footer Text" value={get('general.footerText')} onChange={(v) => set('general.footerText', v)} />
              <TextField label="Timezone" value={get('general.timezone')} onChange={(v) => set('general.timezone', v)} />
              <TextField label="Currency" value={get('general.currency')} onChange={(v) => set('general.currency', v)} />
              <TextField label="Country" value={get('general.country')} onChange={(v) => set('general.country', v)} />
            </div>
          </div>
        )}

        {/* ---------------- Website ---------------- */}
        {tab === 'website' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-white/5">
              <h2 className="text-lg font-semibold text-white">Website Features</h2>
              <p className="text-muted text-sm">Enable or disable website modules.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <ToggleField label="Maintenance Mode" description="Visitors see a maintenance page" checked={boolVal('website.maintenanceMode')} onChange={(v) => toggle('website.maintenanceMode', v)} />
              <ToggleField label="Coming Soon Mode" description="Show a coming soon page" checked={boolVal('website.comingSoonMode')} onChange={(v) => toggle('website.comingSoonMode', v)} />
              <ToggleField label="Enable Blog" description="Show the blog section" checked={boolVal('website.enableBlog')} onChange={(v) => toggle('website.enableBlog', v)} />
              <ToggleField label="Enable Portfolio" description="Show portfolio pages" checked={boolVal('website.enablePortfolio')} onChange={(v) => toggle('website.enablePortfolio', v)} />
              <ToggleField label="Enable Pricing" description="Show pricing section" checked={boolVal('website.enablePricing')} onChange={(v) => toggle('website.enablePricing', v)} />
              <ToggleField label="Enable Testimonials" description="Show client reviews" checked={boolVal('website.enableTestimonials')} onChange={(v) => toggle('website.enableTestimonials', v)} />
              <ToggleField label="Enable FAQ" description="Show FAQ section" checked={boolVal('website.enableFAQ')} onChange={(v) => toggle('website.enableFAQ', v)} />
              <ToggleField label="Enable Newsletter" description="Show newsletter signup" checked={boolVal('website.enableNewsletter')} onChange={(v) => toggle('website.enableNewsletter', v)} />
              <ToggleField label="Enable Animations" description="Framer Motion animations" checked={boolVal('website.enableAnimations')} onChange={(v) => toggle('website.enableAnimations', v)} />
              <ToggleField label="Enable Back To Top" description="Show back-to-top button" checked={boolVal('website.enableBackToTop')} onChange={(v) => toggle('website.enableBackToTop', v)} />
            </div>
          </div>
        )}

        {/* ---------------- Contact ---------------- */}
        {tab === 'contact' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-white/5">
              <h2 className="text-lg font-semibold text-white">Contact Information</h2>
              <p className="text-muted text-sm">Shown in the footer and contact page.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <TextField label="Main Phone" value={get('contact.phone')} onChange={(v) => set('contact.phone', v)} />
              <TextField label="Secondary Phone" value={get('contact.secondaryPhone')} onChange={(v) => set('contact.secondaryPhone', v)} />
              <TextField label="Sales Email" value={get('contact.email')} onChange={(v) => set('contact.email', v)} />
              <TextField label="Support Email" value={get('contact.supportEmail')} onChange={(v) => set('contact.supportEmail', v)} />
              <TextField label="Office Address" value={get('contact.address')} onChange={(v) => set('contact.address', v)} />
              <TextField label="Business Hours" value={get('contact.hours')} onChange={(v) => set('contact.hours', v)} />
            </div>
            <TextField label="Google Maps Embed URL" value={get('contact.mapsEmbed')} onChange={(v) => set('contact.mapsEmbed', v)} placeholder="https://www.google.com/maps/embed?..." />
          </div>
        )}

        {/* ---------------- Social ---------------- */}
        {tab === 'social' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-white/5">
              <h2 className="text-lg font-semibold text-white">Social Media Links</h2>
              <p className="text-muted text-sm">Leave empty to hide an icon.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              <TextField label="Facebook" value={get('social.facebook')} onChange={(v) => set('social.facebook', v)} placeholder="https://facebook.com/..." />
              <TextField label="Instagram" value={get('social.instagram')} onChange={(v) => set('social.instagram', v)} placeholder="https://instagram.com/..." />
              <TextField label="TikTok" value={get('social.tiktok')} onChange={(v) => set('social.tiktok', v)} placeholder="https://tiktok.com/@..." />
              <TextField label="YouTube" value={get('social.youtube')} onChange={(v) => set('social.youtube', v)} placeholder="https://youtube.com/..." />
              <TextField label="LinkedIn" value={get('social.linkedin')} onChange={(v) => set('social.linkedin', v)} placeholder="https://linkedin.com/company/..." />
              <TextField label="X (Twitter)" value={get('social.twitter')} onChange={(v) => set('social.twitter', v)} placeholder="https://x.com/..." />
            </div>
          </div>
        )}

        {/* ---------------- SEO ---------------- */}
        {tab === 'seo' && (
          <div className="space-y-6">
            <div className="pb-4 border-b border-white/5">
              <h2 className="text-lg font-semibold text-white">SEO Settings</h2>
              <p className="text-muted text-sm">Search engine and social sharing metadata.</p>
            </div>
            <div className="space-y-5">
              <TextField label="Homepage Title" value={get('seo.title')} onChange={(v) => set('seo.title', v)} />
              <div>
                <label className="label">Meta Description</label>
                <textarea
                  value={get('seo.description')}
                  onChange={(e) => set('seo.description', e.target.value)}
                  rows={3}
                  className="input resize-none"
                />
              </div>
              <TextField label="Keywords" value={get('seo.keywords')} onChange={(v) => set('seo.keywords', v)} hint="Comma separated" />
              <TextField label="Open Graph Image URL" value={get('seo.ogImage')} onChange={(v) => set('seo.ogImage', v)} />
              <TextField label="Google Analytics ID" value={get('seo.googleAnalytics')} onChange={(v) => set('seo.googleAnalytics', v)} placeholder="G-XXXXXXXXXX" />
            </div>
          </div>
        )}

        {/* Save bar */}
        <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t border-white/5">
          <div className="flex items-center gap-2 text-sm">
            {saved && (
              <span className="flex items-center gap-2 text-green-400">
                <CheckCircle className="w-4 h-4" />
                Settings saved. Changes are live.
              </span>
            )}
          </div>
          <button
            onClick={onSave}
            disabled={isPending}
            className="btn-primary min-w-[160px] justify-center"
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
