import React, { Component } from "react";
import { FETCH_BY_PROVINCE } from "../../../services/Model";
import { Link } from "react-router-dom";

export default class Search extends Component {
  state = {
    isLoading: true,
    data: [],
    key: ""
  };

  componentDidMount() {
    FETCH_BY_PROVINCE().then(response => {
      this.setState({
        isLoading: false,
        data: response.data
      });
    });
  }

  render() {
    const { isLoading, data, key } = this.state;
    const { language } = this.props;
    const filterData = data.filter(v => {
      return (
        v.provinsi.toLowerCase().indexOf(this.state.key.toLowerCase()) !== -1
      );
    });
    return (
      <>
        <div className="search">
          <div className="search__desc">
            <h4>
              {language === "ID"
                ? "Cari informasi kasus berdasarkan provinsi"
                : "Search cases information by province"}
            </h4>
            <p>
              {language === "ID"
                ? "*tulis provinsi kamu pada textinput dibawah"
                : "*type your province in textfield below"}
            </p>
            <p>
              {language === "ID"
                ? "*klik card untuk melihat detail data"
                : "*click card to show detail"}
            </p>
          </div>
          <div className="search__bar">
            <input
              className="search__bar__input"
              placeholder="Search your province"
              onChange={e => {
                this.setState({
                  key: e.target.value
                });
              }}
            />
          </div>

          {/* LIST PROVICE */}

          {isLoading ? (
            <center>
              <h2>Loading....</h2>
            </center>
          ) : (
            <div className="search__content">
              {filterData.map((province, index) => {
                return (
                  <Link
                    key={index}
                    to={`/detail/${province.kodeProvi}/${province.provinsi}/${language}`}
                  >
                    <div className="search__content__card" key={index}>
                      <h3>{province.provinsi}</h3>
                      <div className="search__content__card__specifict">
                        <div style={{ backgroundColor: "#f2c94c" }}>
                          <h4>{province.kasusPosi}</h4>
                          <p>
                            {language === "ID" ? "Konfirmasi" : "Confirmed"}
                          </p>
                        </div>
                        <div style={{ backgroundColor: "#5aca5a" }}>
                          <h4>{province.kasusSemb}</h4>
                          <p>{language === "ID" ? "Sembuh" : "Recovered"}</p>
                        </div>
                        <div style={{ backgroundColor: "#ff6464" }}>
                          <h4>{province.kasusMeni}</h4>
                          <p>{language === "ID" ? "Meninggal" : "Death"}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </>
    );
  }
}
