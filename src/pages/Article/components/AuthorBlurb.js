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
        <img src={author.profile_img} alt={authorName} />
        <figcaption id="author-details">
          <h3>{authorName}</h3>
          <p>{author.blurb}</p>
        </figcaption>
      </figure>
    </>
  );
}
