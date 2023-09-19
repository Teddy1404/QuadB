import express from "express";
import mongoose from "mongoose";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8080;
mongoose.connect("mongodb://127.0.0.1:27017/PMS");

app.use(cors());
const cryptoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  base_unit: {
    type: String,
    required: true,
  },
  quote_unit: {
    type: String,
    required: true,
  },
  low: {
    type: String,
    required: true,
  },
  high: {
    type: String,
    required: true,
  },
  last: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  open: {
    type: String,
    required: true,
  },
  volume: {
    type: String,
    required: true,
  },
  sell: {
    type: String,
    required: true,
  },
  buy: {
    type: String,
    required: true,
  },
  at: {
    type: Number,
    required: true,
  },
});

const Crypto = mongoose.model("Crypto", cryptoSchema);

async function getPosts() {
  try {
    const mypost = await fetch("https://api.wazirx.com/api/v2/tickers");
    const response = await mypost.json();

    for (const tickerName in response) {
      if (response.hasOwnProperty(tickerName)) {
        const tickerData = response[tickerName];
        const crypto = new Crypto({
          name: tickerName,
          base_unit: tickerData.base_unit,
          quote_unit: tickerData.quote_unit,
          low: tickerData.low,
          high: tickerData.high,
          last: tickerData.last,
          type: tickerData.type,
          open: tickerData.open,
          volume: tickerData.volume,
          sell: tickerData.sell,
          buy: tickerData.buy,
          at: tickerData.at,
        });

        await crypto.save();
      }
    }
    console.log("Data saved successfully.");
  } catch (error) {
    console.error("Error fetching and saving data:", error);
  }
}

getPosts();
// Serve static files from the frontend folder
app.use(express.static("frontend"));

// Define an Express route to send data to the frontend
app.get("/crypto-data", async (req, res) => {
  try {
    const data = await Crypto.find().limit(10); // Retrieve data from MongoDB
    res.json(data); // Send the data as JSON to the frontend
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ error: "Error retrieving data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
