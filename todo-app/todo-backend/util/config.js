const MONGO_URL = process.env.MONGO_URL || undefined;
const REDIS_URL = process.env.REDIS_URL || undefined;

console.log("urls", REDIS_URL, MONGO_URL);

module.exports = {
  MONGO_URL, //: "mongodb://the_username:the_password@mongo:27017/the_database",
  REDIS_URL, //: "//redis:6379",
  // command to start: PORT=3005 REDIS_URL=redis://localhost:6379 MONGO_URL=mongodb://the_username:the_password@localhost:3456/the_database npm run start
};
