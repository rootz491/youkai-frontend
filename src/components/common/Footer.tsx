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
  variant?: 'light' | 'dark'
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
  copyright = '© 2025 Youkai Art Gallery. All rights reserved.',
  variant = 'light'
}: FooterProps) {
  const isDark = variant === 'dark'
  
  return (
    <footer className={`border-t mt-16 py-12 ${
      isDark 
        ? 'bg-gray-900 border-gray-800 text-white' 
        : 'bg-gradient-to-r from-gray-100 to-gray-200 border-gray-300'
    }`}>
      <Container>
        <div className="text-center">
          <Heading 
            level={3} 
            variant={isDark ? 'primary' : 'primary'}
            align="center" 
            className={`mb-4 studio-youkai-title text-2xl ${
              isDark ? 'text-white' : ''
            }`}
          >
            {title}
          </Heading>
          
          <Text 
            variant="muted" 
            align="center" 
            className={`mb-6 max-w-md mx-auto ${
              isDark ? 'text-gray-400' : ''
            }`}
          >
            {description}
          </Text>
          
          <div className="flex justify-center space-x-6 mb-8">
            {links.map((link) => (
              <a 
                key={link.href}
                href={link.href}
                className={`transition-colors ${
                  isDark 
                    ? 'text-gray-400 hover:text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
          
          <div className={`pt-8 border-t ${
            isDark ? 'border-gray-800' : 'border-gray-300'
          }`}>
            <Text 
              variant="muted" 
              align="center"
              className={`text-sm ${
                isDark ? 'text-gray-500' : ''
              }`}
            >
              {copyright}
            </Text>
          </div>
        </div>
      </Container>
    </footer>
  )
}