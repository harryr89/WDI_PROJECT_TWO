module.exports = {
  port: process.env.PORT || 3000,
  dbUri: process.env.MONGODB_URI || 'mongodb://localhost/have-a-rest',
  sessionSecret: process.env.SESSION_SECRET || 'YghT5s617/1{%sDt shh it\'s a secret'
};

// module.exports = {
//   port: process.env.PORT || 4000,
//   dbURL: process.env.MONGODB_URI || 'mongodb://localhost/i-movie-db',
//   secret: process.env.SESSION_SECRET || 'shh it\'s a secret'
// };
