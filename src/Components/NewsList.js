import { useEffect, useState } from "react";
import {
  Card,
  Container,
  Col,
  Row,
  Button,
  ToggleButton,
} from "react-bootstrap";

const NewsList = (props) => {
  const { category, searchTerm } = props;

  const [news, setNews] = useState([]);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

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
      } catch (error) {
        console.error("Error fetching news:", error);
        setNews([]);
      }
    };

    fetchNews();
  }, [searchTerm, category]);

  useEffect(() => {
    const hour = new Date().getHours();
    const isNight = hour >= 18 || hour < 6; // Dark mode after 6 PM
    if (isNight) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prevMode) => !prevMode);

  const downloadNews = () => {
    const jsonData = JSON.stringify(news, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "news_offline.json";
    link.click();
  };

  return (
    <Container
      className={darkMode ? "bg-dark text-light" : "bg-light text-dark"}
      fluid
    >
      <div className="d-flex justify-content-between align-items-center my-3">
        <ToggleButton
          variant={darkMode ? "light" : "dark"}
          checked={darkMode}
          onChange={toggleDarkMode}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </ToggleButton>
        <Button variant="primary" onClick={downloadNews}>
          Download News
        </Button>
      </div>

      <Row>
        {news.length > 0 ? (
          news.map((article) => (
            <Col xs={12} md={6} lg={4} key={article.url}>
              <Card
                className={
                  darkMode ? "bg-secondary text-light" : "bg-white text-dark"
                }
              >
                <Card.Img
                  src={article.image || "https://via.placeholder.com/300"}
                  variant="top"
                />
                <Card.Body>
                  <Card.Title>{article.title}</Card.Title>
                  <Card.Text>{article.description}</Card.Text>
                  <Card.Link
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read more
                  </Card.Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No news found.</p>
        )}
      </Row>
    </Container>
  );
};

export default NewsList;
