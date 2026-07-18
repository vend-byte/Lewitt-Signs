import { Metadata } from 'next'
import { Navigation } from '@/components/ui/navigation'
import { Footer } from '@/components/ui/footer'
import { WhatsAppButtonServer } from '@/components/ui/whatsapp-button-server'
import { getSettingsMap } from '@/actions/settings'
import { SectionHeading } from '@/components/ui/section-heading'
import { CommentsSection } from '@/components/ui/comments-section'

export const metadata: Metadata = {
  title: 'Testimonials | LEWITT SIGNS',
  description: 'See what clients say about LEWITT SIGNS and the experience of working with us.',
}

export default async function TestimonialsPage() {
  const settings = await getSettingsMap()

  return (
    <div className="min-h-screen bg-background">
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

      <section className="pt-32 pb-20">
        <div className="container-custom">
          <SectionHeading
            badge="Client Love"
            title="Trusted by businesses that value quality and consistency."
            description="Our clients choose us for premium service, fast delivery, and an experience that feels as polished as the work itself."
          />

          <CommentsSection pageSlug="testimonials" />
        </div>
      </section>

      <Footer />
      <WhatsAppButtonServer />
    </div>
  )
}
