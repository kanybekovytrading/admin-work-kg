import { useLocation, useNavigate } from "react-router-dom";

const CACHE_KEY = "nav_cache_v1";

interface NavCache {
   [section: string]: string;
}

export const useCachedNavigation = () => {
   const location = useLocation();
   const navigate = useNavigate();

   const navigateWithCache = (to: string) => {
      const currentSection = location.pathname.split("/")[1] || "root";
      const targetSection = to.split("/")[1] || "root";

      if (currentSection === targetSection && location.pathname !== to) {
         navigate(to);
         return;
      }

      try {
         const cache: NavCache = JSON.parse(
            sessionStorage.getItem(CACHE_KEY) || "{}"
         );
         cache[currentSection] = location.pathname + location.search;
         sessionStorage.setItem(CACHE_KEY, JSON.stringify(cache));

         navigate(cache[targetSection] || to);
      } catch {
         navigate(to);
      }
   };

   const clearCache = () => sessionStorage.removeItem(CACHE_KEY);

   return { navigateWithCache, clearCache };
};

export const clearNavigationCache = (key: string) => {
   try {
      const cache: NavCache = JSON.parse(
         sessionStorage.getItem(CACHE_KEY) || "{}"
      );
      delete cache[key];

      sessionStorage.setItem(CACHE_KEY, JSON.stringify(cache));
   } catch (e) {
      console.error("Failed to clear navigation cache for key:", key, e);
   }
};
