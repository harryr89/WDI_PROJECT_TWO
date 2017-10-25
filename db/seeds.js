const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const { dbUri } = require('../config/environment');
const Landscape = require('../models/landscapes');
mongoose.connect(dbUri, { useMongoClient: true });

//REQUIRE THE SEEDS BY NODEDB/SEEDS.JS

// Require the model
Landscape.collection.drop();
// Drop the model

// Create the models
Landscape
  .create([
    {
    name: 'VØRINGFOSSEN',
    location:  'Eidfjord, Norway',
    description: 'The impressive Vøringfossen waterfall plunges 183m (600 ft) from the Hardangervidda highlands into this gorge of the Eidfjord.',
    image: '../images/20090715-Vringfossen.jpg'
  },
  {
    name: 'STRANDA SUNSET',
    location:  'Bodø, Norway',
    description: 'At the end of a dreary overcast day the sun shines a fiery sunset through a gap under the clouds.  The famous Strandatindan, or Stranda peak, rises up on the right side of the photo.  As seen from Blåfjellet, a small mountain near the village of Kjerringøy which is north of Bodø.',
    image: '../images/20090722-Stranda-Sunset.jpg'
  },
  {
    name: 'STETIND REFLECTION',
    location:  'Tysfjord, Norway',
    description: 'Stetind is a remarkable peak in Norway (Norways national mountain in fact) rising abruptly 1392m (4564 ft.) above an arm of the Tysfjord southwest of the town of Narvik, in northern Norway.',
    image: '../images/20090801-Stetind-Reflection.jpg'
  },
  {
    name: 'LOFOTEN NIGHT',
    location:  'Lofoten, Norway',
    description: 'In the middle of the night in July north of the Arctic Circle, sunset and sunrise blend together seamlessly.  This is about as dark as it gets.  I took this photo on the way down from Hermannsdalstinden mountain at about 1:00 at night; I had watched the sunset from the summit, and by the time I got back to my tent at the bottom, the sunrise was already rising again.',
    image: '../images/lofoten.jpeg'
  },
  {
    name: 'BRIKSDALEN PARADISE',
    location:  'Jostedalsbreen, Norway',
    description: 'The mountains of Jostedalsbreen reflect peacefully in a turquoise lake in the Briksdal valley.',
    image: '../images/briksdale.jpeg'
  },
  {
    name: 'SUNNMØRE SUNSET',
    location:  'Sunnmøre Alps, Norway',
    description: 'Sunset light beams through the rugged peaks of the Sunnmøre Alps, as seen from the summit of Skåla, a high peak of the Jostedalsbreen range.',
    image: '../images/sunnm.jpeg'
  },
  {
    name: 'ARCTIC ALPENGLOW',
    location:  'Bodø, Norway',
    description: 'Blåfjellet peak illuminated by brilliant Arctic sunset light.  This mountain is located near the tiny town of Kjerringøy, which is just north of the city of Bodø, in northern Norway.',
    image: '../images/arctic.jpeg'
  },
  {
    name: 'HAMNØYA BOATS',
    location:  'Lofoten Islands, Norway',
    description: 'A jagged mountain spire overlooks the quiet fishing harbor at Hamnøya, near Reine.',
    image: '../images/hamnoya.jpeg'
  },
  {
    name: 'LYNGEN FIREWEED',
    location:  'Lyngen Alps, Norway',
    description: 'Brilliant pink fireweed and the Lyngen Alps, with Jægervatnet lake in between.',
    image: '../images/lyngen.jpeg'
  },
  {
    name: 'LONELY LITLMOLLA',
    location:  'Lofoten Islands, Norway',
    description: 'Dusk light with a view towards Litlmolla island, as seen from the summit of Fløya, a rugged peak above the town of Svolvær, Lofoten Islands, Norway.',
    image: '../images/lonely.jpeg'
  },
  {
    name: 'TROLLVEGGEN MIST',
    location:  'Romsdal, Norway',
    description: 'Storm clouds clear off the massive Trollveggen face, as seen from the top of the Trollstinden, far above the Romsdalen valley near Andalsnes.',
    image: '../images/troll.jpeg'
  },
  {
    name: 'TROLLVEGGEN DAWN',
    location:  'Romsdal, Norway',
    description: 'Dawn glow illuminates the massive east face of Trollstinden, which towers almost 6,000 vertical feet over the Romsdalen valley. The famous (amongst climbers) Trollveggen, or Troll Wall, is just on the other side of this spire. Its the tallest vertical mountain face in Europe, with a sheer, in some parts overhanging, 1000m (3,300 ft.) wall.',
    image: '../images/vegg.jpeg'
  }
])
.then(landscapes=> console.log(`${landscapes.length} ladscapes were created`))
  .catch((err) =>{
    console.log(err);
  })
  .finally(()=>{
    mongoose.connection.close();
  })
