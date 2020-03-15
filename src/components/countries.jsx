import React from "react";
import { buildChartData } from "../data/dataManipulation";
import ChartForCountry from "./ChartForCountry";

class Countries extends React.Component {
  state = {
    countries: []
  };

  componentDidMount() {
    const baseAPIUrl = "https://quixotic-elf-256313.appspot.com/api";

    const confirmedPromise = fetch(`${baseAPIUrl}/confirmed`);
    const recoveredPromise = fetch(`${baseAPIUrl}/recovered`);
    const deathsPromise = fetch(`${baseAPIUrl}/deaths`);
    const populationsPromise = fetch(`${baseAPIUrl}/populations`);

    Promise.all([
      confirmedPromise,
      recoveredPromise,
      deathsPromise,
      populationsPromise
    ]).then(async ([confirmed, recovered, deaths, populations]) => {
      const confirmedJSON = await confirmed.json();
      const recoveredJSON = await recovered.json();
      const deathsJSON = await deaths.json();
      const populationsJSON = await populations.json();

      const countries = buildChartData(
        confirmedJSON,
        recoveredJSON,
        deathsJSON,
        populationsJSON
      );
      this.setState({
        countries
      });
    });
  }

  render() {
    const { countries } = this.state;

    return (
      <ul>
        {countries.slice(0, 60).map(country => (
          <li key={country["Country/Region"]} className="country">
            <h3 className="countryName">{country["Country/Region"]}</h3>
            <p>
              <span className="confirmed">
                Total Confirmed: {country.totalConfirmed} (
                {this.getPercetage(
                  country.totalConfirmed,
                  country.totalPopulation
                )}
                ) -{" "}
              </span>
              <span className="recovered">
                Total Recovered: {country.totalRecovered} (
                {this.getPercetage(
                  country.totalRecovered,
                  country.totalConfirmed
                )}
                ) -{" "}
              </span>
              <span className="deaths">
                Total Deaths: {country.totalDeaths} (
                {this.getPercetage(country.totalDeaths, country.totalConfirmed)}
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
        ))}
      </ul>
    );
  }

  getPercetage(divider, dividee) {
    return dividee !== 0
      ? `${Math.round((divider / dividee) * 100000) / 1000}%`
      : "N/A";
  }
}

export default Countries;
