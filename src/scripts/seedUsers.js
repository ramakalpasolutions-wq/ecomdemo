const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
require('dotenv').config({ path: '.env.local' })

const User = require('../models/User').default || require('../models/User')

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ MongoDB Connected')

    // Clear existing users
    await User.deleteMany({})
    console.log('🗑️  Cleared existing users')

    // Hash passwords
    const adminPassword = await bcrypt.hash('admin123', 10)
    const userPassword = await bcrypt.hash('user123', 10)

    // Create test users
    const users = [
      {
        name: 'Admin User',
        email: 'admin@test.com',
        password: adminPassword,
        role: 'admin',
        isActive: true
      },
      {
        name: 'Test User',
        email: 'user@test.com',
        password: userPassword,
        role: 'user',
        isActive: true
      }
    ]

    await User.insertMany(users)
    console.log('✅ Users seeded')
    console.log('\n📧 Test Accounts:')
    console.log('Admin: admin@test.com / admin123')
    console.log('User: user@test.com / user123')

    console.log('\n🎉 Database seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

seedUsers()
