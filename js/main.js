$(document).ready(() => {
  $("#searchForm").on("submit", e => {
    let searchmyMovie = $("#searchmyMovie").val();

    queryMovies(searchmyMovie);

    e.preventDefault();
  });
});

function queryMovies(searchmyMovie) {
  axios
    .get("https://www.omdbapi.com/?apikey=21d31369&s=" + searchmyMovie)
    .then(response => {
      console.log(response);
      let movies = response.data.Search;
      let showOutput = "";
      $.each(movies, (index, movie) => {
        showOutput += `
        <div class="col-md-3">
           <div class="well text-center">
             <img src="${movie.Poster}">
             <h5>${movie.Title}</h5>
             <a onClick="selectedMovie('${
               movie.imdbID
             }')" class="btn btn-primary" href="#">Movie Info</a>
           </div>
        </div>
      `;
      });
      $("#movies").html(showOutput);
    })
    .catch(() => {
      console.log(err);
    });
}
function selectedMovie(id) {
  sessionStorage.setItem("imdbID", id);
  window.location = "movie.html";
  return false;
}
function getMovie() {
  let id = sessionStorage.getItem("imdbID");

  axios
    .get("https://www.omdbapi.com/?apikey=21d31369&i=" + id)
    .then(response => {
      let movie = response.data;
      console.log(movie);
      let showOutput = `
        <div class="row">
           <div class="col-md-4">
           <div class="pix-props"><img src="${
             movie.Poster
           }" class="thumbnail"></div>

              <div class="btn-set"><a href="http://imdb.com/title/${
                movie.imdbID
              }" target="_blank" class="btn btn-primary">View IMDB</a>
                <a href="index.html" class="btn btn-primary">Go Back To Search</a>
                </div>
           </div>
           <div class="col-md-8">
             <h3>${movie.Title}</h3>
              <ul class="list-group">
                 <li class="list-group-item"><strong>Genre: ${
                   movie.Genre
                 }</strong></li>
                 <li class="list-group-item"><strong>Rated: ${
                   movie.Rated
                 }</strong></li>
                <li class="list-group-item"><strong>Released: ${
                  movie.Released
                }</strong></li>
                <li class="list-group-item"><strong>Director: ${
                  movie.Director
                }</strong></li>
                <li class="list-group-item"><strong>Actors: ${
                  movie.Actors
                }</strong></li>
              </ul>
              <div class="row">
              <div class="plot">
              <hr>
                <h3>Plot</h3>
                ${movie.Plot}

              </div>
            </div>

           </div>

      </div>

        `;

      $("#movie").html(showOutput);
    })
    .catch(() => {
      console.log(err);
    });
}
