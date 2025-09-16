import { Container } from '../ui/Layout'
import { Heading, Text } from '../ui/Typography'

interface SocialLink {
  name: string
  url: string
  icon: string
  color: string
}

const socialLinks: SocialLink[] = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/youkai_arts_',
    icon: '📷',
    color: 'hover:text-pink-500'
  },
  {
    name: 'Telegram',
    url: 'https://t.me/youkai2004--',
    icon: '✈️',
    color: 'hover:text-blue-500'
  },
  {
    name: 'Discord',
    url: 'https://discord.gg/grYEXm4qJp',
    icon: '🎮',
    color: 'hover:text-indigo-500'
  }
]

export default function AboutHero() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Profile Section */}
          <div className="text-center mb-16">
            {/* Profile Image */}
            <div className="relative w-32 h-32 mx-auto mb-8">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 p-1">
                <div className="w-full h-full rounded-full bg-gray-200 overflow-hidden">
                  {/* Placeholder profile image */}
                  <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center text-4xl">
                    🎨
                  </div>
                </div>
              </div>
            </div>

            <Heading level={1} align="center" className="mb-4 text-4xl md:text-5xl font-light">
              Anshul Kothari
            </Heading>
            
            <Text 
              variant="muted" 
              align="center" 
              className="text-xl mb-8 font-light tracking-wide"
            >
              Digital Artist & Visual Storyteller
            </Text>

            {/* Bio */}
            <div className="max-w-2xl mx-auto space-y-6">
              <Text 
                align="center" 
                className="text-lg leading-relaxed text-gray-700"
              >
                Welcome to my creative universe. I&apos;m a digital artist passionate about 
                capturing emotions through abstract forms and vibrant colors. Each piece 
                I create tells a story, exploring the intersection between traditional 
                Japanese aesthetics and contemporary digital expression.
              </Text>
              
              <Text 
                align="center" 
                className="text-base leading-relaxed text-gray-600"
              >
                Based in India, I draw inspiration from the city&apos;s constant evolution 
                and the quiet moments found within its chaos.
              </Text>
            </div>
          </div>

          {/* Social Links */}
          <div className="text-center">
            <Text 
              variant="muted" 
              align="center" 
              className="mb-6 text-sm uppercase tracking-widest"
            >
              Connect with me
            </Text>
            
            <div className="flex justify-center space-x-8">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex flex-col items-center space-y-2 transition-all duration-300 ${social.color}`}
                  aria-label={`Follow on ${social.name}`}
                >
                  <div className="text-3xl transform group-hover:scale-110 transition-transform duration-300">
                    {social.icon}
                  </div>
                  <Text 
                    variant="muted" 
                    className="text-sm group-hover:text-current transition-colors duration-300"
                  >
                    {social.name}
                  </Text>
                </a>
              ))}
            </div>
          </div>

          {/* Artistic Quote */}
          <div className="text-center mt-16 pt-16 border-t border-gray-200">
            <blockquote className="text-2xl font-light italic text-gray-600 max-w-xl mx-auto">
              &ldquo;Art is not what you see, but what you make others see.&rdquo;
            </blockquote>
            <Text variant="muted" className="mt-4 text-sm">
              — Edgar Degas
            </Text>
          </div>
        </div>
      </Container>
    </section>
  )
}