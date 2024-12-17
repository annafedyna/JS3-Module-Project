const showSelector = document.querySelector("#show-selector");

function createShowSelector(show) {
  const showOption = document.createElement("option");
  showOption.value = show.id; // Use show.id as the value
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

export { renderShowOptions, showSelector };
