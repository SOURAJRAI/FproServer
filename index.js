const {connectDB,store}=require('./Database/db')
const dotenv = require("dotenv");
const app=require('./app');

dotenv.config();

connectDB();

PORT = process.env.PORT;




app.listen(PORT, () => {
  console.log(`Port Listing on ${PORT}`);
});


