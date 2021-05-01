import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Container, Card } from "react-bootstrap";

function App() {
  const [searchItem, set_searchItem] = useState("");
  const [news, set_news] = useState({
    Global: {
      NewConfirmed: 100282,
      TotalConfirmed: 1162857,
      NewDeaths: 5658,
      TotalDeaths: 63263,
      NewRecovered: 15405,
      TotalRecovered: 230845,
    },
    Countries: [
      {
        Country: "ALA Aland Islands",
        CountryCode: "AX",
        Slug: "ala-aland-islands",
        NewConfirmed: 0,
        TotalConfirmed: 0,
        NewDeaths: 0,
        TotalDeaths: 0,
        NewRecovered: 0,
        TotalRecovered: 0,
        Date: "2020-04-05T06:37:00Z",
      },
    ],
  });

  const fetchData = async () => {
    await axios({
      method: "GET",
      url: "https://api.covid19api.com/summary",
    })
      .then((res) => {
        set_news(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <div
          className="page-header bg-primary mb-3 d-flex align-items-center justify-content-between"
          style={{ height: "70px" }}
        >
          <h2 className="ml-3 d-inline" style={{}}>
            NEWS
          </h2>
          <h2 className="mr-3">
            {new Date(news.Countries[0].Date).toLocaleString()}
          </h2>
        </div>
        <Container fluid>
          <Row>
            <Col lg={4} />
            <Col lg={4}>
              <form className="app-search d-none d-lg-block">
                <div className="position-relative">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search..."
                    onChange={(event) => {
                      set_searchItem(event.target.value);
                    }}
                  />
                  <span className="bx bx-search-alt" />
                </div>
              </form>
            </Col>
          </Row>

          <Row>
            <Col lg={3} className="my-3">
              <Card
                className="border rounded"
                style={{
                  background: "#0aefff",
                }}
              >
                <Card.Header
                  style={{
                    background: "#011627",
                    color: "#fff",
                  }}
                >
                  <h4 className="text-center my-auto">Global</h4>
                </Card.Header>
                <Card.Body>
                  <Card.Text>
                    <Row>
                      <Col lg={7}>
                        <p>
                          <strong className="d-block w-100">
                            Шинэ тохиолдол
                          </strong>
                        </p>
                        <p>
                          <strong>Нийт</strong>
                        </p>
                        <p>
                          <strong>Нас барсан</strong>
                        </p>
                        <p>
                          <strong>Нийт</strong>
                        </p>
                        <p>
                          <strong>Эдгэрсэн</strong>
                        </p>
                        <p>
                          <strong>Нийт</strong>
                        </p>
                      </Col>
                      <Col lg={5}>
                        <p className="text-right">{news.Global.NewConfirmed}</p>
                        <p className="text-right">
                          {news.Global.TotalConfirmed}
                        </p>
                        <p className="text-right">{news.Global.NewDeaths}</p>
                        <p className="text-right">{news.Global.TotalDeaths}</p>
                        <p className="text-right">{news.Global.NewRecovered}</p>
                        <p className="text-right">
                          {news.Global.TotalRecovered}
                        </p>
                      </Col>
                    </Row>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            {news.Countries.filter((item) => {
              if (searchItem === "") {
                return item;
              } else if (
                item.Country.toLocaleLowerCase().includes(
                  searchItem.toLocaleLowerCase()
                )
              ) {
                return item;
              }
            }).map((item) => {
              return (
                <Col lg={3} className="my-3">
                  <Card
                    style={{
                      background: "#80ed99",
                    }}
                  >
                    {/* <CardImg
                      src="https://prd-webrepository.firabarcelona.com/wp-content/uploads/sites/34/2020/07/15105542/coronavirus-mundo.jpg"
                      alt=""
                      className="img-fluid mx-auto"
                      style={{
                        width: "100%",
                        height: "30vh",
                      }}
                    /> */}
                    <Card.Header
                      style={{
                        background: "#335c67",
                        color: "#fff",
                      }}
                    >
                      <h4 className="text-center my-auto">{item.Country}</h4>
                    </Card.Header>
                    <Card.Body>
                      <Card.Text>
                        <Row>
                          <Col lg={7}>
                            <p>
                              <strong className="d-block w-100">
                                Шинэ тохиолдол
                              </strong>
                            </p>
                            <p>
                              {" "}
                              <strong>Нийт</strong>
                            </p>
                            <p>
                              {" "}
                              <strong>Нас барсан</strong>
                            </p>
                            <p>
                              {" "}
                              <strong>Нийт</strong>
                            </p>
                            <p>
                              {" "}
                              <strong>Эдгэрсэн</strong>
                            </p>
                            <p>
                              {" "}
                              <strong>Нийт</strong>
                            </p>
                          </Col>
                          <Col lg={5}>
                            <p className="text-right">{item.NewConfirmed}</p>
                            <p className="text-right">{item.TotalConfirmed}</p>
                            <p className="text-right">{item.NewDeaths}</p>
                            <p className="text-right">{item.TotalDeaths}</p>
                            <p className="text-right">{item.NewRecovered}</p>
                            <p className="text-right">{item.TotalRecovered}</p>
                          </Col>
                          {/* <Col lg={12}>
                              <strong className="text-center d-block h3">
                                {new Date(item.Date).toLocaleDateString()}
                              </strong>
                            </Col> */}
                        </Row>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default App;
