import React, { useState, useEffect } from 'react';

// fetch data from https://api.api-ninjas.com/v1/quotes?category=success api using fetch
function Quote() {
  const [quote, setQuote] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        const abortController = new AbortController();
        setLoading(true);
        const response = await fetch(
          'https://api.api-ninjas.com/v1/quotes?category=success',
          {
            method: 'GET',
            headers: {
              'X-Api-Key': 'diF2CPTnfXZ3z+eeylqvtg==6y2p5KUk1d9qZPsk',
            },
            signal: abortController.signal,
          },
        );

        const data = await response.json();
        setQuote(data[0].quote);
        setLoading(false);
      } catch (error) {
        setHasError(true);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div className="quote">
      <p className="quote">{quote}</p>
      {isLoading ? <p>Loading...</p> : null}
      {hasError ? <p>Something went wrong</p> : null}
    </div>
  );
}

export default Quote;
