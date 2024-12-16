const showSelector = document.querySelector("#show-selector");

function createShowSelector(show) {
  const showOption = document.createElement("option");
  showOption.value = show.name;
  const showName = show.name;
  showOption.textContent = showName;
  showOption.classList.add("show-option");
  return showOption;
}

function renderShowOptions(shows) {
  const showOptions = shows.map(createShowSelector);
  showOptions.sort((a, b) => a.textContent.localeCompare(b.textContent));
  showSelector.append(...showOptions);
}

async function getAllEpisodePeShowFetch(showId) {
  const response = await fetch(
    `https://api.tvmaze.com/shows/${showId}/episodes`
  );
  const data = await response.json();
  return data;
}

export { renderShowOptions, getAllEpisodePeShowFetch };
