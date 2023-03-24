import React, { useState, useEffect } from 'react';

// fetch data from https://api.api-ninjas.com/v1/quotes?category=success api using fetch
function Quote() {
  const [quote, setQuote] = useState('');

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://api.api-ninjas.com/v1/quotes?category=success',
          {
            method: 'GET',
            headers: {
              'X-Api-Key': 'diF2CPTnfXZ3z+eeylqvtg==6y2p5KUk1d9qZPsk',
            },
          },
        );

        const data = await response.json();
        setQuote(data[0].quote);
      } catch (error) {
      }
    };

    fetchData();

  }, []);

  return (
    <div className="quote">
      <h1>Quote of the day</h1>
      <p>{quote}</p>
    </div>
  );
}

export default Quote;
