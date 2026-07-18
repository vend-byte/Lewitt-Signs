import { Metadata } from 'next'
import { Navigation } from '@/components/ui/navigation'
import { Footer } from '@/components/ui/footer'
import { WhatsAppButtonServer } from '@/components/ui/whatsapp-button-server'
import { getSettingsMap } from '@/actions/settings'

export const metadata: Metadata = {
  title: 'Terms of Service | LEWITT SIGNS',
  description: 'Terms of service for LEWITT SIGNS.',
}

export const revalidate = 60

export default async function TermsPage() {
  const settings = await getSettingsMap()

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

      <section className="pt-32 pb-20 bg-background">
        <div className="container-custom max-w-3xl">
          <h1 className="heading-2 text-white mb-6">Terms of Service</h1>
          <div className="space-y-6 text-muted leading-relaxed">
            <p>
              By using the LEWITT SIGNS website and services, you agree to the
              following terms.
            </p>
            <h2 className="text-xl font-semibold text-white">Services</h2>
            <p>
              We provide printing, signage, and branding services as described on this
              website. Quotations are provided free of charge and are valid for 30
              days unless stated otherwise.
            </p>
            <h2 className="text-xl font-semibold text-white">Orders & Payment</h2>
            <p>
              Orders are confirmed upon receipt of agreed payment terms. Production
              timelines begin after artwork approval and payment confirmation.
            </p>
            <h2 className="text-xl font-semibold text-white">Artwork & Approvals</h2>
            <p>
              Clients are responsible for reviewing and approving final artwork proofs.
              LEWITT SIGNS is not liable for errors approved by the client.
            </p>
            <h2 className="text-xl font-semibold text-white">Contact</h2>
            <p>
              Questions about these terms can be sent to{' '}
              <a href={`mailto:${settings['contact.email']}`} className="text-primary hover:underline">
                {settings['contact.email']}
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButtonServer />
    </div>
  )
}
