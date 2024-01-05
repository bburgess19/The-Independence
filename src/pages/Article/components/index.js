import TitleImage from "./TitleImage";
import AuthorBlurb from "./AuthorBlurb";
import { useEffect, useState } from "react";
import { db } from "../../../config/firebase.js";
import {
  collection,
  where,
  query,
  doc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import ImageCarousel from "./ImageCarousel";
import "../assets/Article.css";
import Brackets from "../../Genre/components/Brackets";

const DivRenderer = (props) => {
  if (props.className === "image-carousel") {
    return <ImageCarousel {...props} />;
  } else {
    return <div {...props} />;
  }
};

const BlockquoteRenderer = ({ children, genre }) => {
  return (
    <blockquote className={`article-blockquote ${genre.class_name ?? ""}`}>
      <Brackets genre={genre}>
        <p>{children}</p>
      </Brackets>
    </blockquote>
  );
};

export default function Article() {
  const [article, setArticle] = useState({ data: null, id: null });
  const [body, setBody] = useState(null);
  const [components, setComponents] = useState(null);
  const params = useParams();

  const fetchGenre = async (article) => {
    try {
      const docRef = doc(db, "genre", article.genre);
      const snapshot = (await getDoc(docRef)).data();
      return snapshot;
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const getArticle = async () => {
      try {
        const queryConstraints = [];
        queryConstraints.push(where("slug", "==", params.slug));
        const q = query(collection(db, "articles"), ...queryConstraints);
        const snapshot = await getDocs(q);
        setArticle({ data: snapshot.docs[0].data(), id: snapshot.docs[0].id });

        // Load the genre
        const genre = await fetchGenre(snapshot.docs[0].data());

        // Load the components for custom markdown rendering
        setComponents({
          div: ({ ...props }) => <DivRenderer {...props} />,
          blockquote: ({ ...props }) => (
            <BlockquoteRenderer {...props} genre={genre} />
          ),
        });
      } catch (e) {
        console.error(e);
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

  if (article.data === null) return <></>;
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
