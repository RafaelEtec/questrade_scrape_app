// Add a click event listener to the "scrapeBtn" button
document.getElementById("scrapeBtn").addEventListener("click", async () => {
  // Get the value of the keyword input field
  const keyword = document.getElementById("keyword").value;

  // If no keyword is entered, alert the user and exit the function
  if (!keyword) {
    alert("Please enter a keyword");
    return;
  }

  try {
    // Make a GET request to the backend scraping endpoint with the keyword as a query parameter
    const response = await fetch(`http://localhost:3000/api/scrape?keyword=${encodeURIComponent(keyword)}`);
    
    // Parse the JSON response from the backend into a JavaScript object/array
    const products = await response.json();

    // Select the results container element
    const resultsDiv = document.getElementById("results");

    // Map over the products array and dynamically generate HTML for each product
    resultsDiv.innerHTML = products
      .map(
        (p) =>
          `<div>
             <h2>${p.title}</h2> <!-- Display the product title -->
             <p>Rating: ${p.rating}</p> <!-- Display the product rating -->
             <p>Reviews: ${p.reviews}</p> <!-- Display the number of reviews -->
             <img src="${p.image}" alt="${p.title}" style="max-width: 200px;" /> <!-- Display the product image -->
           </div>`
      )
      .join(""); // Combine all the HTML into one string and insert it into the results container
  } catch (error) {
    // Handle a specific case where the error is a 503 Service Unavailable error
    if (error.status === 503) {
      alert("Error 503 - This error is related to the backend integration when the API Gateway API is unable to receive a response. The backend server might be: 1. Overloaded beyond capacity and unable to process new client requests. 2. Under temporary maintenance.");
    } else {
      // Handle any other errors and alert the user
      alert(error, "Failed to fetch data");
    }
  }
});