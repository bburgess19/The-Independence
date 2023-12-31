import "../../../assets/ArticleList.css";
import ArticleCard from "./ArticleCard";
import { db } from "../../../config/firebase";
import { useState, useEffect, useRef, useMemo } from "react";
import { getDocs, collection } from "firebase/firestore";

function ArticleList(props) {
  const [visibleArticles, setvisibleArticles] = useState([]);
  const [articles, setArticles] = useState([]);
  const bottomObserverRef = useRef(null);

  const filteredArticles = useMemo(() => {
    let filteredData = articles.filter((article) => {
      return props.genre == null || article.genre === props.genre.id;
    });

    return filteredData
      .sort((a, b) => b.upload_date - a.upload_date)
      .slice(0, 6);
  }, [articles, props.genre]);

  useEffect(() => {
    const getArticles = async () => {
      try {
        // Get the article documents
        const data = await getDocs(collection(db, "articles"));
        let articleData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setArticles(articleData);
      } catch (err) {
        console.error(err);
      }
    };

    getArticles();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const nextThreeArticles = filteredArticles
              .filter((article) => !visibleArticles.includes(article))
              .slice(0, 3);
            setvisibleArticles((prevArticles) => [
              ...prevArticles,
              ...nextThreeArticles,
            ]);
          }
        });
      },
      { threshold: 0.5 },
    );

    const bottomRef = bottomObserverRef.current;
    if (bottomRef) {
      // Only add the observer if there are more articles to show
      if (filteredArticles.length !== visibleArticles.length) {
        observer.observe(bottomRef);
      }
    }

    return () => {
      if (bottomRef) {
        observer.unobserve(bottomRef);
      }
    };
  }, [filteredArticles, visibleArticles]);

  return (
    <>
      <div id="article-gallery">
        <section id="articles-wrapper">
          {visibleArticles.map((article, _) => (
            <ArticleCard
              key={article.id}
              genre={props.genre}
              article={article}
            />
          ))}
          <div ref={bottomObserverRef} style={{ height: "10px" }} />
        </section>
      </div>
    </>
  );
}

export default ArticleList;
