import { Metadata } from 'next'
import { Navigation } from '@/components/ui/navigation'
import { Footer } from '@/components/ui/footer'
import { WhatsAppButtonServer } from '@/components/ui/whatsapp-button-server'
import { getSettingsMap } from '@/actions/settings'
import { SectionHeading } from '@/components/ui/section-heading'

export const metadata: Metadata = {
  title: 'Blog | LEWITT SIGNS',
  description: 'Read the latest insights from LEWITT SIGNS on branding, signage, printing, and business growth.',
}

export default async function BlogPage() {
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
            badge="Insights"
            title="Fresh thinking for modern brands."
            description="Explore design guidance, production tips, and practical ideas to help your business stand out with confidence."
          />

          <div className="grid gap-6 lg:grid-cols-2">
            {[
              {
                title: 'Why premium signage still matters in a digital-first world',
                excerpt: 'Physical branding creates trust, familiarity, and instant recognition in high-value customer moments.',
              },
              {
                title: 'Design choices that make a brand feel memorable',
                excerpt: 'Consistency, contrast, and clarity are often the difference between good and unforgettable.',
              },
            ].map((item) => (
              <div key={item.title} className="card-hover rounded-2xl border border-white/10 bg-card/70 p-6">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{item.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButtonServer />
    </div>
  )
}
