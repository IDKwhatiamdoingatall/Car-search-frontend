let currentPage = 1;
let currentQuery = "";

document.getElementById("searchBtn").addEventListener("click", async () => {
  currentPage = 1;
  currentQuery = document.getElementById("query").value.trim();

  if (!currentQuery) {
    alert("Please enter a search term.");
    return;
  }

  await fetchResults(currentQuery, currentPage);
});

async function fetchResults(query, page) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/search`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, page }),
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
    document.getElementById("pagination").style.display = "block";
  } else {
    resultsDiv.innerText = "No results found or an error occurred.";
    document.getElementById("pagination").style.display = "none";
  }

  // Disable the Previous button on page 1
  document.getElementById("prevPageBtn").disabled = currentPage === 1;
}

document.getElementById("nextPageBtn").addEventListener("click", async () => {
  currentPage++;
  await fetchResults(currentQuery, currentPage);
});

document.getElementById("prevPageBtn").addEventListener("click", async () => {
  if (currentPage > 1) {
    currentPage--;
    await fetchResults(currentQuery, currentPage);
  }
});
