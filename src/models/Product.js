import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0
  },
  originalPrice: {
    type: Number,
    min: 0
  },
  category: {
    type: String,
    required: [true, 'Category is required']
  },
  stock: {
    type: Number,
    required: [true, 'Stock is required'],
    min: 0,
    default: 0
  },
  unit: {
    type: String,
    default: 'kg'
  },
  images: [{
    type: String
  }],
  badge: {
    type: String,
    enum: ['', 'bestseller', 'new', 'sale']
  },
  benefits: [{
    type: String
  }],
  nutritionFacts: [{
    type: String
  }],
  howToUse: [{
    type: String
  }],
  ingredients: String,
  servingSize: String,
  servingsPerContainer: String,
  status: {
    type: String,
    enum: ['active', 'draft', 'archived'],
    default: 'active'
  },
  sold: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

// Create index for search
ProductSchema.index({ name: 'text', description: 'text' })

export default mongoose.models.Product || mongoose.model('Product', ProductSchema)
