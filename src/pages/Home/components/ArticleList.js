import "../../../assets/ArticleList.css";
import ArticleCard from "./ArticleCard";
import { db } from "../../../config/firebase";
import { useState, useEffect, useRef } from "react";
import { getDocs, collection } from "firebase/firestore";

const fetchNewArticles = (callCount, articles) => {
  const startIndex = callCount * 3 + 1;
  const endIndex = callCount * 3 + 4;

  if (startIndex >= 0 && endIndex <= articles.length) {
    return articles.slice(startIndex, endIndex);
  } else if (startIndex < articles.length) {
    return articles.slice(startIndex);
  } else {
    console.error("Failed to load new articles");
  }
};

function ArticleList(props) {
  const [visibleArticles, setvisibleArticles] = useState([]);
  const [articles, setArticles] = useState([]);
  const bottomObserverRef = useRef(null);

  useEffect(() => {
    const getArticles = async () => {
      try {
        // Get the article documents
        const data = await getDocs(collection(db, "articles"));
        let filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        if (props.genre != null) {
          filteredData = filteredData.filter(
            (article) => article.genre === props.genre,
          );
        } else {
          console.log("Displaying articles for home page!");
        }

        setArticles(
          filteredData
            .sort((a, b) => new Date(a.upload_date) - new Date(b.upload_date))
            .slice(0, 6),
        );
      } catch (err) {
        console.error(err);
      }
    };

    getArticles();
  }, [props.genre]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Fetch new articles for the view
            // const newArticles = fetchNewArticles(1, filteredData);
            const nextThreeArticles = articles
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
      if (articles.length !== visibleArticles.length) {
        observer.observe(bottomRef);
      }
    }

    return () => {
      if (bottomRef) {
        observer.unobserve(bottomRef);
      }
    };
  }, [articles, visibleArticles]);

  return (
    <>
      <div id="article-gallery">
        <h2>Recent Stories</h2>
        <section id="articles-wrapper">
          {visibleArticles.map((article, _) => (
            <ArticleCard key={article.id} article={article} />
          ))}
          <div ref={bottomObserverRef} style={{ height: "10px" }} />
        </section>
      </div>
    </>
  );
}

export default ArticleList;
