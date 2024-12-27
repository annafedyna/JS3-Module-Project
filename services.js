async function getData() {
  const loadingMessage = document.getElementById("loading-message");
  loadingMessage.style.display = "block";
  const url = "https://api.tvmaze.com/shows";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Response status: ${response.status}`);
  } finally {
    loadingMessage.style.display = "none";
  }
}

export default getData;