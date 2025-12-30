const mongoose = require('mongoose')
require('dotenv').config({ path: '.env.local' })

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ MongoDB Connected')
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message)
    process.exit(1)
  }
}

const ProductSchema = new mongoose.Schema({
  name: String,
  slug: String,
  description: String,
  price: Number,
  originalPrice: Number,
  images: [String],
  category: String,
  benefits: [String],
  ingredients: String,
  servingSize: String,
  servingsPerContainer: String,
  nutritionFacts: [{ label: String, value: String }],
  certifications: [String],
  howToUse: String,
  stock: Number,
  badge: String,
  status: { type: String, default: 'active' },
  rating: Number,
  reviewCount: Number,
}, { timestamps: true })

const CategorySchema = new mongoose.Schema({
  name: String,
  slug: String,
  description: String,
  icon: String,
  count: Number,
  color: String,
  status: { type: String, default: 'active' },
}, { timestamps: true })

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema)
const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema)

const categories = [
  {
    name: 'Snacks',
    slug: 'snacks',
    description: 'Healthy, plant-based snacks with no refined sugars',
    icon: '🥜',
    count: 45,
    color: 'bg-orange-100',
    status: 'active'
  },
  {
    name: 'Superfoods',
    slug: 'superfoods',
    description: 'Nutrient-dense foods packed with vitamins and minerals',
    icon: '🌱',
    count: 32,
    color: 'bg-green-100',
    status: 'active'
  },
  {
    name: 'Proteins',
    slug: 'proteins',
    description: 'Plant-based proteins for muscle and recovery',
    icon: '💪',
    count: 28,
    color: 'bg-blue-100',
    status: 'active'
  },
  {
    name: 'Wellness',
    slug: 'wellness',
    description: 'Supplements for overall health and vitality',
    icon: '✨',
    count: 38,
    color: 'bg-purple-100',
    status: 'active'
  },
  {
    name: 'Herbs',
    slug: 'herbs',
    description: 'Traditional herbal remedies and adaptogens',
    icon: '🌿',
    count: 24,
    color: 'bg-teal-100',
    status: 'active'
  },
  {
    name: 'Vitamins',
    slug: 'vitamins',
    description: 'Essential vitamins for daily health',
    icon: '💊',
    count: 35,
    color: 'bg-pink-100',
    status: 'active'
  }
]

