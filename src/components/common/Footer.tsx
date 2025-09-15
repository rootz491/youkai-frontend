import Container from '../ui/Layout/Container'
import Heading from '../ui/Typography/Heading'
import Text from '../ui/Typography/Text'

interface FooterLink {
  label: string
  href: string
}

interface FooterProps {
  title?: string
  description?: string
  links?: FooterLink[]
  copyright?: string
}

const defaultLinks: FooterLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '#' }
]

export default function Footer({ 
  title = 'Studio Youkai',
  description = 'Creating art that speaks to the soul. Every sketch tells a story, every illustration captures a moment.',
  links = defaultLinks,
  copyright = '© 2025 Studio Youkai. All rights reserved.'
}: FooterProps) {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 text-white mt-16 py-12">
      <Container>
        <div className="text-center">
          <Heading 
            level={3} 
            align="center" 
            className="mb-4 studio-youkai-title text-2xl text-white"
          >
            {title}
          </Heading>
          
          <Text 
            variant="muted" 
            align="center" 
            className="mb-6 max-w-md mx-auto text-gray-400"
          >
            {description}
          </Text>
          
          <div className="flex justify-center space-x-6 mb-8">
            {links.map((link, index) => (
              <a 
                key={`${link.label}-${index}`}
                href={link.href}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          
          <div className="pt-8 border-t border-gray-800">
            <Text 
              variant="muted" 
              align="center"
              className="text-sm text-gray-500"
            >
              {copyright}
            </Text>
          </div>
        </div>
      </Container>
    </footer>
  )
}