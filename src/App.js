import {
  Row,
  Col,
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Dropdown,
  Container,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import NewsList from "./Components/NewsList";
import NewsDetail from "./Components/NewsDetail";

function App() {
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [news, setNews] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      let url = `https://newsapi.org/v2/top-headlines?apiKey=YOUR_API_KEY`;
      if (category) {
        url += `&category=${category}`;
      }
      if (searchTerm) {
        url += `&q=${searchTerm}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setNews(data.articles);
    };
    fetchNews();
  }, [category, searchTerm]);

  const handleCategoryClick = (category) => {
    setCategory(category);
    setSearchTerm("");
    setSelectedNews(null);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setCategory("");
    setSearchTerm(event.target.search.value);
    setSelectedNews(null);
  };

  const handleReadMore = (newsItem) => {
    setSelectedNews(newsItem);
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="/" className="fw-bold fs-4">
            News App
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              <Dropdown>
                <Dropdown.Toggle variant="outline-primary">
                  Categories
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleCategoryClick("WORLD")}>
                    WORLD
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleCategoryClick("BUSINESS")}
                  >
                    BUSINESS
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleCategoryClick("HOME")}>
                    HOME
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleCategoryClick("BEAUTY")}>
                    BEAUTY
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleCategoryClick("TECHNOLOGY")}
                  >
                    TECHNOLOGY
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleCategoryClick("SPORT")}>
                    SPORTS
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Nav>

            <Form onSubmit={handleSearch} className="d-flex">
              <FormControl
                type="text"
                placeholder="search"
                className="me-2"
                name="search"
              />

              <Button variant="outline-primary" type="submit">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Row>
          <Col xs={12} md={3}>
            <h5>Categories</h5>
            <Nav className="flex-column">
              <Nav.Link onClick={() => handleCategoryClick("WORLD")}>
                WORLD
              </Nav.Link>
              <Nav.Link onClick={() => handleCategoryClick("BUSINESS")}>
                BUSINESS
              </Nav.Link>
              <Nav.Link onClick={() => handleCategoryClick("HOME")}>
                HOME
              </Nav.Link>
              <Nav.Link onClick={() => handleCategoryClick("TECHNOLOGY")}>
                TECHNOLOGY
              </Nav.Link>
              <Nav.Link onClick={() => handleCategoryClick("BEAUTY")}>
                BEAUTY
              </Nav.Link>
              <Nav.Link onClick={() => handleCategoryClick("SPORT")}>
                SPORT
              </Nav.Link>
            </Nav>
          </Col>

          <Col xs={12} md={9}>
            {selectedNews ? (
              <NewsDetail news={selectedNews} />
            ) : (
              <NewsList news={news} onReadMore={handleReadMore} />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
