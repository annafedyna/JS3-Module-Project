const filterDropDown = document.querySelector("#filtered-show-selector");

function renderShowCards(shows, parent) {
  shows.forEach((showData) => {
    parent.append(createShowCard(showData));
  });
}

function createShowCard(showData) {
  const newCard = document.createElement("div");
  newCard.classList.add("show-card");
  newCard.setAttribute("data-id", showData.id);
  newCard.innerHTML = `<div class="title-show-card">${showData.name}</div>
  <div class= "show-card-main">
    <img src="${showData.image.medium}" alt="${showData.name}" />
    <p>${showData.summary}</p>
    <div class = "show-info"><span>Rated: ${showData.rating.average}</span>
    <span>Genres: ${showData.genres.join(" |  ")}</span>
    <span>Status: ${showData.status}</span>
    <span>RunTime : ${showData.runtime}</span></div>;
  </div>`;

  let newOption = document.createElement("option");
    newOption.textContent = `${showData.name}`;
    filterDropDown.append(newOption);
  return newCard;
}



export { renderShowCards };
