// Import necessary modules
const express = require("express"); // Framework for creating the HTTP server
const axios = require("axios"); // Library for making HTTP requests
const { JSDOM } = require("jsdom"); // For parsing and interacting with HTML DOM
const path = require("path"); // For handling file paths
const cors = require("cors"); // Middleware for managing Cross-Origin Resource Sharing (CORS)

const app = express(); // Initialize the Express application
const port = 3000; // Define the port where the server will listen

// Enable CORS to allow requests from other origins
app.use(cors()); // This allows the frontend (from a different origin) to access the backend

// Define the scraping endpoint
app.get("/api/scrape", async (req, res) => {
  const keyword = req.query.keyword; // Retrieve the keyword from query parameters
  if (!keyword) return res.status(400).json({ error: "Keyword is required" }); // Return error if no keyword is provided

  try {
    // Send a request to the Mercado Livre search page with the specified keyword
    const response = await axios.get(
      `https://lista.mercadolivre.com.br/${encodeURIComponent(keyword)}#D[A:${encodeURIComponent(keyword)}]`
    );
    const dom = new JSDOM(response.data); // Parse the HTML response into a DOM structure
    const document = dom.window.document; // Access the document object for querying elements

    const products = []; // Initialize an array to store the extracted product details
    const productElements = document.querySelectorAll(".ui-search-layout__item"); // Select all product items on the page

    // Iterate over each product element and extract relevant data
    productElements.forEach((item) => {
      const title = item.querySelector(".poly-component__title")?.textContent || "N/A"; // Extract the product title
      const rating = item.querySelector(".poly-reviews__rating")?.textContent || "N/A"; // Extract the rating
      const reviews = item.querySelector(".poly-reviews__total")?.textContent || "N/A"; // Extract the number of reviews
      const image = item.querySelector(".poly-component__picture")?.src || "N/A"; // Extract the product image URL

      products.push({ title, rating, reviews, image }); // Add the product data to the array
    });

    res.json(products); // Send the extracted product data as a JSON response
  } catch (error) {
    // Handle any errors during the scraping process
    res.status(500).json({ error: "Failed to scrape data" }); // Return an error response
  }
});

// Serve the frontend static files from the "frontend/dist" directory
app.use(express.static(path.join(__dirname, "frontend/dist")));

// Catch-all route to serve the frontend index.html for all other requests
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/dist/index.html"));
});

// Start the server and listen on the specified port
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));