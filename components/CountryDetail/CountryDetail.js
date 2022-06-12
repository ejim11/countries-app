import { Fragment, useContext } from "react";

import { useRouter } from "next/router";

import Image from "next/image";

import modifyNum from "../Helper Fns/ModifyNum";

import classes from "./CountryDetail.module.scss";

import RestContext from "../../store/rest-context";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowLeft } from "@fortawesome/free-solid-svg-icons";

const CountryDetail = ({ countryData }) => {
  const ctx = useContext(RestContext);
  const router = useRouter();
  const population = modifyNum(String(countryData.population));

  const borders =
    typeof countryData.border === "object"
      ? countryData.border.map((border) => (
          <div
            key={border}
            className={`${classes.brds} ${
              ctx.isDarkMode ? classes["bg-dark"] : classes.bg_white
            }`}
            onClick={() => {
              router.push(`/${border}`);
            }}
          >
            {border}
          </div>
        ))
      : countryData.border;

  const nativeName = countryData.nativeName
    .map((name, i) => {
      return <div key={i}>{name.nativeName}</div>;
    })
    .slice(0, 1);

  const language = countryData.language.map((language, i) => (
    <div key={i} className={classes.languages}>
      {language.language}
    </div>
  ));

  const currency = countryData.currency.map((currency, i) => (
    <div key={i}>{currency.currency}</div>
  ));

  const capital =
    typeof countryData.capital === "object"
      ? countryData.capital.map((capital, i) => (
          <div key={i} className={classes.cap}>
            {capital}
          </div>
        ))
      : countryData.capital;

  const returnToHomePageHandler = () => {
    router.push("/");
  };

  return (
    <Fragment>
      {ctx.isLoading && <div>Loading...</div>}
      <div className={classes.btn_div}>
        <button
          className={`${classes.btn} ${
            ctx.isDarkMode ? classes["bg-dark"] : classes.bg_white_back
          }`}
          onClick={returnToHomePageHandler}
        >
          <FontAwesomeIcon
            icon={faLongArrowLeft}
            className={classes.btn_icon}
          />
          Back
        </button>
      </div>
      <div className={classes.country}>
        <div className={classes.country_flag}>
          <Image src={countryData.flag} alt="country flag" layout="fill" />
        </div>
        <div className={classes.country_info}>
          <p className={classes["country_info-name"]}>{countryData.name}</p>
          <div className={classes["country_info-details"]}>
            <div className={`${classes["country_info-details-1"]}`}>
              <div className={classes["country_info-details-1-item"]}>
                <span>Native Name:</span>
                <div>{nativeName}</div>
              </div>
              <div className={classes["country_info-details-1-item"]}>
                <span>Population:</span>
                <div> {population}</div>
              </div>
              <div className={classes["country_info-details-1-item"]}>
                <span>Region:</span> {countryData.region}
              </div>
              <div className={classes["country_info-details-1-item"]}>
                <span>Sub Region:</span> {countryData.subregion}
              </div>
              <div className={classes["country_info-details-1-item"]}>
                <span>Capital:</span>
                <div>{capital}</div>
              </div>
            </div>
            <div className={classes["country_info-details-1"]}>
              <div className={classes["country_info-details-1-item"]}>
                <span>Top Level Domain:</span> {countryData.Tld}
              </div>
              <div className={classes["country_info-details-1-item"]}>
                <span>Currencies:</span> {currency}
              </div>
              <div className={classes["country_info-details-1-item"]}>
                <span>Language(s):</span>
                <div>{language}</div>
              </div>
            </div>
          </div>
          <div className={classes["country_info-details-border"]}>
            <p>Border Countries:</p>
            <div>{borders}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default CountryDetail;
