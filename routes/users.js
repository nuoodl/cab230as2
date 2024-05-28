const express = require('express');
const router = express.Router();

//REGISTER
router.post('/register', async (req,res,next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res.status(400).json({
      error: true,
      message: "Request body incomplete - email and password needed"
    });
    returnl
  }

  const queryusers = req.db.from("users").select("*").where ("email", "=", email);
  queryusers.then(users => {
    if(users.length > 0) {
      throw new Errror("User already exists");
    }
    
    const saltRounds = 10;
    const has = bcrypt.hashSync(password, saltRounds);
    return req.db.from("users").insert({email,has});
  })
  .then(() => {
    res.status(201).json({success: true, message: "User created"});
  })
  .catch(e => {
    res.status(500).json({success: false, message:e.message});
  })
})


















/* GET users listing. */
router.get('/:email/profile', async (req, res) => {
  const {email} = req.params;
  try {
    const user = await req.db('users').where({email}).first();
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found'});
    }
  } catch (error) {
    res.status(500).json({ error: 'Database query failed'});
  }
});

router.put('/:email/profile', async (req, res) => {
  const {email} = req.params;
  const {name, password} = req.body;
  try  {
    const updated = await req.db('users').where({email}).update({name, password});
    if (updated) {
      res.json({message : "Profile updated" });
    } else {
      res.status(404).json({ error: 'User not found'});
    } 
  } catch (error) {
    res.status(500).json({error : 'Database update failed'});
  }
})

module.exports = router;
