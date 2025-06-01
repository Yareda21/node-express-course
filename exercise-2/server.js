const express = require("express");
const app = express();
const productRoutes = require("./routes/products");
const peopleRoutes = require("./routes/people");
const logger = require("./middleware/logger");
const auth = require("./middleware/auth");

app.use(express.json());
app.use(logger);
app.use(auth);

app.use("/api/products", productRoutes);
app.use("/api/people", peopleRoutes);

app.use((err, req, res, next) => {
    res.status(500).json({ msg: "Internal Server Error", error: err.message });
});

app.listen(5000, () => console.log("Server running on port 5000"));
