import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Home from "./pages/Home/components/index.js";
import Layout from "./pages/Layout/Layout";
import Articles from "./pages/Genre/components/index.js";
import "./App.css";
import Article from "./pages/Article/components/index.js";

export default function App() {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<p>About page!</p>} />
            <Route path="/articles/:genreSlug" element={<Articles />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:genreSlug/:slug" element={<Article />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
