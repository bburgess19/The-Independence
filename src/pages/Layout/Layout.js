import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../../App.css";

export default function Layout() {
  // Check if the path contains 'article'
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
