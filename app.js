require("dotenv").config();
const express = require("express");
const requestIp = require("request-ip");


const port = process.env.PORT;
const router = require("./routers/server");
const app = express();

app.use(express.json());
app.use(requestIp.mw());

app.get("/",(req,res)=>{
  res.send("welcome")
})

app.use("/example.com/api", router);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});


app.listen(port, () => {
  console.log(`server started successfully on port:${port}`);
});
