import { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/ExpandedMenu.css";

export default function ExpandedMenu({ isOpen }) {
  return (
    <>
      <nav id="expanded-nav" className={isOpen ? "active" : "inactive"}>
        <div id="expanded-menu-wrapper" className="page-wrapper">
          <p id="menu-close" onClick={() => !isOpen}>
            Close
          </p>
          <ul id="categories">
            <li>
              <Link className="article-link art" to="/Art">
                <h3 className="category">Art</h3>
              </Link>
            </li>
            <li>
              <Link
                className="article-link diaspora"
                to="/black-body-and-diaspora"
              >
                <h3 className="category">Black Body & Diaspora</h3>
              </Link>
            </li>
            <li>
              <Link
                className="article-link politics"
                to="/politics-and-economics"
              >
                <h3 className="category">Politics & Economics</h3>
              </Link>
            </li>
            <li>
              <Link
                className="article-link science"
                to="/science-and-technology"
              >
                <h3 className="category">Science & Technology</h3>
              </Link>
            </li>
            <li>
              <Link className="article-link sports" to="/sports">
                <h3 className="category">Sports</h3>
              </Link>
            </li>
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
