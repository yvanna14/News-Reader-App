import { useState, useEffect } from "react";
import {
  Card,
  Container,
  Col,
  Row,
  Button,
  ToggleButton,
} from "react-bootstrap";

const NewsList = ({ news, onReadMore }) => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // Initialize dark mode based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    const isNight = hour >= 18 || hour < 6; // Dark mode after 6 PM
    if (isNight) {
      setDarkMode(true);
    }
  }, []);

  // Apply dark mode to body and save preference
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prevMode) => !prevMode);

  const downloadArticle = (article) => {
    const storedNews = JSON.parse(localStorage.getItem("news")) || [];
    storedNews.push(article);
    localStorage.setItem("news", JSON.stringify(storedNews));
    alert("Article saved for offline use.");
  };

  if (!news) {
    return <p>Loading, please wait...</p>;
  }

  return (
    <Container
      className={darkMode ? "bg-dark text-light" : "bg-light text-dark"}
      fluid
    >
      <div className="d-flex justify-content-between align-items-center my-3">
        <ToggleButton
          id="dark-mode-toggle"
          type="checkbox"
          variant={darkMode ? "light" : "dark"}
          checked={darkMode}
          onChange={toggleDarkMode}
          value="1"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </ToggleButton>
      </div>

      <Row>
        {news.length > 0 ? (
          news.map((article, index) => (
            <Col xs={12} md={6} lg={4} key={article.url || index}>
              <Card
                className={`mb-4 h-100 ${
                  darkMode ? "bg-secondary text-light" : "bg-white text-dark"
                }`}
              >
                <Card.Img
                  src={article.image || "https://via.placeholder.com/300"}
                  variant="top"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/300";
                  }}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{article.title}</Card.Title>
                  <Card.Text>{article.description}</Card.Text>
                  <div className="mt-auto">
                    <Button
                      variant={darkMode ? "light" : "primary"}
                      onClick={() => onReadMore(article)}
                      className="me-2"
                    >
                      Read More
                    </Button>
                    <Button
                      variant={darkMode ? "outline-light" : "outline-primary"}
                      onClick={() => downloadArticle(article)}
                    >
                      Download
                    </Button>
                  </div>
                </Card.Body>
                {article.source && (
                  <Card.Footer
                    className={darkMode ? "text-light" : "text-muted"}
                  >
                    Source: {article.source.name}
                    <br />
                    Published:{" "}
                    {new Date(article.publishedAt).toLocaleDateString()}
                  </Card.Footer>
                )}
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p className="text-center">No articles available.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default NewsList;
