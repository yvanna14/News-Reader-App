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
import { useState } from "react";
import NewsList from "./Components/NewsList";

function App() {
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleCategoryClick = (category) => {
    setCategory(category);
    setSearchTerm("");
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setCategory("");
    setSearchTerm(event.target.search.value);
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
            <NewsList category={category} searchTerm={searchTerm} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
