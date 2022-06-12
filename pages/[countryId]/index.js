import CountryDetail from "../../components/CountryDetail/CountryDetail";

import Head from "next/head";

const CountryDetails = (props) => {
  return (
    <section>
      <Head>
        <title>{props.country.name}</title>
        <meta
          name="description"
          content="Get important information about the chosen country."
        />
      </Head>
      <CountryDetail countryData={props.country} />
    </section>
  );
};

export default CountryDetails;

export function getStaticPaths() {
  // get countries name and put all in an array

  const countryNames = [];

  fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => data.map((item) => countryNames.push(item.name.common)));

  //   console.log(countryNames);

  return {
    fallback: "blocking",
    paths: countryNames.map((name) => {
      params: {
        countryId: name;
      }
    }),
  };
}

export async function getStaticProps(context) {
  // get country data
  const countryName = context.params.countryId;

  const res = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);

  if (!res.ok) {
    throw new Error("Something went wrong!");
  }

  const data = await res.json();

  const loadingNativeName = [];

  for (const key in data[0].name.nativeName) {
    loadingNativeName.push({
      nativeName: data[0].name.nativeName[key].official,
    });
  }

  const loadingCurrencies = [];

  for (const key in data[0].currencies) {
    loadingCurrencies.push({
      currency: data[0].currencies[key].name,
    });
  }

  const loadingLanguages = [];
  for (const key in data[0].languages) {
    loadingLanguages.push({
      language: data[0].languages[key],
    });
  }

  const loadingBorders = [];
  if (data[0].borders) {
    for (const n of data[0].borders) {
      const res = await fetch(
        `https://restcountries.com/v3.1/alpha/${n.toLowerCase()}`
      );

      const data = await res.json();
      loadingBorders.push(data[0].name.common);
    }
  }

  const border = data[0].borders
    ? loadingBorders
    : "This country has no borders";

  return {
    props: {
      country: {
        name: data[0].name.common,
        population: data[0].population,
        region: data[0].region,
        subregion: data[0].subregion,
        Tld: data[0].tld[0],
        border: border,
        nativeName: loadingNativeName,
        currency: loadingCurrencies,
        language: loadingLanguages,
        flag: data[0].flags.svg,
        capital: data[0].capital
          ? data[0].capital
          : "This country has no capital",
        show: data[0],
      },
      //   country: data[0],
    },
  };
}
