

const users=require('../MODEL/schema')

const jwt=require('jsonwebtoken')



exports.login = async (req, res) => {
    const { username, password } = req.body;
  
    // Specify the email and password directly in the code
    const specifiedUsername = "mukund";
    const specifiedPassword = "cutter461#";
  
    try {
      let existingUser;
  
      // Check if the provided email and password match the specified ones
      if (username === specifiedUsername && password === specifiedPassword) {
        existingUser = { username: specifiedUsername, _id: "1" };
      } else {
        // If not the specified user, proceed with the database lookup
        existingUser = await users.findOne({ username, password });
      }
  
      console.log(existingUser);
  
      if (existingUser) {
        // Generate a token if they match     
        const token = jwt.sign({ userid: existingUser._id }, "secretkey123");
  
        res.status(200).json({
          existingUser,
          token
        });
      } else {
        // Respond with an error if they don't match
        res.status(404).json('Invalid username or password');
      }
    } catch (err) {
      res.status(401).json(`Login request failed due to: ${err}`);
    }

  };


 














