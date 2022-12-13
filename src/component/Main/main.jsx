import React from "react";
import axios from "axios";
import { Button, Card, Container, Row } from "react-bootstrap";

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = { makanan: "Bakso", articles: [] };
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
      });
  }

  render() {
    return (
      <Container>
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

export default Main;
