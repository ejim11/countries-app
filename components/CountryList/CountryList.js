import { Fragment, useContext, useEffect, useState } from "react";

import CountryItem from "../CountryItem/CountryItem";

import { useRouter } from "next/router";

import SearchCountry from "../UI/SearchCountry";


import classes from "./CountryList.module.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import CSSTransition from "react-transition-group/CSSTransition";

import RestContext from "../../store/rest-context";

const regions = ["Africa", "America", "Asia", "Europe", "Oceania"];

const CountryList = (props) => {
  const router = useRouter();
  const ctx = useContext(RestContext);

  const [countryList, setCountryList] = useState(props.newData);
  const [displayRegions, setDisplayRegions] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(router.query);
    const reg = queryParams.get("filter");

    if (!router.asPath.includes("search") && reg === null) {
      setCountryList(props.newData);
    } else if (reg === null && router.asPath.includes("search")) {
      const country = router.asPath.split("=")[1].slice(3);
      fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Something went wrong!");
          }

          return res.json();
        })
        .then((data) => {
          const loadedData = data.map((country) => {
            return {
              name: country.name.common,
              population: country.population,
              region: country.region,
              capital: country.capital
                ? country.capital
                : "This country has no capital",
              flag: country.flags.svg,
            };
          });
          setCountryList(loadedData);
        });
    }
  }, [router, props.newData]);

  useEffect(() => {
    const queryParams = new URLSearchParams(router.query);
    const reg = queryParams.get("filter");

    if (reg !== null && !router.asPath.includes("search")) {
      fetch(`https://restcountries.com/v3.1/region/${reg}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Something went wrong!");
          }

          return res.json();
        })
        .then((data) => {
          const loadedData = data.map((country) => {
            return {
              name: country.name.common,
              population: country.population,
              region: country.region,
              capital: country.capital
                ? country.capital
                : "This country has no capital",
              flag: country.flags.svg,
            };
          });

          setCountryList(loadedData);
        });
    } else if (reg !== null && router.asPath.includes("search")) {
      const country = router.asPath.split("=")[2].slice(3);

      fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Something went wrong!");
          }

          return res.json();
        })
        .then((data) => {
          const loadedData = data.map((country) => {
            return {
              name: country.name.common,
              population: country.population,
              region: country.region,
              capital: country.capital
                ? country.capital
                : "This country has no capital",
              flag: country.flags.svg,
            };
          });
          setCountryList(loadedData);
        });
    }
  }, [router, ctx]);

  const onSearchCountries = (name) => {
    const queryParams = new URLSearchParams(router.query);

    const reg = queryParams.get("filter");
    const country = countryList.find(
      (country) => country.name.toLowerCase() == name.toLowerCase()
    );

    if (reg !== null && country !== undefined) {
      router.push(`/?filter=${reg}/?search = ${name}`);
    } else if (reg !== null && country === undefined) {
      router.push(`/?filter=${reg.split("/")[0]}`);
    } else if (reg === null && country !== undefined) {
      router.push(`/?search = ${name}`);
    } else if (reg === null && country === undefined) {
      router.push(`/`);
    }
  };

  let countries = countryList
    .slice()
    .sort((a, b) => {
      return a.name > b.name ? 1 : -1;
    })
    .map((item, i) => <CountryItem key={i} country={item} />);

  const regionList = regions.map((region) => (
    <div
      className={classes.regions}
      key={region}
      onClick={() => {
        router.push(`/?filter=${region}`);
        setDisplayRegions(false);
      }}
    >
      {region}
    </div>
  ));

  const displayRegionHandler = () => {
    setDisplayRegions((prevState) => !prevState);
  };

  return (
    <Fragment>
      <section className={classes.list}>
        <div className={classes.list_obj}>
          <SearchCountry onSearch={onSearchCountries} />
          <div className={classes["list_obj-filter"]}>
            <div
              className={`${classes.filter_heading} ${
                ctx.isDarkMode ? classes["bg-dark"] : classes.bg_white
              }`}
              onClick={displayRegionHandler}
            >
              Filter by Region
              {displayRegions ? (
                <FontAwesomeIcon
                  icon={faAngleUp}
                  className={classes.filter_icon}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faAngleDown}
                  className={classes.filter_icon}
                />
              )}
            </div>
            <CSSTransition
              in={displayRegions}
              timeout={1000}
              mountOnEnter
              unmountOnExit
              classNames={{
                enterActive: classes["fade-enter-active"],
                exitActive: classes["fade-exit-active"],
              }}
            >
              <div
                className={`${classes.regionList} ${
                  ctx.isDarkMode ? classes["bg-dark"] : classes.bg_white
                }`}
              >
                {regionList}
              </div>
            </CSSTransition>
          </div>
        </div>

        <div className={classes.countries}>{countries}</div>
      </section>
    </Fragment>
  );
};

export default CountryList;
