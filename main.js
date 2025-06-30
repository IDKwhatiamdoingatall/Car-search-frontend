document.getElementById("searchBtn").addEventListener("click", async () => {
  const query = document.getElementById("query").value.trim();

  // Block empty searches
  if (!query) {
    alert("Please enter a search term.");
    return;
  }

  const res = await fetch(`${import.meta.env.VITE_API_URL}/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  const data = await res.json();
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (data.results && data.results.length > 0) {
    data.results.forEach(({ title, link, snippet }) => {
      const item = document.createElement("div");
      item.innerHTML = `<h3><a href="${link}" target="_blank">${title}</a></h3><p>${snippet}</p>`;
      resultsDiv.appendChild(item);
    });
  } else {
    resultsDiv.innerText = "No results found or an error occurred.";
  }
});
