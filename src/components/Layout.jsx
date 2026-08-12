import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import TopBar from "./TopBar";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="site-wrapper">

      <div className="art-animation" aria-hidden="true">
        <div className="art-light-blob" />

        <div className="art-orb art-orb-pink" />
        <div className="art-orb art-orb-purple" />

        <div className="art-dot art-dot-1" />
        <div className="art-dot art-dot-2" />
        <div className="art-dot art-dot-3" />
        <div className="art-dot art-dot-4" />
        <div className="art-dot art-dot-5" />
        <div className="art-dot art-dot-6" />

        <div className="paint-circle paint-circle-1" />
        <div className="paint-circle paint-circle-2" />
      </div>

      <div className="site-content">
        <TopBar />

        <Header />

        <main className="flex-1">
          <Outlet />
        </main>

        <Footer />

        <WhatsAppButton />
      </div>

    </div>
  );
}