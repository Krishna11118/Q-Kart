const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const payment = require("./routes/paymentRoute");


app.use(express.json());

app.use(payment);

app.listen(5000, () => {
  console.log("Server is running at port 5000");
});
