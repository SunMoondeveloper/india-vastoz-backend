require("dotenv").config();
const express = require("express");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const studioRoutes = require("./routes/studioRoutes");
const addressRoutes = require("./routes/addressRoutes");
const stripeRoutes = require("./routes/stripeRoutes");
const valorRoutes = require("./routes/valorRoutes");
const orderRoutes = require("./routes/orderRoutes");
const fedexRoutes = require("./routes/fedexRoutes");
const salestaxRoutes = require("./routes/salestaxRoutes");
const studiomultimediaRoutes = require("./routes/studiomultimediaRoutes");
const studioSubscriptionRoutes = require("./routes/studioSubscriptionRoutes");
const studioSubscriptiontypeRoutes = require("./routes/studioSubscriptiontypeRoutes");
const { connectDB } = require("./config/db");
const cors = require("cors");
var bodyParser = require('body-parser');


connectDB();

const app = express();

app.use(express.json());
//app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.json({ message: "API running..." });
});

app.use("/api/products", productRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/studio", studioRoutes);
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/stripe", stripeRoutes);
app.use("/api/valor", valorRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/fedex", fedexRoutes);
app.use("/api/salestax", salestaxRoutes);
app.use("/api/studiomultimedia", studiomultimediaRoutes);
app.use("/api/studiosubscription", studioSubscriptionRoutes);
app.use("/api/studiosubscriptiontype", studioSubscriptiontypeRoutes);

//const PORT = process.env.PORT || 5455;
const PORT =  5455;
app.listen(PORT,'0.0.0.0', () => console.log(`Server running on port ${PORT}`));
