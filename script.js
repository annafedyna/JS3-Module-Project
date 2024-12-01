function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function addZero(num) {
  return num < 10 ? `0${num}` : num
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  createEpisodeCards(episodeList, rootElem);
}

function createEpisodeCards(episodeList, rootElem) {
  episodeList.forEach((episode) => {
    newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.innerHTML = `<div class = "title-card">${episode.name} - S${addZero(
      episode.season
    )}E${addZero(episode.number)}</div>;
    <img src="${episode.image.medium}" alt="${episode.name}" />
    <p>${episode.summary}</p>`;
    rootElem.append(newCard);
  });
}

window.onload = setup;

