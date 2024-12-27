import { renderShowOptions, showSelector } from "./createShowSelector.js";
import { getAllEpisodePerShowFetch } from "./getEpisodesFetch.js";
import getData from "./services.js";

const state = {
  allShows: [],
  allEpisodes: [],
};


async function setup() {
  const showNavbar = document.querySelector(".show-cards");
  const filterSearch = document.querySelector("#show-live-filter");
  const filterDropDown = document.querySelector("#filtered-show-selector");
  

  state.allShows = await getData();
  renderShowOptions(state.allShows);
  renderShowCards(state.allShows, showNavbar);

  filterSearch.addEventListener('input', (event) => {
    filterDropDown.innerHTML = ``
    let showFilteredNumber = document.querySelector(
      "#shows-match-number-filter"
    );
    let count = 0;
    const filterText = event.target.value.toLowerCase();
    const showItems = document.querySelectorAll(".show-card");
    showItems.forEach((show) => {
      const showText = show.textContent.toLocaleLowerCase();
      if (showText.includes(filterText)) {
        show.style.display = "block";
        let showName = show.querySelector(".title-show-card").textContent;
        let newOption = document.createElement("option")
        newOption.textContent = `${showName}`;
        filterDropDown.append(newOption)
        count += 1
      } else {
        show.style.display = "none";
      }
    });
    showFilteredNumber.textContent= ` Found : ${count} shows`
  })
  // Add event listener to the show selector
  showSelector.addEventListener("change", async (event) => {
    const showId = event.target.value;
    state.allEpisodes = await getAllEpisodePerShowFetch(showId);
    updateEpisodes(state.allEpisodes);
  });

  // Initial load: fetch and display episodes for the first show
  if (state.allShows.length > 0) {
    const firstShowId = state.allShows[0].id;
    state.allEpisodes = await getAllEpisodePerShowFetch(firstShowId);
    updateEpisodes(state.allEpisodes);
  }
}

// ==================== show Card =====================
function renderShowCards(shows, parent) {
  shows.forEach((showData) => {
    parent.append(createShowCard(showData));
  });
}

function createShowCard(showData) {
  const newCard = document.createElement("div");
  newCard.classList.add('show-card')
  newCard.innerHTML = `<div class="title-show-card">${showData.name}</div>
  <div class= "show-card-main">
    <img src="${showData.image.medium}" alt="${showData.name}" />
    <p>${showData.summary}</p>
    <div class = "show-info"><span>Rated: ${showData.rating.average}</span>
    <span>Genres: ${showData.genres.join(" |  ")}</span>
    <span>Status: ${showData.status}</span>
    <span>RunTime : ${showData.runtime}</span></div>;
  </div>`;
    
  return newCard;
}



function addZero(num) {
  return num < 10 ? `0${num}` : num;
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.innerHTML = ""; // Clear previous episodes
  const episodeCards = episodeList.map(createEpisodeCards);
  rootElem.append(...episodeCards);
}

function createEpisodeCards(episode) {
  const newCard = document.createElement("div");
  newCard.classList.add("card");
  newCard.innerHTML = `<div class="title-card">${episode.name} - S${addZero(
    episode.season
  )}E${addZero(episode.number)}</div>
    <img src="${episode.image.medium}" alt="${episode.name}" />
    <p>${episode.summary}</p>`;
  return newCard;
}

// updates episodes on the page
function updateEpisodes(episodes) {
  makePageForEpisodes(episodes);
  makeListOfEpisodeToSelect(episodes);
  displayMatchingEpisodes();
}

// ============================  LIVE SEARCH  =============================
function displayMatchingEpisodes() {
  const liveSearchInput = document.querySelector("#live-search");
  const episodeListItems = document.querySelectorAll(".card");
  liveSearchInput.addEventListener("input", () => {
    filterEpisodeBySearch(episodeListItems, liveSearchInput);
  });
}

function filterEpisodeBySearch(episodeListItems, liveSearchInput) {
  const liveSearchInputValue = liveSearchInput.value.toLowerCase();
  let countMatch = 0;
  episodeListItems.forEach((episode) => {
    const episodeContent = episode.textContent.toLowerCase();
    if (episodeContent.includes(liveSearchInputValue)) {
      countMatch++;
      const episodeMatch = document.querySelector("#episode-match-number");
      const matchMsg = `Displaying: ${countMatch}/${episodeListItems.length} episode (s)`;
      episodeMatch.textContent = matchMsg;
      episode.classList.remove("hidden-card");
    } else {
      episode.classList.add("hidden-card");
    }
  });
}

//===============Episode Selector creation Feature============================
const episodeSelectorTemplate = document.querySelector(
  "#episode-selector-temp"
);
const episodeSelectorTemplateClone =
  episodeSelectorTemplate.content.cloneNode(true);
document.body.insertBefore(
  episodeSelectorTemplateClone,
  document.querySelector("#live-search")
);

const episodeSelector = document.querySelector("#episode-selector");

function makeListOfEpisodeToSelect(allEpisodes) {
  const episodeOptionList = allEpisodes.map(createEpisodeToSelect);
  episodeSelector.innerHTML = ""; // Clear previous options
  episodeSelector.append(...episodeOptionList);
}

function createEpisodeToSelect(episode) {
  const episodeOption = document.createElement("option");
  episodeOption.value = episode.name;
  const formattedSeason = `S${addZero(episode.season)}`;
  const formattedEpisode = `E${addZero(episode.number)}`;
  const episodeName = episode.name;
  episodeOption.textContent = `${formattedSeason}${formattedEpisode} - ${episodeName}`;
  episodeOption.classList.add("episode-option");

  return episodeOption;
}

//====================Filter by Drop Down Select Feature=========================
function filterEpisodeUsingDropDown(event) {
  const selectedEpisodeName = event.target.value.toLowerCase();
  const episodeListItems = document.querySelectorAll(".card");
  episodeListItems.forEach((episode) => {
    const episodeText = episode.textContent.toLocaleLowerCase();
    if (episodeText.includes(selectedEpisodeName)) {
      episode.style.display = "block";
    } else {
      episode.style.display = "none";
    }
  });
}
//event lister for drop down option selection
episodeSelector.addEventListener("change", (event) => {
  filterEpisodeUsingDropDown(event);
});
//=========================================================

window.onload = setup;
