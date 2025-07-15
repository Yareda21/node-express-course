# MongoDB Logical Query Operators Cheat Sheet

All snippets work on MongoDB Community 4.4+, Atlas, and Enterprise alike.

---

## 1. $or – At least ONE expression must be true

-   $gt = greater than (>)
-   $lt = less than (<)

**Where to use:**
Search filters where the document can satisfy any of several conditions (text, geo, nested fields, etc.).

**Shell example:**
Find inventory with qty < 20 or price == 10:

```js
// Shell
db.inventory.find({
    $or: [{ quantity: { $lt: 20 } }, { price: 10 }],
});
```

**Node.js (mongodb npm):**

```js
const filter = {
    $or: [{ quantity: { $lt: 20 } }, { price: 10 }],
};
const docs = await db.collection("inventory").find(filter).toArray();
```

---

## 2. $and – ALL expressions must be true

**Where to use:**
When you must stack multiple predicates that are not implicitly AND-ed by MongoDB (e.g., several $gt/$lt on the same field).

**Shell example:**
Status = "A" and qty < 30:

```js
// Shell
db.inventory.find({
    $and: [{ status: "A" }, { qty: { $lt: 30 } }],
});
```

---

## 3. $nor – NONE of the expressions may be true

**Where to use:**
Black-list style filters (“give me everything except …”).

**Shell example:**
Skip docs whose job_role is either "Senior Cashier" or "Store Manager":

```js
// Shell
db.employees.find({
    $nor: [{ job_role: "Senior Cashier" }, { job_role: "Store Manager" }],
});
```

---

## 4. $not – Negates a single predicate

**Where to use:**
When you only need to invert one condition.

**Shell example:**
Price is not 10:

```js
// Shell
db.inventory.find({ price: { $not: { $eq: 10 } } });
```

---

## 5. Putting them together (nested example)

**Where to use:**
When you need to combine multiple logical operators for complex queries.

**Shell example:**
Employees who are (IT or Finance) and age ≥ 25:

```js
// Shell
db.employees.find({
    $and: [
        { $or: [{ department: "IT" }, { department: "Finance" }] },
        { age: { $gte: 25 } },
    ],
});
```

---

## Quick Reference Table

| Operator | Logic    | Typical use-case      | Shell skeleton                    |
| -------- | -------- | --------------------- | --------------------------------- |
| $or      | ≥ 1 true | Any of these match    | { $or: [ {cond1}, {cond2} ] }     |
| $and     | all true | All must match        | { $and: [ {cond1}, {cond2} ] }    |
| $nor     | 0 true   | None must match       | { $nor: [ {cond1}, {cond2} ] }    |
| $not     | invert   | This must not be true | { field: { $not: <expression> } } |

> **Use these operators in `find()`, `updateMany()`, aggregation `$match`, etc.**

---

