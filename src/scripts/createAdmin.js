const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
require('dotenv').config({ path: '.env.local' })

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, default: 'user' },
  createdAt: { type: Date, default: Date.now }
})

const User = mongoose.models.User || mongoose.model('User', UserSchema)

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ Connected to MongoDB')

    // Check if admin exists
    const existingAdmin = await User.findOne({ email: 'admin@example.com' })
    
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists!')
      console.log('📧 Email: admin@example.com')
      console.log('🔑 Password: Admin@123')
      await mongoose.connection.close()
      process.exit(0)
    }

    // Hash password
    const hashedPassword = await bcrypt.hash('Admin@123', 10)

    // Create admin user
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin'
    })

    console.log('✅ Admin user created successfully!')
    console.log('📧 Email:', admin.email)
    console.log('🔑 Password: Admin@123')
    console.log('🚀 You can now login at: http://localhost:3000/login')
    
    await mongoose.connection.close()
    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error.message)
    await mongoose.connection.close()
    process.exit(1)
  }
}

createAdmin()
