const mapPerCountry = cases => {
    return cases.reduce((acc, value) => {
      const countryIndex = acc.findIndex(
        accEntry => accEntry["Country/Region"] === value["Country/Region"]
      );
  
      if (countryIndex < 0) {
        acc.push(value);
      } else {
        const countryObject = acc[countryIndex];
        Object.keys(countryObject).forEach(key => {
          if (Date.parse(key)) {
            countryObject[key] += value[key];
          }
        });
      }
  
      return acc;
    }, []);
  };
  
  const findCountry = (countries, currentCountry) =>
    countries.find(r => r["Country/Region"] === currentCountry) || {};
  
  export const buildChartData = (confirmed, recovered, deaths, populations) => {
    const confirmedPerCountry = mapPerCountry(confirmed);
    const recoveredPerCountry = mapPerCountry(recovered);
    const deathsPerCountry = mapPerCountry(deaths);
  
    const countriesWithChartData = confirmedPerCountry.map(confirmedObject => {
      const currentCountry = confirmedObject["Country/Region"];
  
      const recoveredObject = findCountry(recoveredPerCountry, currentCountry);
  
      const deathsObject = findCountry(deathsPerCountry, currentCountry);
  
      const country = {
        "Country/Region": currentCountry,
        chartSeries: Object.keys(confirmedObject)
          .filter(key => Date.parse(key))
          .map(key => ({
            date: Date.parse(key),
            confirmed: confirmedObject[key],
            recovered: recoveredObject[key] || 0,
            deaths: deathsObject[key] || 0
          }))
      };
  
      country.chartSeries.sort((a, b) => a.date - b.date);
  
      const lastSeriesElement =
        country.chartSeries[country.chartSeries.length - 1];
      country.totalConfirmed = lastSeriesElement.confirmed;
      country.totalRecovered = lastSeriesElement.recovered;
      country.totalDeaths = lastSeriesElement.deaths;
  
      const lastButOneSeriesElement =
        country.chartSeries[country.chartSeries.length - 2];
      country.confirmedEvolution =
        lastSeriesElement.confirmed - lastButOneSeriesElement.confirmed;
      country.recoveredEvolution =
        lastSeriesElement.recovered - lastButOneSeriesElement.recovered;
      country.deathsEvolution =
        lastSeriesElement.deaths - lastButOneSeriesElement.deaths;
      country.increaseRate =
        Math.round(
          (lastSeriesElement.confirmed / lastButOneSeriesElement.confirmed) * 100
        ) / 100;
  
      const countryPopulations = populations.find(
        p =>
          currentCountry.includes(p["Country Name"]) ||
          p["Country Name"].includes(currentCountry)
      );
  
      const lastYearWithData = countryPopulations
        ? Object.keys(countryPopulations)
            .sort((a, b) => b - a)
            .find(
              key =>
                !isNaN(key) &&
                !isNaN(countryPopulations[key]) &&
                countryPopulations[key] !== 0
            )
        : null;
  
      country.totalPopulation = lastYearWithData
        ? countryPopulations[lastYearWithData]
        : 0;
  
      return country;
    });
  
    return countriesWithChartData.sort(
      (a, b) => b.totalConfirmed - a.totalConfirmed
    );
  };