import "../assets/TitleImage.css";
import Markdown from "react-markdown";

export default function TitleImage({ article }) {
  return (
    <>
      <div id="title-image-wrapper">
        <div>
          <img id="title-image" src={article.title_image} alt={article.alt} />
          <div id="title-image-main">
            <div id="title-text-wrapper">
              <h2 id="title-text">{article.title}</h2>
              <small id="subtitle">{article.subtitle}</small>
            </div>
          </div>
        </div>
        <Markdown className="attribution">{article.image_src}</Markdown>
      </div>
    </>
  );
}
