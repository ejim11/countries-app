// import Head from "next/head";
// import Image from "next/image";
// import classes from "../styles/Home.module.scss";

import { useEffect, useContext, Fragment } from "react";

import RestContext from "../store/rest-context";

import CountryList from "../components/CountryList/CountryList";

import Head from "next/head";

export default function Home(props) {
  const ctx = useContext(RestContext);

  useEffect(() => {
    const storedLightMode = localStorage.getItem("darkMode");

    if (storedLightMode === "true") {
      ctx.setIsDarkMode(true);
    } else if (storedLightMode === "false") {
      ctx.setIsDarkMode(false);
    }
  }, [ctx]);

  return (
    <Fragment>
      <Head>
        <title>Where in the world</title>
        <meta
          name="description"
          content="Browse a huge list of countries in the world."
        />
      </Head>
      <CountryList newData={props.newData} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://restcountries.com/v3.1/all");

  if (!res.ok) {
    throw new Error("Something went wrong!");
  }

  const data = await res.json();

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

  return {
    props: {
      newData: loadedData,
    },
    revalidate: 10,
  };
}

// countryData={props.countryList}
