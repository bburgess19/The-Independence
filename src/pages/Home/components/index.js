import Gallery from "./Gallery.js";
import ArticleList from "./ArticleList.js";
import "../../../assets/Home.css";

function Home() {
  return (
    <>
      <Gallery />
      <div id="sub-gallery-banner">
        <div>
          <h3 id="sub-gallery-title">A Publication About Black Experiences</h3>
        </div>
      </div>
      <div className="page-wrapper">
        <h2>Recent Stories</h2>
        <ArticleList />
      </div>
    </>
  );
}

export default Home;
