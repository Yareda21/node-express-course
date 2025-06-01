# MongoDB and Mongoose Guide

## Table of Contents

-   [Core Concepts](#core-concepts)
-   [MongoDB Structure](#mongodb-structure)
-   [Setup Guide](#setup-guide)
-   [Key Terms](#key-terms)

## Core Concepts

### Schemas

A schema is a blueprint defining how data is organized in a database:

-   **MongoDB (NoSQL)**: Schema-less - documents in the same collection can have different fields
-   **Mongoose (ODM)**: Adds schema enforcement on top of MongoDB for structure and validation

Example Schema:

```javascript
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Must exist
    age: { type: Number, min: 18 }, // Minimum age 18
    courses: [String], // Array of strings
});
```

Benefits of using schemas:

-   Prevents invalid data
-   Ensures consistency
-   Simplifies code

### Clusters

A cluster is a group of servers working together to store your database:

#### Types

-   **Local Cluster**: Runs on your machine (good for development)
-   **Cloud Cluster (MongoDB Atlas)**: Managed by MongoDB in the cloud (used for production)

Benefits:

-   Automatic backups
-   Scaling
-   Security

Structure: `Cluster → Databases → Collections → Documents`

### Geographic Location

When using MongoDB Atlas (cloud), you choose a cloud region (e.g., "Germany," "USA") for your cluster. This affects:

-   Data residency laws (e.g., GDPR compliance)
-   Speed (closer to users = faster access)

## MongoDB Structure

### Visual Representation

Imagine a filing cabinet:

-   **Database** = Cabinet (e.g., School_Cabinet)
-   **Collection** = Drawer in the cabinet (e.g., Students_Drawer)
-   **Document** = File in the drawer (e.g., Alex_File.json)
-   **Field** = Detail in the file (e.g., "age": 22)

### Example Structure

```
School Database (school_db)
│
├── Students Collection
│   ├── Document 1: {
│   │     _id: "123",
│   │     name: "Alex",
│   │     grade: "A"
│   │   }
│   └── Document 2: {
│         _id: "456",
│         name: "Priya",
│         age: 21  // Different fields allowed!
│       }
│
└── Courses Collection
    └── Document: {
          title: "Math",
          credits: 4
        }
```

## Setup Guide

### 1. Install Required Tools

-   MongoDB Community Server (local) OR
-   MongoDB Atlas (cloud – recommended for beginners)

### 2. MongoDB Atlas Setup

#### Step 1: Create Account

-   Create account
-   Build a Free Tier Cluster
-   Select a location (e.g., "Germany (Frankfurt)")

#### Step 2: Security Setup

-   Whitelist your IP
-   Create a database user

#### Step 3: Get Connection String

```env
MONGODB_URI = "mongodb+srv://username:password@cluster0.abc123.mongodb.net/school_db?retryWrites=true&w=majority"
```

### 3. Node.js/Express Setup

```bash
npm init -y                # Initialize project
npm install express mongoose dotenv  # Install packages
```

### 4. Project Structure

```
your-project/
├── .env                   # Stores MONGODB_URI
├── server.js              # Express app
├── models/                # Mongoose models
│   └── Student.js         # Schema definition
└── package.json
```

## Key Terms

| Term    | Meaning                                                              |
| ------- | -------------------------------------------------------------------- |
| Schema  | Blueprint for data structure (enforced by Mongoose, not raw MongoDB) |
| Cluster | Group of servers storing your database (local or cloud)              |
| Shard   | Horizontal partition of data across servers (auto-managed in Atlas)  |
| Atlas   | MongoDB's cloud service (handles clusters, backups, scaling)         |
| ODM     | "Object Data Modeling" (Mongoose) – translates JS code ↔ MongoDB     |
