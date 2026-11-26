import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import GlobalChatWidget from "./components/GlobalChatWidget";
import ScrollToTop from "./components/ScrollToTop";
import Shell from "./components/Shell";
import NetworkLanding from "./pages/NetworkLanding";
import Pricing from "./pages/Pricing";

// hanzo.network is two pages. Every other path was a copy of hanzo.ai, so it
// goes to the one real page there, path and query intact.
const ToHanzo = () => {
  const { pathname, search, hash } = useLocation();
  useEffect(() => {
    window.location.replace(`https://hanzo.ai${pathname}${search}${hash}`);
  }, [pathname, search, hash]);
  return null;
};

const App = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route element={<Shell />}>
        <Route path="/" element={<NetworkLanding />} />
        <Route path="/pricing" element={<Pricing />} />
      </Route>
      <Route path="*" element={<ToHanzo />} />
    </Routes>
    <GlobalChatWidget />
  </BrowserRouter>
);

export default App;
