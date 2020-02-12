const api_key = 'ENTER-YOUR-API';

// Find the search form
const search = document.getElementById("search");

// List for the form submit
search.addEventListener("submit",(event) => {
  event.preventDefault(); // Don't perform the real submit
  const artist = document.getElementById("artist").value; // Get the input value (artist name)
  fetchArtist(artist);

});
const fetchArtist = (artist) => {
  // Call the last.fm API
  fetch(`http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${artist}&api_key=${api_key}&format=json&limit=5`)
    .then(response => response.json())
    .then((data) => {
      // Get the container div
      const container = document.getElementById("albums-container");
      // Clean the container div
      container.innerHTML = "";

      data.topalbums.album.forEach((album) => {
       // For each album in API data:

       const newAlbum = createHtml(album); // Get the HTML markup

       container.insertAdjacentHTML("beforeend", newAlbum); // Insert markup in the container
      });

    });
}

const createHtml = (album) => {
  // album has the API data for one album

  // Container row markup
  const html = `<div class="row m-t-1">
      <div class="col-xs-12">
        <img src="${album.image[2]['#text']}" class='pull-left m-r-1'>
        <h2>${album.name}</h2>
        <p>${album.artist.name}</p>
      </div>
    </div>`;

  return html; // Return the markup

};