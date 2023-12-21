import "../assets/TitleImage.css";

export default function TitleImage({ article }) {
  return (
    <>
      <div id="title-image-wrapper">
        <div id="title-text">
          <h2 id="image-title">{article.title}</h2>
          <h4 id="subtitle">{article.subtitle}</h4>
        </div>
        <img src={article.title_image} alt={article.alt} />
        <div className="gradient-overlay"></div>
      </div>
    </>
  );
}
