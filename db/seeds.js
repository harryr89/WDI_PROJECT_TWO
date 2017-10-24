const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbUri } = require('../config/environment');
const Landscape = require('../models/landscapes');
mongoose.connect(dbUri, { useMongoClient: true });

// Require the model
Landscape.collection.drop();
// Drop the model

// Create the models
Landscape
  .create([
    {
    name: 'Primrose Hill',
    location:  'London',
    description: 'A hill',
    image: 'https://www.standard.co.uk/s3fs-public/thumbnails/image/2016/08/16/07/primrosehill.jpg'
  },
  {
    name: 'Relay Building',
    location:  'Aldgate East',
    description: 'A building',
    image: 'http://www.allsop.co.uk/resources/2016/01/Relay-exterior-850x628.jpg'
  }])
.then(landscapes=> console.log(`${landscapes.length} ladscapes were created`))
  .catch((err) =>{
    console.log(err);
  })
  .finally(()=>{
    mongoose.connection.close();
  })
