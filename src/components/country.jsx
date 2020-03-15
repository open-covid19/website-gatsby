import React from "react";

import { getPercentage } from "../data/dataManipulation";
import ChartForCountry from "./ChartForCountry";

export const CountryInfo = ({country}) => {
    return (
          <li key={country["Country/Region"]} className="country">
            <h3 className="countryName">{country["Country/Region"]}</h3>
            <p>
              <span className="confirmed">
                Total Confirmed: {country.totalConfirmed} (
                {getPercentage(
                  country.totalConfirmed,
                  country.totalPopulation
                )}
                ) -{" "}
              </span>
              <span className="recovered">
                Total Recovered: {country.totalRecovered} (
                {getPercentage(
                  country.totalRecovered,
                  country.totalConfirmed
                )}
                ) -{" "}
              </span>
              <span className="deaths">
                Total Deaths: {country.totalDeaths} (
                {getPercentage(country.totalDeaths, country.totalConfirmed)}
                )
              </span>
            </p>
            <p>
              <span className="evolution">Evolution since yesterday: </span>
              <span className="confirmed">
                {`${country.confirmedEvolution} (increase rate: ${
                  country.increaseRate
                }) - `}
              </span>
              <span className="recovered">{country.recoveredEvolution} - </span>
              <span className="deaths">{country.deathsEvolution}</span>
            </p>
            <ChartForCountry country={country} />
          </li>
        )
}

export default CountryInfo;