const products = [
  {
    name: 'Organic Raw Crunch Granola',
    slug: 'organic-raw-crunch-granola',
    description: 'Our Organic Raw Crunch Granola is made with sprouted ingredients and contains no refined sugars. Perfect for breakfast or as a healthy snack throughout the day.',
    price: 1299,
    originalPrice: 1599,
    images: ['/products/granola.jpg'],
    category: 'Snacks',
    benefits: ['Grain Free', 'Plant-Based', 'Organic', 'No Refined Sugar'],
    ingredients: 'Organic Coconut Flakes, Sprouted Sunflower Seeds, Sprouted Pumpkin Seeds, Banana, Dried Plums, Organic Maca Powder',
    servingSize: '200g',
    servingsPerContainer: '7',
    nutritionFacts: [
      { label: 'Calories', value: '150' },
      { label: 'Total Fat', value: '8g' },
      { label: 'Protein', value: '5g' },
      { label: 'Total Carbs', value: '15g' },
      { label: 'Fiber', value: '4g' }
    ],
    certifications: ['USDA Organic', 'Non-GMO Project Verified', 'Vegan', 'Gluten-Free'],
    howToUse: 'Enjoy as is for a crunchy snack, add to yogurt, or use as a topping for smoothie bowls.',
    stock: 45,
    badge: 'bestseller',
    status: 'active',
    rating: 4.8,
    reviewCount: 234
  },
  {
    name: 'Premium Ashwagandha Powder',
    slug: 'ashwagandha-powder',
    description: 'Premium organic Ashwagandha powder for stress relief and better sleep. Sourced from the finest organic farms in India.',
    price: 899,
    originalPrice: null,
    images: ['/products/ashwagandha.jpg'],
    category: 'Wellness',
    benefits: ['Stress Relief', 'Organic', 'Sleep Support', 'Adaptogen'],
    ingredients: 'Organic Ashwagandha Root Powder (Withania somnifera)',
    servingSize: '1 tsp (3g)',
    servingsPerContainer: '30',
    nutritionFacts: [
      { label: 'Calories', value: '10' },
      { label: 'Withanolides', value: '15mg' }
    ],
    certifications: ['USDA Organic', 'Non-GMO', 'Vegan'],
    howToUse: 'Mix 1 teaspoon with warm water, milk, or smoothies. Take once or twice daily.',
    stock: 120,
    badge: 'new',
    status: 'active',
    rating: 4.6,
    reviewCount: 189
  },
  {
    name: 'Sprouted Almond Butter',
    slug: 'sprouted-almond-butter',
    description: 'Creamy sprouted almond butter made from organic almonds. No added sugar, no preservatives.',
    price: 799,
    originalPrice: 999,
    images: ['/products/almond-butter.jpg'],
    category: 'Snacks',
    benefits: ['Sugar Free', 'Refined Free', 'Sprouted', 'High Protein'],
    ingredients: 'Organic Sprouted Almonds, Sea Salt',
    servingSize: '250g',
    servingsPerContainer: '12',
    nutritionFacts: [
      { label: 'Calories', value: '180' },
      { label: 'Total Fat', value: '16g' },
      { label: 'Protein', value: '7g' }
    ],
    certifications: ['USDA Organic', 'Vegan', 'Gluten-Free'],
    howToUse: 'Spread on toast, add to smoothies, or eat straight from the jar!',
    stock: 65,
    badge: '',
    status: 'active',
    rating: 4.7,
    reviewCount: 312
  },
  {
    name: 'Organic Protein Blend',
    slug: 'organic-protein-blend',
    description: 'Plant-based protein blend with pea, brown rice, and hemp protein. Perfect for post-workout recovery.',
    price: 1599,
    originalPrice: null,
    images: ['/products/protein.jpg'],
    category: 'Proteins',
    benefits: ['Plant-Based', 'Vegan', 'Complete Protein', '25g Protein'],
    ingredients: 'Organic Pea Protein, Organic Brown Rice Protein, Organic Hemp Protein, Natural Vanilla Flavor',
    servingSize: '30g (1 scoop)',
    servingsPerContainer: '20',
    nutritionFacts: [
      { label: 'Calories', value: '120' },
      { label: 'Protein', value: '25g' },
      { label: 'Total Carbs', value: '3g' }
    ],
    certifications: ['USDA Organic', 'Vegan', 'Non-GMO'],
    howToUse: 'Mix 1 scoop with 250ml water, milk, or your favorite smoothie.',
    stock: 88,
    badge: 'bestseller',
    status: 'active',
    rating: 4.9,
    reviewCount: 456
  },
  {
    name: 'Turmeric Curcumin Capsules',
    slug: 'turmeric-curcumin-capsules',
    description: 'High-potency turmeric curcumin with black pepper extract for maximum absorption.',
    price: 1199,
    originalPrice: null,
    images: ['/products/turmeric.jpg'],
    category: 'Wellness',
    benefits: ['Anti-Inflammatory', 'Organic', 'Joint Support', 'Immunity'],
    ingredients: 'Organic Turmeric Root Extract (95% Curcuminoids), Black Pepper Extract (Piperine)',
    servingSize: '2 capsules',
    servingsPerContainer: '30',
    nutritionFacts: [
      { label: 'Turmeric Extract', value: '1000mg' },
      { label: 'Curcuminoids', value: '950mg' }
    ],
    certifications: ['USDA Organic', 'Vegan', 'Non-GMO'],
    howToUse: 'Take 2 capsules daily with meals.',
    stock: 150,
    badge: '',
    status: 'active',
    rating: 4.5,
    reviewCount: 178
  },
  {
    name: 'Spirulina Powder',
    slug: 'spirulina-powder',
    description: 'Pure organic spirulina powder packed with protein, vitamins, and minerals.',
    price: 999,
    originalPrice: 1299,
    images: ['/products/spirulina.jpg'],
    category: 'Superfoods',
    benefits: ['Superfood', 'Energy', 'High Protein', 'Detox'],
    ingredients: 'Organic Spirulina (Arthrospira platensis)',
    servingSize: '1 tsp (5g)',
    servingsPerContainer: '30',
    nutritionFacts: [
      { label: 'Calories', value: '20' },
      { label: 'Protein', value: '4g' },
      { label: 'Iron', value: '2mg' }
    ],
    certifications: ['USDA Organic', 'Vegan', 'Non-GMO'],
    howToUse: 'Add 1 teaspoon to smoothies, juices, or water.',
    stock: 95,
    badge: 'sale',
    status: 'active',
    rating: 4.4,
    reviewCount: 145
  }
]

async function seedDatabase() {
  try {
    await connectDB()
    
    // Clear existing data
    await Product.deleteMany({})
    await Category.deleteMany({})
    console.log('🗑️  Cleared existing data')
    
    // Insert categories
    await Category.insertMany(categories)
    console.log('✅ Categories seeded')
    
    // Insert products
    await Product.insertMany(products)
    console.log('✅ Products seeded')
    
    console.log('🎉 Database seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Seeding error:', error)
    process.exit(1)
  }
}

seedDatabase()
