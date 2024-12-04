function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);

  displayMatchingEpisodes();
}

function addZero(num) {
  return num < 10 ? `0${num}` : num;
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  const episodeCards = episodeList.map(createEpisodeCards);
  rootElem.append(...episodeCards);
}

function createEpisodeCards(episode) {
  const newCard = document.createElement("div");
  newCard.classList.add("card");
  newCard.innerHTML = `<div class = "title-card">${episode.name} - S${addZero(
    episode.season
  )}E${addZero(episode.number)}</div>;
    <img src="${episode.image.medium}" alt="${episode.name}" />
    <p>${episode.summary}</p>`;
  return newCard;
}

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

//create section of episode selector
const episodeSelectorTemplate = document.querySelector(
  "#episode-selector-temp"
);
const episodeSelectorTemplateClone =
  episodeSelectorTemplate.content.cloneNode(true);
// const episodeOption = episodeSelectorTemplateClone.querySelector('#episode-data')
document.body.insertBefore(
  episodeSelectorTemplateClone,
  document.querySelector("#live-search")
);

const allEpisodes = getAllEpisodes();

const episodeOptionList = [];
allEpisodes.forEach((episode) => {
  const episodeToSelect = createEpisodeToSelect(episode)
  console.log(episodeToSelect)
});

function createEpisodeToSelect(episode) {
  const episodeOption = document.createElement("option");
  episodeOption.value = episode.name;
  episodeOption.textContent = `S${addZero(episode.season)}E${
    episode.number
  } - ${episode.name}`;

  return episodeOption
}
window.onload = setup;
