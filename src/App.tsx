import { useEffect } from "react";
import { BrowserRouter, Navigate, Routes, Route, useLocation } from "react-router-dom";
import { Consent } from "./components/Consent";
import GlobalChatWidget from "./components/GlobalChatWidget";
import { Measure } from "./components/Measure";
import ScrollToTop from "./components/ScrollToTop";
import Shell from "./components/Shell";
import { Away } from "./components/Away";
import { EXPLORER, HANZO, STATUS } from "./lib/links";
import Build from "./pages/Build";
import Early from "./pages/Early";
import Economics from "./pages/Economics";
import NetworkLanding from "./pages/NetworkLanding";
import Pricing from "./pages/Pricing";

// hanzo.network is five pages. Every other path was a copy of hanzo.ai, so it
// goes to the one real page there, path and query intact.
const Leave = ({ to }: { to: string }) => {
  useEffect(() => window.location.replace(to), [to]);
  return null;
};

const ToHanzo = () => {
  const { pathname, search, hash } = useLocation();
  return <Leave to={`${HANZO}${pathname}${search}${hash}`} />;
};

const App = () => (
  <BrowserRouter>
    <Measure>
      <ScrollToTop />
      <Routes>
        <Route element={<Shell />}>
          <Route path="/" element={<NetworkLanding />} />
          <Route path="/build" element={<Build />} />
          <Route path="/economics" element={<Economics />} />
          <Route path="/early" element={<Early />} />
          <Route path="/pricing" element={<Pricing />} />
        </Route>
        {/* hanzo.ai signs people in; Away carries the visitor's anonymous id to its login. Account pages go to hanzo.ai by path, like the rest. */}
        {["/login", "/signup"].map((path) => (
          <Route key={path} path={path} element={<Away />} />
        ))}
        {/* Old copies of this site's own home page; hanzo.ai has no /original (route audit, 26 Nov). */}
        {["/index", "/home2", "/original"].map((path) => (
          <Route key={path} path={path} element={<Navigate to="/" replace />} />
        ))}
        {/* The chain's own pages stay with the chain; its old landing pages come home. */}
        <Route path="/status" element={<Leave to={STATUS} />} />
        <Route path="/explorer" element={<Leave to={EXPLORER} />} />
        {["/blockchain", "/blockchain/*", "/web3"].map((path) => (
          <Route key={path} path={path} element={<Navigate to="/" replace />} />
        ))}
        <Route path="*" element={<ToHanzo />} />
      </Routes>
      <GlobalChatWidget />
      <Consent />
    </Measure>
  </BrowserRouter>
);

export default App;
