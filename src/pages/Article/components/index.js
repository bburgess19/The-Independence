import Body from "./Body";
import TitleImage from "./TitleImage";
import AuthorBlurb from "./AuthorBlurb";
import { useEffect, useState } from "react";
import { db } from "../../../config/firebase.js";
import { collection, where, query, getDocs } from "firebase/firestore";
import { useParams } from "react-router-dom";
import Markdown from "marked-react";

export default function Article(props) {
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
        <h2 id="subtitle">Here is a subtitle that's decently long</h2>
        <Markdown>{body}</Markdown>
        <AuthorBlurb authorName={article.data.author} />
      </div>
    </>
  );
}
