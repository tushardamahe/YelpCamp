const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "615b0af0988a8d04d89c49d6", // YOUR USER ID
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain...",
            price,
            geometry: { 
              "type" : "Point", 
              "coordinates" : [ 
                cities[random1000].longitude,
                cities[random1000].latitude
              ] 
            },
            images: [ 
                {
                    "url" : "https://res.cloudinary.com/dxfjxmly7/image/upload/v1644307326/Yelpcamp/vcpx64oguwgzfd638ggp.jpg", 
                    "filename" : "Yelpcamp/vcpx64oguwgzfd638ggp"
                },
                { 
                    "url" : "https://res.cloudinary.com/dxfjxmly7/image/upload/v1644307326/Yelpcamp/xckm9ehrcj0beefvxstm.jpg", 
                    "filename" : "Yelpcamp/xckm9ehrcj0beefvxstm"    
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
