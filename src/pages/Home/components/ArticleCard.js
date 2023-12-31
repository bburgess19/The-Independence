import * as React from "react";
import { useState, useEffect } from "react";
import "../../../assets/ArticleCard.css";
import { Link } from "react-router-dom";
import { db } from "../../../config/firebase.js";
import { doc, getDoc } from "firebase/firestore";

export default function ArticleCard(props) {
  const [isHovering, setIsHovering] = useState(false);
  const [genre, setGenre] = useState(props.genre);

  useEffect(() => {
    const getGenres = async () => {
      try {
        // Get the genres documents
        const docRef = doc(db, "genre", props.article.genre);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          let genreData = { ...docSnap.data(), id: docSnap.id };

          setGenre(genreData);
        } else {
          console.error("No such document!");
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (genre === undefined) {
      getGenres();
    }
  }, [genre, props.article.genre]);

  if (genre === undefined) {
    return <></>;
  }

  return (
    <>
      <Link
        className="article-card-link"
        to={`/articles/${genre.slug}/${props.article.slug}`}
        article={props.article}
      >
        <div
          className="article-card-wrapper"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div
            className={`${
              isHovering ? `hover-highlight ${genre.class_name}` : ""
            } article-card-image`}
          >
            <img
              src={props.article.thumbnail}
              alt="Dummy"
              className={isHovering ? "hover-highlight" : ""}
            />
          </div>
          <p className={`${isHovering ? genre.class_name : ""} article-banner`}>
            {" "}
            {props.article.type} / {genre.name}
          </p>
          <h3 className={"article-title"}>{props.article.title}</h3>
          <p>{props.article.subtitle}</p>
          <p className={`${isHovering ? genre.class_name : ""} author`}>
            {props.article.author}
          </p>
        </div>
      </Link>
    </>
  );
}
