const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://root:root@cluster0.acjs7a9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Replace 'yourDatabaseName' with your actual database name

mongoose.connect(MONGO_URI, )
  .then(() => console.log('Successfully connected to MongoDB✅'))
  .catch((error) => console.error('Error connecting to MongoDB ❌', error));
