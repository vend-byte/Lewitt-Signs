import { Metadata } from 'next'
import { Navigation } from '@/components/ui/navigation'
import { Hero } from '@/components/ui/hero'
import { Footer } from '@/components/ui/footer'
import { WhatsAppButtonServer } from '@/components/ui/whatsapp-button-server'
import { ServiceCard, SectionHeading, StatCard, FeatureItem } from '@/components/ui/section-heading'
import { DEFAULT_SERVICES } from '@/lib/utils'
import { getHero, getServices } from '@/actions/services'
import { getRecentReviews } from '@/actions/comments'
import { getSettingsMap } from '@/actions/settings'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Star, Award, Clock } from 'lucide-react'

export const revalidate = 60

const defaultHero = {
  title: 'QUICK PRINTS,\nUNMATCHED QUALITY\nEVERY TIME',
  subtitle:
    'Transform your brand with premium printing and signage solutions. From business cards to large format prints, we deliver excellence.',
}


const portfolioItems = [
  {
    id: '1',
    title: 'Corporate Brand Identity',
    category: 'Corporate Branding',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
    description: 'Elevated visual identity systems for modern businesses and executive teams.',
    services: ['Brand Strategy', 'Logo Design', 'Brand Guidelines'],
  },
  {
    id: '2',
    title: 'Vehicle Branding & Fleet Graphics',
    category: 'Vehicle Branding',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
    description: 'High-impact fleet wraps that turn every vehicle into a moving billboard.',
    services: ['Fleet Wraps', 'Vehicle Graphics', 'Installation'],
  },
  {
    id: '3',
    title: 'Commercial Signage',
    category: 'Commercial Signage',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop',
    description: 'Premium channel letters, signs, and wayfinding solutions built to last.',
    services: ['Outdoor Signage', 'Wayfinding', 'Fabrication'],
  },
  {
    id: '4',
    title: 'Large Format Printing',
    category: 'Large Format Printing',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop',
    description: 'Bold, high-resolution prints for events, retail spaces, and exhibitions.',
    services: ['Banners', 'Backdrops', 'Exhibition Prints'],
  },
]

const stats = [
  { value: '5+', label: 'Years Experience' },
  { value: '2000+', label: 'Projects Done' },
  { value: '1000+', label: 'Happy Clients' },
  { value: '98%', label: 'Client Satisfaction' },
]

const features = [
  'Premium quality printing',
  'Fast turnaround time',
  'Affordable pricing',
  'Experienced design team',
  'Modern printing technology',
  'Customized branding solutions',
  'Friendly customer support',
  'Professional installation services',
]

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettingsMap()
  return {
    title: s['seo.title'],
    description: s['seo.description'],
    keywords: s['seo.keywords']?.split(',').map((k) => k.trim()),
  }
}

export default async function HomePage() {
  const [hero, servicesDb, reviews, settings] = await Promise.all([
    getHero().catch(() => null),
    getServices().catch(() => []),
    getRecentReviews(3).catch(() => []),
    getSettingsMap(),
  ])

  const services =
    servicesDb.length > 0
      ? servicesDb.filter((s) => s.status).slice(0, 8)
      : DEFAULT_SERVICES.slice(0, 8)


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

      {/* Hero Section */}
      <Hero
        title={hero?.title || defaultHero.title}
        subtitle={hero?.subtitle || defaultHero.subtitle}
        primaryButton="Contact Us"
        primaryButtonLink="/contact"
        secondaryButton={hero?.secondaryButton || 'View Portfolio'}
        secondaryButtonLink={hero?.secondaryButtonLink || '/portfolio'}
        backgroundImage={hero?.backgroundImage || undefined}
        backgroundVideo={hero?.backgroundVideo || undefined}
        overlayOpacity={hero?.overlayOpacity ?? 0.6}
        experienceYears={5}
      />

      {/* Services Section */}
      <section className="section bg-background">
        <div className="container-custom">
          <SectionHeading
            badge="Our Services"
            title="Complete Printing & Branding Solutions"
            description="From concept to installation, we provide end-to-end services for all your branding needs."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                description={service.description || undefined}
                icon={service.icon || 'Sparkles'}
                href="/services"
                index={index}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services" className="btn-secondary">
              View All Services <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-card border-y border-white/5">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="section bg-background">
        <div className="container-custom">
          <SectionHeading
            badge="Our Portfolio"
            title="Crafting Brands That Leave a Lasting Impression"
            description="At LEWITT SIGNS, every project reflects our commitment to creativity, precision, and excellence."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {portfolioItems.map((item) => (
              <div key={item.id} className="group overflow-hidden rounded-2xl border border-white/10 bg-card/70 shadow-[0_0_40px_rgba(0,0,0,0.2)] transition hover:-translate-y-1 hover:border-primary/30">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={item.image} alt={item.title} fill className="object-cover transition duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  <div className="absolute left-4 top-4 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-primary">
                    {item.category}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{item.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.services.map((service) => (
                      <span key={service} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-muted">{service}</span>
                    ))}
                  </div>
                  <div className="mt-5">
                    <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-white">
                      View Project <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/contact" className="btn-primary">
              Get In Touch <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section bg-card border-y border-white/5">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionHeading
                badge="Why Choose Us"
                title="The LEWITT SIGNS Advantage"
                description="We're not just a printing company - we're your branding partner committed to your success."
                centered={false}
              />

              <ul className="space-y-4 mt-8">
                {features.map((feature, index) => (
                  <FeatureItem key={feature} text={feature} index={index} />
                ))}
              </ul>

              <div className="mt-8 flex items-center gap-4">
                <Link href="/about" className="btn-primary">
                  Learn More <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="/contact" className="btn-ghost">
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=800&fit=crop"
                  alt="Our workspace"
                  width={800}
                  height={800}
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -left-4 sm:-left-8 glass p-6 rounded-xl shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-cta/20 flex items-center justify-center">
                    <Award className="w-7 h-7 text-cta" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">5+</p>
                    <p className="text-muted text-sm">Years of Excellence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section bg-background">
        <div className="container-custom">
          <SectionHeading
            badge="Reviews"
            title="What Our Clients Say"
            description="Don't just take our word for it - hear from businesses we've helped succeed."
          />

          {reviews.length === 0 ? (
            <p className="text-center text-muted">No reviews yet. Be the first to share your experience.</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <div key={review.id} className="card-hover">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-cta text-cta" />
                    ))}
                  </div>

                  {review.message ? (
                    <p className="text-muted leading-relaxed mb-6">
                      &ldquo;{review.message}&rdquo;
                    </p>
                  ) : null}

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-primary/30 to-cta/30 flex items-center justify-center text-white font-bold">
                      {review.authorName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{review.authorName}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/testimonials" className="btn-secondary">
              View All Reviews <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary/15 via-card to-cta/10 border-t border-white/5">
        <div className="container-custom text-center">
          <h2 className="heading-2 text-white mb-4">Ready to Transform Your Brand?</h2>
          <p className="text-muted text-lg mb-8 max-w-2xl mx-auto">
            Get a free consultation for your next project. Our team is ready
            to bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="btn-primary text-lg px-8 py-4">
              Contact Us
            </Link>
            <a
              href={`tel:${(settings['contact.phone'] || '').replace(/\s/g, '')}`}
              className="btn-secondary text-lg px-8 py-4"
            >
              <Clock className="w-5 h-5" />
              Call Us Now
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButtonServer />
    </div>
  )
}
