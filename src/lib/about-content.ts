// Official LEWITT SIGNS company content (fallback defaults; DB overrides via About model)

export const ABOUT_CONTENT = {
  story: [
    'LEWITT SIGNS is a modern printing and branding company dedicated to helping businesses, organizations, and individuals bring their ideas to life through high-quality print and creative branding solutions. We combine innovative design, premium materials, and advanced printing technology to deliver products that make lasting impressions.',
    'Whether you need business cards, banners, vehicle branding, signage, promotional merchandise, or complete corporate branding, our team is committed to delivering exceptional quality, quick turnaround times, and outstanding customer service.',
    'Our goal is simple - help our clients stand out with professional branding that reflects their identity and grows their business.',
  ],
  mission:
    'To provide innovative, affordable, and high-quality printing and branding solutions that empower businesses and individuals to communicate their message with confidence while delivering exceptional customer service and unmatched reliability.',
  vision:
    'To become the leading printing and branding company in the region by setting the standard for creativity, quality, innovation, and customer satisfaction.',
  values: [
    {
      title: 'Excellence',
      description:
        'We strive for perfection in every project, ensuring every print and design meets the highest quality standards.',
      icon: 'Award',
    },
    {
      title: 'Creativity',
      description:
        'We believe every brand deserves a unique identity, and we use innovative ideas to bring visions to life.',
      icon: 'Lightbulb',
    },
    {
      title: 'Integrity',
      description:
        'We conduct our business with honesty, transparency, and professionalism in every client interaction.',
      icon: 'ShieldCheck',
    },
    {
      title: 'Customer First',
      description:
        'Our customers are at the heart of everything we do. Their success is our success.',
      icon: 'Heart',
    },
    {
      title: 'Innovation',
      description:
        'We continuously invest in modern technology and creative techniques to deliver world-class branding solutions.',
      icon: 'Rocket',
    },
    {
      title: 'Reliability',
      description: 'We deliver projects on time without compromising quality.',
      icon: 'Clock',
    },
  ],
  whyChoose: [
    'Premium Quality Printing',
    'Fast Turnaround Time',
    'Affordable Pricing',
    'Experienced Design Team',
    'Modern Printing Technology',
    'Customized Branding Solutions',
    'Friendly Customer Support',
    'Attention to Detail',
    'Professional Installation Services',
    'Trusted by Businesses and Organizations',
  ],
  promise:
    'Every project we undertake is handled with passion, precision, and professionalism. We believe that great branding creates lasting impressions, and we are committed to helping our clients build memorable brands through exceptional design and premium-quality printing.',
  motto: 'Printing • Branding • Impact',
  slogan: 'Your Vision. Our Print. Lasting Impressions.',
  stats: [
    { value: 5, suffix: '+', label: 'Years of Industry Experience' },
    { value: 2000, suffix: '+', label: 'Projects Successfully Completed' },
    { value: 1000, suffix: '+', label: 'Happy Clients' },
    { value: 20, suffix: '+', label: 'Professional Branding Services' },
    { value: 98, suffix: '%', label: 'Customer Satisfaction Rate' },
  ],
  cta: {
    title: 'Ready to Elevate Your Brand?',
    description:
      "Whether you're launching a new business, promoting an event, or refreshing your company's image, Lewitt Signs is your trusted partner for premium printing and branding solutions.",
    tagline: "Let's create something extraordinary together.",
  },
}

export type AboutStat = { value: number; suffix: string; label: string }
