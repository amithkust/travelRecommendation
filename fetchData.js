// fetchData.js

// Function to fetch data from the JSON file
async function fetchTravelData() {
    try {
      // Fetch the JSON file
      const response = await fetch('travel_recommendation_api.json');
  
      // Check if the response is OK (status code 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Parse the JSON data
      const data = await response.json();
  
      // Log the fetched data to the console
      console.log('Fetched Data:', data);
  
      // Return the data for further use
      return data;
    } catch (error) {
      // Handle any errors that occur during the fetch operation
      console.error('Error fetching data:', error);
    }
  }
  
  // Function to display search results
  function displaySearchResults(results) {
    const searchResultsContainer = document.getElementById('searchResults');
  
    // Clear previous results
    searchResultsContainer.innerHTML = '';
  
    // Check if there are any results
    if (results.length === 0) {
      searchResultsContainer.innerHTML = '<p>No results found.</p>';
      return;
    }
  
    // Create HTML content for each result
    const resultsHTML = results
      .map(
        (result) => `
        <div class="result">
          <h2>${result.name}</h2>
          <img src="${result.image}" alt="${result.name}" width="200">
          <p>${result.description}</p>
        </div>
      `
      )
      .join('');
  
    // Insert the HTML content into the container
    searchResultsContainer.innerHTML = resultsHTML;
  }
  
  // Function to handle the search
  async function handleSearch() {
    // Get the user's input
    const searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
  
    // Check if the input is empty
    if (!searchInput) {
      alert('Please enter a keyword to search.');
      return;
    }
  
    // Fetch the travel data
    const travelData = await fetchTravelData();
  
    // Define keywords and their variations
    const keywords = {
      beach: ['beach', 'beaches'],
      temple: ['temple', 'temples'],
      country: ['australia', 'country'],
    };
  
    // Find the matching keyword
    let matchedKeyword = null;
    for (const [key, variations] of Object.entries(keywords)) {
      if (variations.includes(searchInput)) {
        matchedKeyword = key;
        break;
      }
    }
  
    // Filter the data based on the matched keyword
    let results = [];
    if (matchedKeyword) {
      results = travelData.cities.filter((city) => {
        // Check if the city name or description includes the matched keyword
        return (
          city.name.toLowerCase().includes(matchedKeyword) ||
          city.description.toLowerCase().includes(matchedKeyword)
        );
      });
    } else {
      // If no keyword is matched, search for the input in the city name or description
      results = travelData.cities.filter((city) => {
        return (
          city.name.toLowerCase().includes(searchInput) ||
          city.description.toLowerCase().includes(searchInput)
        );
      });
    }
  
    // Display the search results
    displaySearchResults(results);
  }
  
  // Function to clear the search results
  function clearSearch() {
    document.getElementById('searchInput').value = ''; // Clear the input field
    document.getElementById('searchResults').innerHTML = ''; // Clear the results
  }
  
  // Add event listeners to the buttons
  document.getElementById('btnSearch').addEventListener('click', handleSearch);
  document.getElementById('btnClear').addEventListener('click', clearSearch);