const mongoose = require('mongoose');
const initData = require('./data');
const Listing = require('../models/listing');

const db ='mongodb://127.0.0.1:27017/wanderlust';

mongoose.connect(db)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

const initializeDatabase = async () => {
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=> ({...obj , owner: "686c22e489005d78734bf1bd"}));
    await Listing.insertMany(initData.data);

    console.log('Database initialized with sample data');
}

initializeDatabase();