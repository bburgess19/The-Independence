import { Link } from "react-router-dom";
import "../../assets/ExpandedMenu.css";
import { db } from "../../config/firebase.js";
import { getDocs, collection } from "firebase/firestore";
import { useState, useEffect } from "react";

export default function ExpandedMenu({ isOpen }) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const getGenres = async () => {
      try {
        // Get the genres documents
        const data = await getDocs(collection(db, "genre"));
        let genreData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setGenres(genreData);
      } catch (err) {
        console.error(err);
      }
    };

    getGenres();
  }, []);

  if (genres.length === 0) {
    return <></>;
  }

  return (
    <>
      <nav id="expanded-nav" className={isOpen ? "active" : "inactive"}>
        <div id="expanded-menu-wrapper" className="page-wrapper">
          <p id="menu-close" onClick={() => !isOpen}>
            Close
          </p>
          <ul id="categories">
            {genres.map((genre) => {
              return (
                <li key={genre.slug}>
                  <Link
                    className={`article-link ${genre.class_name}`}
                    to={`/articles/${genre.slug}`}
                    state={{ genre: genre }}
                  >
                    <h3 className="category">{genre.name}</h3>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div id="expand-menu-mobile">
            <ul>
              <li>
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li>
                <span className="nav-link-separator">/</span>
              </li>
              <li>
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li>
                <span className="nav-link-separator">/</span>
              </li>
              <li>
                <Link className="nav-link" to="/articles">
                  Articles
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
