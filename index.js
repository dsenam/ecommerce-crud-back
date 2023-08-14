const express = require('express');
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");
const admin = require("firebase-admin");


const serviceAccount = require("./serviceAccountJson.json");
const productCollection = "products";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({ origin: true }));
app.use(express.static("public"));



app.post("/products", async (req, res) => {
  try {
    const { name, price } = req.body;
    const product = {
      name,
      price,
    };

    const newDoc = await db.collection(productCollection).add(product);

    res.status(201).send(`Created a new product: ${newDoc.id}`);
  } catch (error) {
    res.status(400).send("Product should cointain  name, price");
  }
});

app.get("/products", async (req, res) => {
  try {
    const productQuerySnapshot = await db.collection(productCollection).get();
    const products = [];
    productQuerySnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/products/:productId", (req, res) => {
  const productId = req.params.productId;
  db.collection(productCollection)
    .doc(productId)
    .get()
    .then((product) => {
      if (!product.exists) throw new Error("Product not found");
      res.status(200).json({ id: product.id, data: product.data() });
    })
    .catch((error) => res.status(500).send(error));
});

app.delete("/products/:productId", (req, res) => {
  db.collection(productCollection)
    .doc(req.params.productId)
    .delete()
    .then(() => res.status(204).send("Document successfully deleted!"))
    .catch(function (error) {
      res.status(500).send(error);
    });
});

app.put("/products/:productId", async (req, res) => {
  await db
    .collection(productCollection)
    .doc(req.params.productId)
    .set(req.body, { merge: true })
    .then(() => res.json({ id: req.params.productId }))
    .catch((error) => res.status(500).send(error));
});


exports.app = app;
