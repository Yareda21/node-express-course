const { people, products } = require("../data");

exports.getPeople = (req, res) => res.json(people);

exports.getPerson = (req, res) => {
    const person = people.find((p) => p.id === parseInt(req.params.id));
    if (!person) return res.status(404).json({ msg: "Person not found" });
    const bookmarks = person.bookmarks.map((id) =>
        products.find((p) => p.id === id)
    );
    res.json({ ...person, bookmarks });
};

exports.createPerson = (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ msg: "Name required" });
    const id = people.length + 1;
    const person = { id, name, bookmarks: [] };
    people.push(person);
    res.status(201).json(person);
};

exports.updatePerson = (req, res) => {
    const person = people.find((p) => p.id === parseInt(req.params.id));
    if (!person) return res.status(404).json({ msg: "Person not found" });
    if (req.body.name) person.name = req.body.name;
    res.json(person);
};

exports.deletePerson = (req, res) => {
    const index = people.findIndex((p) => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ msg: "Person not found" });
    const deleted = people.splice(index, 1);
    res.json(deleted[0]);
};

exports.addBookmark = (req, res) => {
    const person = people.find((p) => p.id === parseInt(req.params.userId));
    const product = products.find(
        (p) => p.id === parseInt(req.params.productId)
    );
    if (!person || !product)
        return res.status(404).json({ msg: "User or Product not found" });
    if (!person.bookmarks.includes(product.id))
        person.bookmarks.push(product.id);
    res.json({ msg: "Bookmarked" });
};

exports.removeBookmark = (req, res) => {
    const person = people.find((p) => p.id === parseInt(req.params.userId));
    if (!person) return res.status(404).json({ msg: "User not found" });
    person.bookmarks = person.bookmarks.filter(
        (id) => id !== parseInt(req.params.productId)
    );
    res.json({ msg: "Removed from bookmarks" });
};

exports.getBookmarks = (req, res) => {
    const person = people.find((p) => p.id === parseInt(req.params.userId));
    if (!person) return res.status(404).json({ msg: "User not found" });
    const bookmarks = person.bookmarks.map((id) =>
        products.find((p) => p.id === id)
    );
    res.json(bookmarks);
};
