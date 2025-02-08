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
  const [searchInput, setSearchInput] = useState("");
  const [news, setNews] = useState([]);
  const [selectedNews, setSelectedNews] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Replace with your actual API key
  const API_KEY = "d6d33713ee9935e619c48a63a345e8c5";

  const fetchNews = async (selectedCategory = "", searchQuery = "") => {
    setLoading(true);
    setError(null);
    try {
      let url;
      if (searchQuery) {
        // If there's a search query, use the search endpoint
        url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(
          searchQuery
        )}&lang=en&apikey=${API_KEY}`;
      } else if (selectedCategory) {
        // If there's a category selected, use the top-headlines endpoint with category
        url = `https://gnews.io/api/v4/top-headlines?category=${selectedCategory}&lang=en&apikey=${API_KEY}`;
      } else {
        // Default: fetch general top headlines
        url = `https://gnews.io/api/v4/top-headlines?lang=en&apikey=${API_KEY}`;
      }

      console.log("Fetching news from:", url); // For debugging

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.articles && Array.isArray(data.articles)) {
        setNews(data.articles);
      } else {
        setNews([]);
        setError("No articles found");
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      setError("Failed to fetch news. Please try again later.");
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch news when component mounts or when category/search changes
  useEffect(() => {
    fetchNews(category, searchInput);
  }, [category, searchInput, API_KEY]);

  const handleCategoryClick = async (selectedCategory) => {
    console.log("Setting category to:", selectedCategory); // For debugging
    setSearchInput(""); // Clear search when changing category
    setCategory(selectedCategory);
    setSelectedNews(null);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const searchValue = event.target.search.value.trim();
    setCategory(""); // Clear category when searching
    setSearchInput(searchValue);
    setSelectedNews(null);
  };

  const handleReadMore = (newsItem) => {
    setSelectedNews(newsItem);
  };

  const categories = [
    { id: "general", name: "General" },
    { id: "world", name: "World" },
    { id: "nation", name: "Nation" },
    { id: "business", name: "Business" },
    { id: "technology", name: "Technology" },
    { id: "entertainment", name: "Entertainment" },
    { id: "sports", name: "Sports" },
    { id: "science", name: "Science" },
    { id: "health", name: "Health" },
  ];

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
                  {category
                    ? categories.find((c) => c.id === category)?.name ||
                      "Categories"
                    : "Categories"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {categories.map((cat) => (
                    <Dropdown.Item
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.id)}
                      active={category === cat.id}
                    >
                      {cat.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Nav>

            <Form onSubmit={handleSearch} className="d-flex">
              <FormControl
                type="text"
                placeholder="Search news..."
                className="me-2"
                name="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
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
              {categories.map((cat) => (
                <Nav.Link
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  className={category === cat.id ? "active" : ""}
                  style={{ cursor: "pointer" }}
                >
                  {cat.name}
                </Nav.Link>
              ))}
            </Nav>
          </Col>

          <Col xs={12} md={9}>
            {loading ? (
              <div className="text-center">Loading...</div>
            ) : error ? (
              <div className="alert alert-danger">{error}</div>
            ) : selectedNews ? (
              <NewsDetail news={selectedNews} />
            ) : (
              <>
                {category && (
                  <h4 className="mb-4">
                    {categories.find((c) => c.id === category)?.name} News
                  </h4>
                )}
                {news.length > 0 ? (
                  <NewsList news={news} onReadMore={handleReadMore} />
                ) : (
                  <p>No news articles found.</p>
                )}
              </>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
