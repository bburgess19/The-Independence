import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import "../assets/Articles.css";
import ArticleList from "../../Home/components/ArticleList";
import Brackets from "./Brackets";
import { db } from "../../../config/firebase.js";
import { getDocs, collection, where } from "firebase/firestore";

export default function Articles() {
  const params = useParams();
  const location = useLocation();
  const initialGenre = location.state?.genre;
  const [genre, setGenre] = useState(null);

  const fetchGenreData = useCallback(async () => {
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
  }, [setGenre, params.genreSlug]);

  useEffect(() => {
    const getGenre = async () => {
      fetchGenreData();
    };

    if (initialGenre === undefined || initialGenre.slug !== params.genreSlug) {
      getGenre();
    } else {
      setGenre(initialGenre);
    }
  }, [initialGenre, params.genreSlug, fetchGenreData]);

  if (genre === null) {
    return <></>;
  }

  return (
    <div className={`${genre.class_name}-light-bg`}>
      <div className="top-header-wrapper">
        <h2
          id="article-list-header"
          className={`${genre.class_name} ${genre.class_name}-med-bg`}
        >
          {genre.name}
        </h2>
      </div>
      <div
        id="genre-description-wrapper"
        className={`${genre.class_name}-med-bg`}
      >
        <div className="page-wrapper">
          <Brackets genre={genre}>
            <p id="genre-description">{genre.description}</p>
          </Brackets>
        </div>
      </div>

      <ArticleList key={genre.slug} genre={genre} />
    </div>
  );
}
