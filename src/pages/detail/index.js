import React, { Component } from "react";
import { FETCH_BY_CASES } from "../../services/Model";
import { ReactComponent as IconLeft } from "../../images/arrow-left.svg";
import { Link } from "react-router-dom";

export default class Detail extends Component {
  state = {
    data: {},
    isLoading: true
  };

  componentDidMount() {
    FETCH_BY_CASES().then(response => {
      this.setState(
        {
          data: response.data.nodes,
          isLoading: false
        },
        () => console.log(this.state.data)
      );
    });
  }

  render() {
    const { isLoading, data } = this.state;
    const province = this.props.match.params.name;
    const id = this.props.match.params.id;
    const language = this.props.match.params.language;

    return (
      <>
        <div className="detail">
          <Link to="/">
            <IconLeft />
            <span style={{ marginLeft: 10, fontSize: 12 }}>
              {language === "ID" ? "Kembali" : "Back"}
            </span>
          </Link>
          <div className="detail__title">
            <h3>
              {language === "ID"
                ? "DETAIL KASUS COVID-19 DI"
                : "DETAIL COVID-19 CASES IN"}{" "}
              {province}
            </h3>
            <p>
              {language === "ID"
                ? "Detail corona virus atau kasus COVID-19 di"
                : "Detail corona viruses or COVID-19 cases in"}{" "}
              {province}
            </p>
          </div>

          {isLoading ? (
            <div>
              <center>
                <h2>Loading.....</h2>
              </center>
            </div>
          ) : (
            <div className="detail__grid">
              {data
                .filter(v => {
                  return v.klasterid == id;
                })
                .map(v => {
                  return (
                    <div className="detail__grid__item">
                      <p className="detail__grid__item__case">
                        {language == "ID" ? "Kasus" : "Cases"} {v.kasus}
                      </p>
                      <p className="detail__grid__item__age">
                        {v.umur} {language === "ID" ? "Tahun" : "Years Old"}
                      </p>
                      <p className="detail__grid__item__gender">
                        {v.gender === "Perempuan" && language === "ID"
                          ? "Perempuan"
                          : v.gender === "Perempuan" && language === "EN"
                          ? "Female"
                          : v.gender === "Laki-laki" && language === "ID"
                          ? "Laki-laki"
                          : "Male"}
                      </p>
                      <p
                        style={{
                          color:
                            v.status === "Meninggal"
                              ? "red"
                              : v.status === "Dalam Perawatan"
                              ? "#f2c94c"
                              : "green"
                        }}
                      >
                        {v.status === "Meninggal" && language === "ID"
                          ? "Meninggal"
                          : v.status === "Meninggal" && language === "EN"
                          ? "Death"
                          : v.status === "Dalam Perawatan" && language === "ID"
                          ? "Dalam Perawatan"
                          : v.status === "Dalam Perawatan" && language === "EN"
                          ? "Recovery"
                          : v.status === "Sembuh" && language === "ID"
                          ? "Sembuh"
                          : "Recovered"}
                      </p>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </>
    );
  }
}
