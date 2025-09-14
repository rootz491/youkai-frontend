export interface SketchImage {
  asset: {
    _ref: string
    _type: string
  }
  alt?: string
  caption?: string
}

export interface Sketch {
  _id: string
  title?: string
  description?: string
  images: SketchImage[]
  tags?: string[]
  createdAt: string
  featured: boolean
  slug?: {
    current: string
  }
}
