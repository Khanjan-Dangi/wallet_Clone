const express = require("express");
const rootRouter = require('./routes/index');
const cors = require('cors');
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/v1',rootRouter);

app.listen(3000,(req,res)=>{
    console.log("Server is running on port 3000!");
})