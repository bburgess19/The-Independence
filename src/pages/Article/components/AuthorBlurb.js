import Markdown from "react-markdown";
import "../assets/AuthorBlurb.css";

export default function AuthorBlurb({ author }) {
  if (!author) {
    console.error("AuthorBlurb component received null author prop");
    return null;
  }

  return (
    <>
      <figure id="profile-wrapper">
        <div id="image-container">
          <img src={author.profileImg} alt={author.name} />
        </div>
        <figcaption id="author-details">
          <h2>{author.name}</h2>
          <Markdown>{author.blurb}</Markdown>
        </figcaption>
      </figure>
    </>
  );
}
