const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')



require('dotenv').config(); 
const app = express();
app.use(express.json())
app.use(cors())


// database connect
mongoose.connect(process.env.MONGODB_URL);

mongoose.connection.on("connected", () => {
    console.log("✅ Connected to MongoDB");
});
mongoose.connection.on("error", (e) => {
    console.error("❌ MongoDB Connection Error:", e);
});


// routes
const userRoutes = require('./routes/userRoutes')
app.use('/api/users', userRoutes)



// get port from .env
const port = process.env.PORT || 4000;
app.listen(port, ()=>{
    console.log("Server is running on port " + port);
})