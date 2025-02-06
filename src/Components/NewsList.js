import { useEffect, useState } from "react";
import useNewsData from "../hooks/useNewsData"; // Use as a hook
import {
  Card,
  Container,
  Col,
  Row,
  Button,
  ToggleButton,
} from "react-bootstrap";
import CustomPagination from "./CustomPagination";

const NewsList = (props) => {
  const { category, searchTerm, onReadMore } = props;

  // Use custom hook to fetch news
  const { news, loading } = useNewsData(category, searchTerm);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const handleClick = (pageNumber) => setCurrentPage(pageNumber); // ✅ Corrected function

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

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

  const downloadArticle = (article) => {
    const storedNews = JSON.parse(localStorage.getItem("news")) || [];
    storedNews.push(article);
    localStorage.setItem("news", JSON.stringify(storedNews));
    alert("Article saved for offline use.");
  };

  // ✅ Corrected pagination logic
  const totalArticles = news.length;
  const totalPages = Math.ceil(totalArticles / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentArticles = news.slice(startIndex, endIndex); // ✅ Corrected

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
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Row>
            {news.length > 0 ? (
              currentArticles.map((article) => (
                <Col xs={12} md={6} lg={4} key={article.url}>
                  <Card
                    className={
                      darkMode
                        ? "bg-secondary text-light"
                        : "bg-white text-dark"
                    }
                  >
                    <Card.Img
                      src={article.image || "https://via.placeholder.com/300"}
                      variant="top"
                    />
                    <Card.Body>
                      <Card.Title>{article.title}</Card.Title>
                      <Card.Text>{article.description}</Card.Text>
                      <Button
                        variant="link"
                        onClick={() => onReadMore(article)}
                      >
                        Read more
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => downloadArticle(article)}
                      >
                        Download
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p>No news found.</p>
            )}
          </Row>
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            handleClick={handleClick}
          />
        </>
      )}
    </Container>
  );
};

export default NewsList;
