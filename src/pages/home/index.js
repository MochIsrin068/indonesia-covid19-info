import React, { Component } from "react";
import { FETCH_GENERAL_DATA } from "../../services/Model";
import Search from "./sections/search";
import { ReactComponent as IconLanguage } from "../../images/languange.svg";

export default class Home extends Component {
  state = {
    isLoading: true,
    data: {},
    language: "ID"
  };

  componentDidMount() {
    FETCH_GENERAL_DATA().then(response => {
      this.setState(
        {
          isLoading: false,
          data: response
        },
        localStorage.setItem("lang", "ID")
      );
    });
  }

  handleLang = () => {
    if (localStorage.getItem("lang") === "ID") {
      localStorage.setItem("lang", "EN");
      this.setState({
        language: "EN"
      });
    } else {
      localStorage.setItem("lang", "ID");
      this.setState({
        language: "ID"
      });
    }
  };

  render() {
    const { isLoading, data, language } = this.state;
    // const languageContext = useContext(LanguageContext);
    console.log(localStorage.getItem("lang"));

    if (isLoading) {
      return (
        <div>
          <center>Loading.....</center>
        </div>
      );
    } else {
      return (
        <>
          <div className="covid__title">
            <div className="covid__title__rows">
              <div className="covid__title__rows__left">
                <h3>
                  {language === "ID"
                    ? "KASUS COVID-19 INDONESIA"
                    : "INDONESIA COVID-19 CASES"}
                </h3>
                <p>
                  {language === "ID"
                    ? "Cek Informasi tentang kasus corona virus atau COVID-19 di Indonesia"
                    : "Check information about corona viruses or COVID-19 in Indonesia"}
                </p>
              </div>
              <div
                className="covid__title__rows__right"
                onClick={() => this.handleLang()}
              >
                <i>
                  <IconLanguage />
                </i>
                <p>{language === "ID" ? "IND" : "ENG"}</p>
              </div>
            </div>
          </div>

          <div className="covid__grid">
            <div className="covid__grid__confirmed">
              <h2>{data.jumlahKasus}</h2>
              <p>{language === "ID" ? "Konfirmasi" : "Confirmed"}</p>
            </div>
            <div className="covid__grid__recovery">
              <h2>{data.perawatan}</h2>
              <p>{language === "ID" ? "Penyembuhan" : "Recovery"}</p>
            </div>
          </div>
          <div className="covid__grid">
            <div className="covid__grid__recovered">
              <h2>{data.sembuh}</h2>
              <p>{language === "ID" ? "Sembuh" : "Recovered"}</p>
            </div>
            <div className="covid__grid__death">
              <h2>{data.meninggal}</h2>
              <p>{language === "ID" ? "Meninggal" : "Death"}</p>
            </div>
          </div>

          {/* Search Section */}
          <Search language={language} />
        </>
      );
    }
  }
}
