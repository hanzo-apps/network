import { useEffect } from "react";
import { useLocation } from "react-router";

/** On every navigation: jump to the #anchor if there is one, else to the top. */
const Scroll = () => {
  const { key, hash } = useLocation();

  useEffect(() => {
    const target = hash && document.getElementById(decodeURIComponent(hash.slice(1)));
    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [key, hash]);

  return null;
};

export default Scroll;
