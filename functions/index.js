const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mt = require("./providers/mtmomo");
const at = require("./providers/airtel");

admin.initializeApp();

const app = express();
app.use(cors({origin:true}));
app.use(bodyParser.json());

// initiate payment (collection)
app.post("/initiate-payment", async (req, res) => {
  const { uid, provider, amount, phone } = req.body;
  if (!uid || !provider || !amount || !phone) {
    return res.status(400).json({ error: "missing parameters" });
  }
  try {
    if (provider === "mtn") {
      const result = await mt.initiateCollection({amount, phone, uid});
      return res.json(result);
    } else if (provider === "airtel") {
      const result = await at.initiateCollection({amount, phone, uid});
      return res.json(result);
    } else {
      return res.status(400).json({ error: "unknown provider" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || String(err) });
  }
});

// basic webhook endpoints for providers to notify payment status
app.post("/webhook/mtn", async (req,res) => {
  console.log("MTN webhook", req.body);
  // TODO: verify signature and update Firestore transaction and user balance
  res.status(200).send("OK");
});

app.post("/webhook/airtel", async (req,res) => {
  console.log("Airtel webhook", req.body);
  // TODO: verify signature and update Firestore transaction and user balance
  res.status(200).send("OK");
});

exports.api = functions.https.onRequest(app);
