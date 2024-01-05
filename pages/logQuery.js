// pages/logQuery.js
import React from 'react';
import LogQueryInterface from '../components/LogQueryInterface';

const LogQueryPage = () => {
  const handleLogQuery = async (query) => {
    try {
      const response = await fetch('/api/logQuery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Log query successful:', data);
      } else {
        console.error('Log query failed:', data.error);
      }
    } catch (error) {
      console.error('Error during log query:', error);
    }
  };

  return (
    <div>
      <h1>Log Query</h1>
      <LogQueryInterface onLogQuery={handleLogQuery} />
      {/* Add additional components or content as needed */}
    </div>
  );
};

export default LogQueryPage;
