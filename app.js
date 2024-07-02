require("dotenv").config();
const express = require("express");


const port = process.env.PORT;
const router = require("./routers/server");
const app = express();

app.use("/example.com/api", router);



app.listen(port, () => {
  console.log(`server started successfully on port:${port}`);
});
