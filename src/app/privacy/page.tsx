import { Metadata } from 'next'
import { Navigation } from '@/components/ui/navigation'
import { Footer } from '@/components/ui/footer'
import { WhatsAppButtonServer } from '@/components/ui/whatsapp-button-server'
import { getSettingsMap } from '@/actions/settings'

export const metadata: Metadata = {
  title: 'Privacy Policy | LEWITT SIGNS',
  description: 'Privacy policy for LEWITT SIGNS.',
}

export const revalidate = 60

export default async function PrivacyPage() {
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
          <h1 className="heading-2 text-white mb-6">Privacy Policy</h1>
          <div className="space-y-6 text-muted leading-relaxed">
            <p>
              LEWITT SIGNS respects your privacy. This policy explains how we collect,
              use, and protect your personal information when you use our website and
              services.
            </p>
            <h2 className="text-xl font-semibold text-white">Information We Collect</h2>
            <p>
              We collect information you provide directly, such as your name, email
              address, phone number, and project details when you request a consultation
              or contact us.
            </p>
            <h2 className="text-xl font-semibold text-white">How We Use Information</h2>
            <p>
              Your information is used to respond to inquiries, prepare tailored recommendations,
              deliver our services, and - with your consent - send occasional updates
              and offers.
            </p>
            <h2 className="text-xl font-semibold text-white">Data Protection</h2>
            <p>
              We apply appropriate technical and organizational measures to keep your
              data secure. We never sell your personal information to third parties.
            </p>
            <h2 className="text-xl font-semibold text-white">Contact</h2>
            <p>
              For any privacy-related questions, contact us at{' '}
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
