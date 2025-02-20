require('dotenv').config();
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Define User Details Schema
const userDetailsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNumber: { type: String, required: true },
  bio: { type: String, required: true }
});

const UserDetails = mongoose.model('UserDetails', userDetailsSchema);

// Function to initialize data
const initDB = async () => {
  try {
    const existing = await UserDetails.findOne();
    if (!existing) {
      await UserDetails.create({
        name: "Ashiq Firoz",
        rollNumber: "2022BCD0013",
        bio: "Just Google me :)"
      });
      console.log("Initial data inserted.");
    } else {
      console.log("Data already exists.");
    }
  } catch (err) {
    console.error("Error initializing DB:", err);
  } finally {
    mongoose.connection.close();
  }
};

// Run the function
initDB();
