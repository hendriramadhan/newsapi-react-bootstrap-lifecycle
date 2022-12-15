import React from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";

export default class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
      loading: false,

      value: "",
    };
  }

  formatDate(date) {
    var time = new Date(date);
    var year = time.getFullYear();
    var day = time.getDate();
    var hour = time.getHours();
    var minute = time.getMinutes();
    var month = time.getMonth() + 1;
    var composedTime =
      day +
      "/" +
      month +
      "/" +
      year +
      " | " +
      hour +
      ":" +
      (minute < 10 ? "0" + minute : minute);
    return composedTime;
  }

  componentDidMount() {
    this.search = (val) => {
      this.setState({ loading: true });
      axios
        .get(
          `https://newsapi.org/v2/top-headlines?country=id&q=${val}&apiKey=280c43d0756d4b1a9690a165ae0ebe88`
        )
        .then((res) => {
          const articles = res.data.articles;
          console.log(articles);
          this.setState({ articles, loading: false });
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }

  componentWillUnmount() {
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?" +
          "country=id&" +
          "apiKey=280c43d0756d4b1a9690a165ae0ebe88"
      )
      .then((res) => {
        const articles = res.data.articles;
        console.log(articles);
        this.setState({ articles });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onChangeHandler = (e) => {
    this.search(e.target.value);
    this.setState({ value: e.target.value });
  };

  render() {
    return (
      <Container>
        <Row className="d-flex justify-content-center">
          <Col md={6}>
            <Form className="d-flex mt-3">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                name="name"
                onChange={(e) => this.onChangeHandler(e)}
              />
            </Form>
          </Col>
        </Row>
        <Row className="d-flex mt-3 gap-3 justify-content-center">
          {this.state.articles.map((news, i) => {
            return (
              <Card className="mb-1 shadow" style={{ width: "23rem" }} key={i}>
                <Card.Img
                  className="mt-2"
                  variant="top"
                  src={news.urlToImage}
                />
                <Card.Body>
                  <Card.Title>{news.title}</Card.Title>
                  <Card.Text className="text-muted">
                    {this.formatDate(news.publishedAt)} - {news.author}
                  </Card.Text>
                  <Card.Text>{news.description}</Card.Text>
                  <Button href={news.url} variant="primary">
                    Read More
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </Row>
      </Container>
    );
  }
}
