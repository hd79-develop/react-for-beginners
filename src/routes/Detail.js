import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  // https://yts.mx/api/v2/movie_details.json?movie_id=58298
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);

  const params = useParams();
  console.log(params);

  const getMovie = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/movie_details.json?movie_id=${params.id}`
      )
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <img src={movie.medium_cover_image} />
          <h2>
            {movie.title}
          </h2>
          <p>{movie.summary}</p>
          <ul>
            <li>
              {movie.genres.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Detail;
