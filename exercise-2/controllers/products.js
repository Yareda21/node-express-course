const { products } = require("../data");

exports.getProducts = (req, res) => {
    const { search, minPrice, maxPrice, page = 1, limit = 10 } = req.query;
    let results = [...products];

    if (search) results = results.filter((p) => p.name.includes(search));
    if (minPrice)
        results = results.filter((p) => p.price >= parseFloat(minPrice));
    if (maxPrice)
        results = results.filter((p) => p.price <= parseFloat(maxPrice));

    const start = (page - 1) * limit;
    const paginated = results.slice(start, start + parseInt(limit));
    res.json(paginated);
};

exports.getProduct = (req, res) => {
    const product = products.find((p) => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json(product);
};

exports.createProduct = (req, res) => {
    const { name, image, price, desc } = req.body;
    if (!name || !image || !price || !desc)
        return res.status(400).json({ msg: "Missing fields" });
    const id = products.length + 1;
    const product = { id, name, image, price, desc };
    products.push(product);
    res.status(201).json(product);
};

exports.updateProduct = (req, res) => {
    const product = products.find((p) => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ msg: "Product not found" });
    Object.assign(product, req.body);
    res.json(product);
};

exports.deleteProduct = (req, res) => {
    const index = products.findIndex((p) => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ msg: "Product not found" });
    const deleted = products.splice(index, 1);
    res.json(deleted[0]);
};
