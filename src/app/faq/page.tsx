import { Metadata } from 'next'
import { Navigation } from '@/components/ui/navigation'
import { Footer } from '@/components/ui/footer'
import { WhatsAppButtonServer } from '@/components/ui/whatsapp-button-server'
import { getSettingsMap } from '@/actions/settings'
import { SectionHeading } from '@/components/ui/section-heading'

export const metadata: Metadata = {
  title: 'FAQ | LEWITT SIGNS',
  description: 'Find answers to common questions about printing, branding, timelines, and project collaboration.',
}

export default async function FAQPage() {
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
        <div className="container-custom max-w-3xl">
          <SectionHeading
            badge="Frequently Asked Questions"
            title="Everything you need to know before you start."
            description="We have kept our process simple and transparent so you know exactly what to expect."
          />

          <div className="space-y-4">
            {[
              {
                question: 'How quickly can I get a consultation?',
                answer: 'Most requests receive a response quickly, and we can usually provide a tailored recommendation the same day.',
              },
              {
                question: 'Do you handle installation?',
                answer: 'Yes. We can coordinate delivery and professional installation for a wide range of signage and branding work.',
              },
              {
                question: 'Can you work from existing brand files?',
                answer: 'Absolutely. We can refine, adapt, or build from your existing materials depending on the project scope.',
              },
            ].map((item) => (
              <div key={item.question} className="rounded-2xl border border-white/10 bg-card/70 p-5">
                <h3 className="font-semibold text-white">{item.question}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{item.answer}</p>
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
