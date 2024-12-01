function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  
  displayMatchingEpisodes()
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


function displayMatchingEpisodes(){
  const liveSearchInput = document.querySelector("#live-search");
  const episodeListItems = document.querySelectorAll(".card");
  liveSearchInput.addEventListener('input', ()=> {
    filterEpisodeBySearch(episodeListItems, liveSearchInput)
  })
}

function filterEpisodeBySearch(episodeListItems, liveSearchInput){
  const liveSearchInputValue = liveSearchInput.value.toLowerCase()
  let countMatchEpisode = 0
    episodeListItems.forEach(episode =>{
      if(episode.textContent.toLowerCase().includes(liveSearchInputValue)){
        countMatchEpisode++
        const episodeMatchNumberEl = document.querySelector('#episode-match-number')
        episodeMatchNumberEl.textContent = `Displaying: ${countMatchEpisode}/${episodeListItems.length} episode (s)`
        episode.classList.remove('hidden-card')
      } else{
        episode.classList.add('hidden-card')
      }
})
}

window.onload = setup;
