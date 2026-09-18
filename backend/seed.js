require('dotenv').config();
const mongoose = require('mongoose');
const Event = require('./models/Event');

const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://nti-G5:deadomar12495@cluster0.g1a3fgq.mongodb.net/Eventhub?retryWrites=true&w=majority';

const sampleEvents = [
  {
    title: 'Tech Innovation Summit 2026',
    description: 'Explore the future of AI, cloud architecture, and full-stack web systems.',
    date: new Date('2026-11-15'),
    location: 'Cairo Convention Center',
    price: 50,
    category: 'Technology'
  },
  {
    title: 'Web Development Workshop',
    description: 'Hands-on session building REST APIs with Node.js, Express, and Angular.',
    date: new Date('2026-12-01'),
    location: 'Online Workshop',
    price: 20,
    category: 'Workshop'
  }
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGO_URI);

    await Event.deleteMany({});
    console.log('Cleared existing events collection.');

    const created = await Event.insertMany(sampleEvents);
    console.log(`✅ Successfully inserted ${created.length} events into MongoDB Atlas!`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
}

seedDatabase();