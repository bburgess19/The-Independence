import "../../../assets/ArticleList.css";
import ArticleCard from "./ArticleCard";
import { useState, useEffect, useRef, useMemo } from "react";
import ArticleService from "../../../services/ArticleService";

export default function ArticleList({ genre, limit, author }) {
  const [visibleArticles, setVisibleArticles] = useState([]);
  const [articles, setArticles] = useState([]);
  const bottomObserverRef = useRef(null);

  const filteredArticles = useMemo(() => {
    let filteredData = articles.filter((article) => {
      return genre == null || article.genre === genre.id;
    });

    return filteredData
      .sort((a, b) => a.upload_date - b.upload_date)
      .slice(0, limit ?? filteredData.length);
  }, [articles, genre, limit]);

  useEffect(() => {
    // Load the articles
    const getArticles = async () => {
      try {
        let articleData = [];
        if (genre) {
          articleData = await ArticleService.getArticlesByGenre(genre.id);
        } else if (author) {
          articleData = await ArticleService.getArticlesByAuthor(author);
        } else {
          articleData = await ArticleService.getAllArticles();
        }

        setArticles(articleData);
      } catch (err) {
        console.error(err);
      }
    };

    getArticles();
    setVisibleArticles([]);
  }, [author, genre]);

  useEffect(() => {
    // Display the next three articles
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const nextThreeArticles = filteredArticles
              .filter((article) => !visibleArticles.includes(article))
              .slice(0, 3);
            setVisibleArticles((prevArticles) => [
              ...prevArticles,
              ...nextThreeArticles,
            ]);
          }
        });
      },
      { threshold: 0.1 },
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
          {visibleArticles.map((article) => (
            <ArticleCard key={article.id} genre={genre} article={article} />
          ))}
        </section>
      </div>
      <div ref={bottomObserverRef} style={{ height: "10px" }} />
    </>
  );
}
