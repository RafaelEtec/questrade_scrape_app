# Mercado Livre Scraper

## IMPORTANT NOTE
Yes, the API was supposed to target Amazon's website, but upon trying to establish a connection to the endpoint, an [Error 503](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/http-503-service-unavailable.html) was returned.

This error is related to backend integration when the API Gateway is unable to receive a response. The backend server might be:
- Overloaded beyond capacity and unable to process new client requests.
- Undergoing temporary maintenance.

I tried my best to overcome the issue, but unfortunately, I didn't succeed.

So, for the sake of completing the challenge, I changed the subject to [Mercado Livre](https://www.mercadolivre.com.br/), a well-known e-commerce platform in Brazil and other South American countries.

I hope you consider the change valid and review my submission fairly.

## Description
Mercado Livre Scraper is a simple application that allows users to scrape product information from Mercado Livre based on a search keyword. The scraped information includes:
- Product Title
- Rating (stars out of five)
- Number of Reviews
- Product Image URL

This is a **full-stack project**, consisting of a Node.js backend (using Bun) and a simple frontend built with HTML, CSS, and Vanilla JavaScript (using Vite).

## Features
- Scrapes product data from Mercado Livre's search results.
- Displays product data in a user-friendly card-based design.
- Error handling for both backend and frontend.

---

## Requirements
Make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [Bun](https://bun.sh)
- A modern browser (e.g., Chrome, Firefox)

---

## Installation

### Backend
1. Clone the repository and navigate into the project directory:
   ```bash
   git clone https://github.com/RafaelEtec/questrade_scrape_app.git
   cd questrade_scrape_app
   ```
2. Install backend dependencies using Bun:
   ```bash
   bun install
   ```
3. Install backend dependencies using npm:
   ```bash
   npm install
   ```

5. Start the backend server:
   ```bash
   bun server.js
   ```

You can now access and test the API:
[http://localhost:3000/api/scrape?keyword=<KEYWORD>](http://localhost:3000/api/scrape?keyword=)


### Frontend
1. Run the frontend
   ```bash
   cd frontend
   npm run dev
   ```

You can now access the Website on your browser:
[http://localhost:5173/](http://localhost:5173/)
