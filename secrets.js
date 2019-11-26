function getSecret(){
  secret = "A two million dollar woman am I. Everything I need is right here in my arms, and dreams, dreams they shall come."
  return secret;
}
function getDB(){
  db = "mongodb://localhost:27017/yelp_camp_v12"
  return db;
}

module.exports = {getSecret, getDB};