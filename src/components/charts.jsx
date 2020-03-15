import React from 'react';

import { useCountries } from '../state/useCountries';

import Country from "./country";

export default function Charts() {
  const {countries, isPending, error} = useCountries();
  return (
    <div>
      <h1>COVID-2019 Data Charts</h1>
      <h2>First 60 countries sorted by confirmed cases, in descending order</h2>

      {error && <pre>ERROR! {error}...</pre>}
      {isPending && <pre>LOADING...</pre>}
      {
        countries && (
          <ul>
            {countries.slice(0, 60).map(country => (
              <Country country={country} key={country["Country/Region"]} />
            ))}
          </ul>
        )
      }
    </div>
  );
}