import { useEffect, useState } from "react";
import { db } from "../../../config/firebase.js";
import { doc, getDoc } from "firebase/firestore";
import "../assets/AuthorBlurb.css";

export default function AuthorBlurb({ authorName }) {
  const [author, setAuthor] = useState(null);
  useEffect(() => {
    const getAuthorDetails = async () => {
      const docRef = doc(db, "users", authorName);
      setAuthor((await getDoc(docRef)).data());
    };

    getAuthorDetails();
  }, [authorName]);

  if (author === null) return;

  return (
    <>
      <figure id="profile-wrapper">
        <div id="image-container">
          <img src={author.profile_img} alt={authorName} />
        </div>
        <figcaption id="author-details">
          <h2>{authorName}</h2>
          <p>{author.blurb}</p>
        </figcaption>
      </figure>
    </>
  );
}
