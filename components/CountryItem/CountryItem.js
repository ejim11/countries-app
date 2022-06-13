import Image from "next/image";

import { useContext } from "react";

import classes from "./CountryItem.module.scss";

import { useRouter } from "next/router";

import modifyNum from "../Helper Fns/ModifyNum";

import RestContext from "../../store/rest-context";

const CountryItem = ({ country }) => {
  const ctx = useContext(RestContext);

  const population = modifyNum(String(country.population));

  const router = useRouter();

  const displayCountryContent = () => {
    router.push(`/${country.name}`);
  };

  return (
    <div
      className={`${classes.country}  ${
        ctx.isDarkMode ? classes["bg-dark"] : classes.bg_white
      }`}
    >
      <div className={classes.country_img} onClick={displayCountryContent}>
        <Image
          src={country.flag}
          alt="country-flag"
          layout="fill"
          objectFit="cover"
          className={classes.image}
        />
      </div>
      <div className={classes.country_info}>
        <p
          className={classes.country_info_name}
          onClick={displayCountryContent}
        >
          {country.name}
        </p>
        <p className={classes.info}>
          <span>Population:</span> {population}
        </p>
        <p className={classes.info}>
          <span>Region:</span> {country.region}
        </p>
        <p className={classes.info}>
          <span>Capital:</span> {country.capital[0]}
        </p>
      </div>
    </div>
  );
};

export default CountryItem;
