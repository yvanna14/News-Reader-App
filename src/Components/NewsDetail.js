import React from "react";
import { Card, Button } from "react-bootstrap";

const NewsDetail = ({ news }) => {
  return (
    <Card>
      <Card.Img variant="top" src={news.urlToImage} alt={news.title} />
      <Card.Body>
        <Card.Title>{news.title}</Card.Title>
        <Card.Text>{news.description}</Card.Text>
        <Card.Text>{news.content}</Card.Text>
        <Button variant="primary" href={news.url} target="_blank">
          Read Full Article
        </Button>
      </Card.Body>
    </Card>
  );
};

export default NewsDetail;
