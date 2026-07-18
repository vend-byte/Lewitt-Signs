import { Metadata } from 'next'
import { Navigation } from '@/components/ui/navigation'
import { Footer } from '@/components/ui/footer'
import { WhatsAppButtonServer } from '@/components/ui/whatsapp-button-server'
import { getSettingsMap } from '@/actions/settings'
import { SectionHeading } from '@/components/ui/section-heading'

export const metadata: Metadata = {
  title: 'Portfolio | LEWITT SIGNS',
  description: 'Explore recent branding, signage, and print projects from LEWITT SIGNS.',
}

export default async function PortfolioPage() {
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
            badge="Featured Work"
            title="A portfolio built around impact, clarity, and premium execution."
            description="From storefront signage to branded merchandise and corporate identity systems, we shape every detail to reflect your business at its strongest."
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[
              {
                title: 'Executive Branding Systems',
                description: 'Clean visual identities, letterheads, and premium brand collateral for modern companies.',
              },
              {
                title: 'Retail Signage & Wayfinding',
                description: 'High-visibility signs and directional systems designed to guide customers effortlessly.',
              },
              {
                title: 'Vehicle Wraps & Fleet Graphics',
                description: 'Bold, durable branding that turns each vehicle into a moving statement piece.',
              },
            ].map((item) => (
              <div key={item.title} className="card-hover rounded-2xl border border-white/10 bg-card/70 p-6">
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{item.description}</p>
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
