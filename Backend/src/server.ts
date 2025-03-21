// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.get("/", (req, res) => {
//   res.send("Inventory API is running...but working as well");
// });

// // Set the port
// const PORT = process.env.PORT || 8000;

// // Start the server
// app.listen(PORT, async () => {
//   const url = `http://127.0.0.1:${PORT}/`;
//   console.log(`Starting development server at ${url}`);

  
// });

// workmkkkkk
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Inventory Aarya Motor Tour and Travels APIs is running..");
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// changes

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "../src/routes/authRoutes";
import { welcome } from "../src/pages/welcome";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", welcome);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
