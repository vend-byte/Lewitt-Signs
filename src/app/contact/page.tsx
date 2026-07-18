import { Metadata } from 'next'
import { Navigation } from '@/components/ui/navigation'
import { Footer } from '@/components/ui/footer'
import { getSettingsMap } from '@/actions/settings'
import { ContactSection } from '@/components/ui/contact-section'
import { CommentsSection } from '@/components/ui/comments-section'

export const metadata: Metadata = {
  title: 'Contact Us | LEWITT SIGNS',
  description: 'Get in touch with LEWITT SIGNS for premium printing, branding, and signage solutions.',
}

export default async function ContactPage() {
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
      <ContactSection settings={settings} />
      <div className="container-custom pb-16">
        <CommentsSection pageSlug="contact" />
      </div>
      <Footer />
    </div>
  )
}
