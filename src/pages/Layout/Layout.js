import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import ThinNavbar from "./ThinNavbar";
import Footer from "./Footer";
import "../../App.css";

export default function Layout() {
  const location = useLocation();

  // Check if the path contains 'article'
  const isArticlePage = location.pathname.includes("article");

  return (
    <>
      {isArticlePage ? <ThinNavbar /> : <Navbar />}
      <Outlet />
      <Footer />
    </>
  );
}
