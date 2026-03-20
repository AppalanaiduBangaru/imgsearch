const accessKey = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw";



const formEl = document.getElementById("form");
const searchInputEl = document.getElementById("search-input");
const searchResultsEl = document.getElementById("search-results");
const showMoreButtonEl = document.getElementById("show-more-button");
const loader = document.getElementById("loader");

let page = 1;
let inputData = "";
const perPage = 30;

async function searchImages(loadMore = false) {
  inputData = searchInputEl.value.trim();

  if (!loadMore) {
    page = 1;
    searchResultsEl.innerHTML = "";
  }

  loader.style.display = "block";

  try {
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&per_page=${perPage}&order_by=relevant&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    results.forEach((result) => {
      const div = document.createElement("div");
      div.classList.add("search-result");

      const img = document.createElement("img");
      img.src = result.urls.small;

      const link = document.createElement("a");
      link.href = result.links.html;
      link.target = "_blank";
      link.textContent = "View";

      div.appendChild(img);
      div.appendChild(link);
      searchResultsEl.appendChild(div);
    });

    page++;
    showMoreButtonEl.style.display = "block";

  } catch (err) {
    console.log(err);
  } finally {
    loader.style.display = "none";
  }
}

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  searchImages(false);
});

showMoreButtonEl.addEventListener("click", () => {
  searchImages(true);
});