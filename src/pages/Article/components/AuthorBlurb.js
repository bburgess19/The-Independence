import Markdown from "react-markdown";
import { Link } from "react-router-dom";
import "../assets/AuthorBlurb.css";

export default function AuthorBlurb({ isLinkable = false, author }) {
  if (!author) {
    console.error("AuthorBlurb component received null author prop");
    return null;
  }

  return (
    <>
      <figure id="profile-wrapper">
        <div id="image-container">
          {isLinkable && (
            <Link to={`/editors/${author.slug}`}>
              <img src={author.profileImg} alt={author.name} />
            </Link>
          )}
          {!isLinkable && <img src={author.profileImg} alt={author.name} />}
        </div>
        <figcaption id="author-details">
          <h2>{author.name}</h2>
          <Markdown>{author.blurb}</Markdown>
        </figcaption>
      </figure>
    </>
  );
}
