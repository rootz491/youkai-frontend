import { LinkButton } from '../ui/Button'
import { Container } from '../ui/Layout'
import { Heading, Text } from '../ui/Typography'

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
  { label: 'About', href: '#' },
  { label: 'Contact', href: '#' }
]

export default function Footer({ 
  title = 'Youkai Art Gallery',
  description = 'Exploring creativity through digital art and sketches. Each piece tells a unique story.',
  links = defaultLinks,
  copyright = '© 2025 Youkai Art Gallery. All rights reserved.'
}: FooterProps) {
  return (
    <footer className="bg-gradient-to-r from-gray-100 to-gray-200 border-t border-gray-300 mt-16">
      <Container>
        <div className="text-center">
          <Heading level={3} variant="primary" align="center" className="mb-4">
            {title}
          </Heading>
          
          <Text variant="muted" align="center" className="mb-6 max-w-md mx-auto">
            {description}
          </Text>
          
          <div className="flex justify-center space-x-6 text-gray-500 mb-8">
            {links.map((link) => (
              <LinkButton 
                key={link.href}
                href={link.href}
                variant="ghost"
              >
                {link.label}
              </LinkButton>
            ))}
          </div>
          
          <div className="pt-8 border-t border-gray-300">
            <Text variant="muted" size="sm" align="center">
              {copyright}
            </Text>
          </div>
        </div>
      </Container>
    </footer>
  )
}