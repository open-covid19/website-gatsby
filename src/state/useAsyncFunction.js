import React from 'react';

export function useAsyncFunction(asyncFunction, defaultValue) {
  const [state, setState] = React.useState({
    value: defaultValue,
    error: null,
    isPending: true
  });

  React.useEffect(() => {
    asyncFunction()
      .then(value => setState({ value, error: null, isPending: false }))
      .catch(error =>
        setState({ value: defaultValue, error: error.toString(), isPending: false })
      );
  }, [asyncFunction, defaultValue]);

  const { value, error, isPending } = state;
  return [value, error, isPending];
}
