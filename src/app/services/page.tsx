import { Metadata } from 'next'
import Link from 'next/link'
import { Navigation } from '@/components/ui/navigation'
import { Footer } from '@/components/ui/footer'
import { WhatsAppButtonServer } from '@/components/ui/whatsapp-button-server'
import { ServiceCard, SectionHeading } from '@/components/ui/section-heading'
import { CommentsSection } from '@/components/ui/comments-section'
import { getServices } from '@/actions/services'
import { getSettingsMap } from '@/actions/settings'
import { DEFAULT_SERVICES } from '@/lib/utils'
import { MessageSquare, PenTool, Printer, Truck, ArrowRight, BadgeCheck } from 'lucide-react'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Our Services | LEWITT SIGNS',
  description:
    'Explore 20+ professional printing and branding services: logo design, business cards, banners, vehicle branding, signage, corporate branding and more.',
}

const processSteps = [
  {
    icon: MessageSquare,
    title: 'Consultation',
    description: 'We listen to your needs, goals, and brand vision.',
  },
  {
    icon: PenTool,
    title: 'Design',
    description: 'Our creative team crafts concepts tailored to your brand.',
  },
  {
    icon: Printer,
    title: 'Production',
    description: 'Premium materials and modern technology bring it to life.',
  },
  {
    icon: Truck,
    title: 'Delivery & Installation',
    description: 'On-time delivery with professional installation.',
  },
]

export default async function ServicesPage() {
  const [servicesDb, settings] = await Promise.all([
    getServices().catch(() => []),
    getSettingsMap(),
  ])

  const services =
    servicesDb.length > 0
      ? servicesDb.filter((s) => s.status)
      : DEFAULT_SERVICES

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

      {/* Page hero */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 left-1/3 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
            <BadgeCheck className="w-4 h-4" />
            Our Services
          </span>
          <h1 className="heading-1 text-white mb-6">
            Everything Your Brand Needs,
            <br />
            <span className="text-gradient">Under One Roof</span>
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto">
            {services.length}+ professional printing and branding services delivered
            with premium quality and fast turnaround.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="pb-24 bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description || undefined}
                icon={service.icon || 'Sparkles'}
                href="/contact"
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section bg-card border-y border-white/5">
        <div className="container-custom">
          <SectionHeading
            badge="How We Work"
            title="From Idea to Impact in Four Steps"
            description="A simple, transparent process designed around your deadlines."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, index) => (
              <div key={step.title} className="relative card-hover text-center">
                <span className="absolute top-4 right-5 text-5xl font-bold text-white/5">
                  {index + 1}
                </span>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-cta/20 border border-primary/10 flex items-center justify-center mx-auto mb-5">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-primary/15 via-card to-cta/10">
        <div className="container-custom text-center">
          <h2 className="heading-2 text-white mb-4">Not Sure What You Need?</h2>
          <p className="text-muted text-lg mb-8 max-w-2xl mx-auto">
            Tell us about your project and we&apos;ll recommend the perfect solution -
            with a free, no-obligation consultation.
          </p>
          <Link href="/contact" className="btn-primary text-lg px-8 py-4">
            Contact Us <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      <div className="container-custom pb-16">
        <CommentsSection pageSlug="services" />
      </div>
      <Footer />
      <WhatsAppButtonServer />
    </div>
  )
}
