import reddit from "./redditapi";

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

searchForm.addEventListener("submit", (e) => {
  const searchTerm = searchInput.value;
  const sortBy = document.querySelector('input[name="sortby"]:checked').value;

  const searchLimit = document.getElementById("limit").value;

  if (searchTerm === "") {
    showMessage("Please add a search term", "alert-danger");
  }

  searchInput.value = "";

  reddit.search(searchTerm, searchLimit, sortBy).then((results) => {
      console.log(results);
    let output = '<div class="row row-cols-1 row-cols-md-2 g-4 ">';
    results.forEach((post) => {

        const image=post.preview ? post.preview.images[0].source.url:'https://external-preview.redd.it/iDdntscPf-nfWKqzHRGFmhVxZm4hZgaKe5oyFws-yzA.png?auto=webp&s=38648ef0dc2c3fce76d5e1d8639234d8da0152b2'
      output += `<div class="row row-cols-1 row-cols-md-2 g-4" style="width: 18rem;">
        <img src="${image}" class="card-img-top" alt="..." >
        <div class="card-body">
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${post.subreddit_name_prefixed}</p>
          <a href="${post.url}" target="blank" class="btn btn-primary">Read More</a>
        <hr>
        <span class="badge badge-secondary">Score:${post.score}</span>
        
          </div>
      </div>`;
    });
    output+='</div>';
    document.getElementById('results').innerHTML=output;
  });

  e.preventDefault();
});

function showMessage(message, className) {
  const div = document.createElement("div");
  div.className = `alert ${className}`;

  div.appendChild(document.createTextNode(message));

  const searchContainer = document.getElementById("search-container");

  const search = document.getElementById("search");

  searchContainer.insertBefore(div, search);

  setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

function truncateText(text,limit){

    const shortened=text.indexOf('',limit);
    if(shortened===-1)
        return text;
    return text.substring(0,shortened);

}