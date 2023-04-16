
  (async function () {
    const response = await fetch("./data.json");
    const data = await response.json();

    const inputElem = document.getElementById("searchInput");
    const inputElem1 = document.getElementById("searchYear");
    const inputElem2 = document.getElementById("searchRating");
    const searchBtn = document.getElementById("searchBtn");
    const listElem = document.getElementById("data-list");
    for (let i = 0; i < data.length; i++) {
     option = document.createElement("option");
      option.text = data[i].title;
      option.value = data[i].id;
      inputElem.appendChild(option);
    }
    for(let i =0; i<data.length; i++){
      option =document.createElement("option");
      option.text = data[i].release_date;
      inputElem1.appendChild(option);
    }
    for(let i=0; i<data.length; i++){
      option = document.createElement("option");
      option.text = data[i].vote_average;
      inputElem2.appendChild(option);
    }
 
    function displaySearchResults(results) {
      listElem.innerHTML = "";
      results.forEach(function (d) {
        const li = document.createElement("li");
        const listItem = `
          <h2 class="title">${d.title}</h2>
          <div class="genre">${d.genres}</div>
          <div class="date">${d.release_date
          }</div>
          <div class="rating">${d.vote_average}</div>
          <div class="year">${d.certification
          }</div>
      `;
        li.innerHTML = listItem;
        li.addEventListener("click", function () {
          loadRecipeDetails(d);
        });
        listElem.appendChild(li);
      })
      
    }

    function search() {
      const query = document.getElementById('searchInput').value.toLowerCase();
      const results = data.filter(function (d) {
        if (d.ingredients) {
          return (d.title.toLowerCase().includes(query) ||
            d.ingredients.join(" ").toLowerCase().includes(query));
        } else {
          return d.title.toLowerCase().includes(query);
        }
      });

      displaySearchResults(results);
    }

    searchBtn.addEventListener("click", search);
  })();