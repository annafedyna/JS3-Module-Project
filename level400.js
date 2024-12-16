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
  showSelector.append(...showOptions);
}

export { renderShowOptions };
