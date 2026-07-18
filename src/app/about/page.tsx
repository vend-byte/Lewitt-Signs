import { Metadata } from 'next'
import { Navigation } from '@/components/ui/navigation'
import { Footer } from '@/components/ui/footer'
import { WhatsAppButtonServer } from '@/components/ui/whatsapp-button-server'
import { CommentsSection } from '@/components/ui/comments-section'
import { AboutPageContent } from '@/components/about/about-page-content'
import { getAbout } from '@/actions/about'
import { getServices } from '@/actions/services'
import { getSettingsMap } from '@/actions/settings'
import { ABOUT_CONTENT, type AboutStat } from '@/lib/about-content'
import { DEFAULT_SERVICES } from '@/lib/utils'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'About Us | LEWITT SIGNS',
    description:
      'LEWITT SIGNS is a modern printing and branding company delivering high-quality print and creative branding solutions. Printing • Branding • Impact.',
  }
}

export default async function AboutPage() {
  const [about, servicesDb, settings] = await Promise.all([
    getAbout(),
    getServices().catch(() => []),
    getSettingsMap(),
  ])

  // Story: DB stores paragraphs separated by blank lines
  const storyText = about?.story || ''
  const story =
    storyText.trim().length > 0
      ? storyText.split(/\n\s*\n/).filter((p) => p.trim().length > 0)
      : ABOUT_CONTENT.story

  // Stats: validate DB JSON, fall back to defaults
  let stats: AboutStat[] = ABOUT_CONTENT.stats
  if (Array.isArray(about?.stats) && (about!.stats as any[]).length > 0) {
    const parsed = (about!.stats as any[]).filter(
      (s) => typeof s?.value === 'number' && typeof s?.label === 'string'
    )
    if (parsed.length > 0) {
      stats = parsed.map((s) => ({
        value: s.value,
        suffix: typeof s.suffix === 'string' ? s.suffix : '',
        label: s.label,
      }))
    }
  }

  const services =
    servicesDb.length > 0
      ? servicesDb.filter((s) => s.status).map((s) => s.title)
      : DEFAULT_SERVICES.map((s) => s.title)

  return (
    <div className="min-h-screen">
      <Navigation
        phoneNumber={settings['contact.phone']}
        whatsappNumber={settings['contact.secondaryPhone'] || settings['contact.phone']}
        email={settings['contact.email']}
        address={settings['contact.address']}
        hours={settings['contact.hours']}
        socialLinks={{
          facebook: settings['social.facebook'],
          instagram: settings['social.instagram'],
          tiktok: settings['social.tiktok'],
          linkedin: settings['social.linkedin'],
          youtube: settings['social.youtube'],
        }}
        siteName={settings['general.siteName']}
        tagline={settings['general.tagline']}
      />

      <AboutPageContent
        story={story}
        mission={about?.mission || ABOUT_CONTENT.mission}
        vision={about?.vision || ABOUT_CONTENT.vision}
        values={ABOUT_CONTENT.values}
        whyChoose={ABOUT_CONTENT.whyChoose}
        services={services}
        promise={ABOUT_CONTENT.promise}
        motto={ABOUT_CONTENT.motto}
        slogan={ABOUT_CONTENT.slogan}
        stats={stats}
      />

      <div className="container-custom pb-16">
        <CommentsSection pageSlug="about" />
      </div>
      <Footer />
      <WhatsAppButtonServer />
    </div>
  )
}
