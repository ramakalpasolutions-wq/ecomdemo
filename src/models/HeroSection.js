import mongoose from 'mongoose'

const HeroSectionSchema = new mongoose.Schema({
  badge: {
    type: String,
    default: 'Plant-Powered Nutrition',
  },
  title: {
    type: String,
    default: 'Real Ingredients.',
  },
  subtitle: {
    type: String,
    default: 'Smarter Wellness.',
  },
  description: {
    type: String,
  },
  buttonText: {
    type: String,
    default: 'Shop Now',
  },
  buttonLink: {
    type: String,
    default: '/products',
  },
  image: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
})

export default mongoose.models.HeroSection || mongoose.model('HeroSection', HeroSectionSchema)
