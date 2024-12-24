export async function getAllEpisodePerShowFetch(showId) {
  const response = await fetch(
    `https://api.tvmaze.com/shows/${showId}/episodes`
  );
  const data = await response.json();
  return data;
}
