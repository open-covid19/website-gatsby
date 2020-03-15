import { useAsyncFunction } from './useAsyncFunction';
import { buildChartData } from '../data/dataManipulation';

const fetchCountries = () => {
  const baseAPIUrl = "https://quixotic-elf-256313.appspot.com/api";

  const confirmedPromise = fetch(`${baseAPIUrl}/confirmed`);
  const recoveredPromise = fetch(`${baseAPIUrl}/recovered`);
  const deathsPromise = fetch(`${baseAPIUrl}/deaths`);
  const populationsPromise = fetch(`${baseAPIUrl}/populations`);

  return Promise.all([
      confirmedPromise,
      recoveredPromise,
      deathsPromise,
      populationsPromise
    ]).then(async ([confirmed, recovered, deaths, populations]) => {
      const confirmedJSON = await confirmed.json();
      const recoveredJSON = await recovered.json();
      const deathsJSON = await deaths.json();
      const populationsJSON = await populations.json();

      return {
        confirmed: confirmedJSON,
        recovered: recoveredJSON,
        deaths: deathsJSON,
        populations: populationsJSON
      };
  });
}

const initialState = [];

export const useCountries = () => {
  const asyncFunction = fetchCountries().then(({confirmed, recovered, deaths, populations}) => {
    return buildChartData(
      confirmed,
      recovered,
      deaths,
      populations
    );
  });

  const [value, error, isPending] = useAsyncFunction(() => asyncFunction, initialState);
  return {
    countries: value,
    error,
    isPending
  };
}