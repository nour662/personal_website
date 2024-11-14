document.addEventListener("DOMContentLoaded", () => {
    const portfolioContainer = document.getElementById("portfolio-container");
    const tagFilter = document.getElementById("tag-filter");

    // Fetch portfolio data
    fetch("../util/portfolio.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            console.log("Portfolio data loaded:", data); // Debugging: Check data loaded
            populateTags(data);
            renderPortfolioItems(data);

            // Filter portfolio items on tag change
            tagFilter.addEventListener("change", () => filterPortfolio(data));
        })
        .catch(error => console.error("Error loading portfolio data:", error));

    // Populate tag filter dropdown
    function populateTags(data) {
        const uniqueTags = new Set();
        data.forEach(project => {
            if (project.tags) {
                project.tags.forEach(tag => uniqueTags.add(tag));
            }
        });

        // Sort tags alphabetically
        const sortedTags = Array.from(uniqueTags).sort();

        sortedTags.forEach(tag => {
            const option = document.createElement("option");
            option.value = tag;
            option.textContent = tag;
            tagFilter.appendChild(option);
        });
    }

    // Render portfolio items
    function renderPortfolioItems(data) {
        portfolioContainer.innerHTML = ""; // Clear existing items
        data.forEach(project => {
            const item = document.createElement("div");
            item.className = "portfolio-item";

            item.innerHTML = `
                <img src="${project.image || 'img/default.jpg'}" alt="${project.project_title || 'Project'}">
                <h3>${project.project_title || 'Untitled Project'}</h3>
                <p>${project['short-description'] || 'No description available.'}</p>
                <p class="long-description">${project['long-description'] || ''}</p>
                <a href="${project.link}" target="_blank">View Project</a>
            `;
            portfolioContainer.appendChild(item);
        });
    }

    // Filter portfolio items based on selected tag
    function filterPortfolio(data) {
        const selectedTag = tagFilter.value;
        const filteredData = selectedTag === "all"
            ? data
            : data.filter(project => project.tags && project.tags.includes(selectedTag));
        
        renderPortfolioItems(filteredData);
    }
});
