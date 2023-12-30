import "./assets/Articles.css";
import ArticleList from "../Home/components/ArticleList";
import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../../config/firebase.js";
import { getDocs, collection, where } from "firebase/firestore";

export default function Articles() {
  const params = useParams();
  const location = useLocation();
  const initialGenre = location.state?.genre;
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getGenre = async () => {
      fetchGenreData();
    };

    if (initialGenre === undefined || initialGenre.slug !== params.genreSlug) {
      getGenre();
    } else {
      setGenre(initialGenre);
    }
  }, [initialGenre, params.genreSlug]);

  const fetchGenreData = async () => {
    console.log("Fetching genre data");
    try {
      const queryConstraints = [];
      queryConstraints.push(where("slug", "==", params.genreSlug));

      // Get the genres documents
      const data = await getDocs(collection(db, "genre"));
      let genreData = data.docs.map((doc) => ({
        ...doc.data(),
      }));

      setGenre(genreData);
    } catch (err) {
      console.error(err);
    }
  };

  if (genre === null) {
    return <></>;
  }

  return (
    <>
      <h2 id="article-header" className={genre.class_name}>
        {genre.name}
      </h2>
      <p id="genre-description">{genre.description}</p>

      <ArticleList key={genre.slug} genre={genre} />
    </>
  );
}
