import { useState, useEffect } from "react";

const useNewsData = (category, searchTerm) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        let url = `https://gnews.io/api/v4/top-headlines?lang=en`;

        if (category) url += `&topic=${category}`;
        if (searchTerm) url += `&q=${searchTerm}`;
        url += `&token=${process.env.REACT_APP_GNEWS_API_KEY}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch news");

        const data = await response.json();
        setNews(data.articles || []);
        localStorage.setItem("news", JSON.stringify(data.articles || []));
      } catch (error) {
        console.error("Error fetching news:", error);
        const storedNews = localStorage.getItem("news");
        if (storedNews) {
          setNews(JSON.parse(storedNews));
        } else {
          setNews([]);
        }
      } finally {
        setLoading(false);
      }
    };

    if (navigator.onLine) {
      fetchNews();
    } else {
      const storedNews = localStorage.getItem("news");
      if (storedNews) {
        setNews(JSON.parse(storedNews));
      } else {
        setNews([]);
      }
      setLoading(false);
    }
  }, [searchTerm, category]);

  return { news, loading };
};

export default useNewsData;
