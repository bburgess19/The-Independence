import TitleImage from "./TitleImage";
import AuthorBlurb from "./AuthorBlurb";
import { useEffect, useState } from "react";
import { db } from "../../../config/firebase.js";
import { collection, where, query, getDocs } from "firebase/firestore";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import ImageCarousel from "./ImageCarousel";
import "../assets/Article.css";

const DivRenderer = (props) => {
  if (props.className === "image-carousel") {
    return <ImageCarousel {...props} />;
  } else {
    return <div {...props} />;
  }
};

const components = {
  div: DivRenderer,
};

export default function Article() {
  const [article, setArticle] = useState({ data: null, id: null });
  const [body, setBody] = useState(null);
  const params = useParams();

  useEffect(() => {
    const getArticle = async () => {
      try {
        const queryConstraints = [];
        queryConstraints.push(where("slug", "==", params.slug));
        const q = query(collection(db, "articles"), ...queryConstraints);
        const snapshot = await getDocs(q);
        setArticle({ data: snapshot.docs[0].data(), id: snapshot.docs[0].id });
      } catch (e) {
        console.log(e);
        return <h1>Page failed to load</h1>;
      }
    };

    getArticle();
  }, [params]);

  // Fetch the body when the article is loaded
  useEffect(() => {
    if (article.data !== null) {
      // Send a http request to public/essays/id.md

      const fetchBody = async () => {
        try {
          const response = await fetch("/essays/" + article.id + ".md");
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const text = await response.text();
          setBody(text);
        } catch (e) {
          console.error("Could not fetch the body of the article");
        }
      };

      fetchBody();
    }
  }, [article]);

  if (article.data === null) return <h1>Loading...</h1>;
  return (
    <>
      <TitleImage article={article.data} />
      <div className="page-wrapper">
        <div id="article-body">
          <Markdown components={components} rehypePlugins={[rehypeRaw]}>
            {body}
          </Markdown>
        </div>
        <AuthorBlurb authorName={article.data.author} />
      </div>
    </>
  );
}
