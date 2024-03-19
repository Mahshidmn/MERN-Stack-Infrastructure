const jwt = require ('jsonwebtoken')
const User = require('../../models/user');
const bcrypt =require('bcrypt');



async function create(req, res) {
   try {
    const user = await User.create(req.body)
    const token = createJWT(user);
    res.json(token);
   } catch(err) {
    res.status(400).json(err);

   }
  }

  async function login(req, res) {
    try {
        // find the existing user
        const user = await User.findOne({email: req.body.email});
        // check if the password hashes matches
        const match = await bcrypt.compare(req.body.password, user.password);

        if (!match) throw new Error('invalid username or password');
        const token = createJWT(user);
        //send token in JSON format back to the server
        res.json(token);
       } catch(err) {
        res.status(400).json(err);
    
       }
  }

  function checkToken(req, res) {
    console.log('req.user', req.user);
    res.json(req.exp);
  }

  // Helper fucntion
  function createJWT(user) {
    return jwt.sign(
        { user},
        process.env.SECRET,
        { expiresIn:'24h'}
    )
  }

  module.exports = {
    create,
    login,
    checkToken
  };
  