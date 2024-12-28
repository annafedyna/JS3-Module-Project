import { getAllEpisodePerShowFetch } from "./getEpisodesFetch.js";
import {renderShowCards} from './createShowCards.js'
import getData from "./services.js";



const state = {
  allShows: [],
  allEpisodes: [],
};
const showNavbarCards = document.querySelector(".show-cards");
const showsNavbar = document.querySelector(".shows-navbar");
const filterSearch = document.querySelector("#show-live-filter");
const filterDropDown = document.querySelector("#filtered-show-selector");
const backToShowsBtn = document.querySelector("#back-to-shows");
const episodesNarbar = document.querySelector(".episodes-navbar");
const rootElem = document.getElementById("root");


async function setup() {

  state.allShows = await getData();
  episodesNarbar.style.display = "none";
  renderShowCards(state.allShows, showNavbarCards);

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

  filterDropDown.addEventListener("change", (event) => {
    const chosenShowName = event.target.value;
    if (chosenShowName == 'All Shows') {
      const showItems = document.querySelectorAll(".show-card");
      showItems.forEach((show) => {show.style.display = "block"})
    } else {
      const showItems = document.querySelectorAll(".show-card");
      showItems.forEach((show) => {
        const showText = show.querySelector(".title-show-card").textContent;
        if (showText.includes(chosenShowName)) {
          show.style.display = "block";
        } else {
          show.style.display = "none";
        }
      });
    }
  
  });

  const allShowCards = document.querySelectorAll(".show-card")
  allShowCards.forEach((card) => {
    card.addEventListener("click",
      async (event) => {
        episodesNarbar.style.display = "block";
        showsNavbar.style.display = "none";
        const showId = event.currentTarget.getAttribute("data-id");
        state.allEpisodes = await getAllEpisodePerShowFetch(showId);
        updateEpisodes(state.allEpisodes);
      })
  })


  // Initial load: fetch and display episodes for the first show
  if (state.allShows.length > 0) {
    const firstShowId = state.allShows[0].id;
    state.allEpisodes = await getAllEpisodePerShowFetch(firstShowId);
    updateEpisodes(state.allEpisodes);
  }

  backToShowsBtn.addEventListener("click", () => {
    showsNavbar.style.display = "block";
    episodesNarbar.style.display = "none";
  })
}

// ================================================ EPISODES =========================================

function addZero(num) {
  return num < 10 ? `0${num}` : num;
}

function makePageForEpisodes(episodeList) {
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

function updateEpisodes(episodes) {
  makePageForEpisodes(episodes);
  makeListOfEpisodeToSelect(episodes);
  displayMatchingEpisodes();
}

// ================================================ LIVE SEARCH ==============================================
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

//============================================  Episode Selector creation Feature =================================
const episodeSelectorTemplate = document.querySelector(
  "#episode-selector-temp"
);
const episodeSelectorTemplateClone =
  episodeSelectorTemplate.content.cloneNode(true);
const liveSearchElement = document.querySelector("#live-search");

if (liveSearchElement) {
  const parentElement = liveSearchElement.parentNode;
  if (parentElement) {
    parentElement.insertBefore(episodeSelectorTemplateClone, liveSearchElement);
  }
}

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

//==================================================  Filter by Drop Down Select Feature =========================
function filterEpisodeUsingDropDown(event, listClass = ".card") {
  const selectedEpisodeName = event.target.value.toLowerCase();
  const episodeListItems = document.querySelectorAll(listClass);
  episodeListItems.forEach((episode) => {
    const episodeText = episode.textContent.toLocaleLowerCase();
    if (episodeText.includes(selectedEpisodeName)) {
      episode.style.display = "block";
    } else {
      episode.style.display = "none";
    }
  });
}
// ====================  event lister for drop down option selection
episodeSelector.addEventListener("change", (event) => {
  filterEpisodeUsingDropDown(event, '.card');
});


//=========================================================

window.onload = setup;
