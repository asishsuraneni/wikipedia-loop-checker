import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WikipediaLoop = () => {
  const [url, setUrl] = useState('');
  const [requests, setRequests] = useState(0);
  const [visitedPages, setVisitedPages] = useState([]);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = async () => {
    setError(null);
    setRequests(0);
    setVisitedPages([]);
    try {
      const response = await axios.post('/analyze', { url });
      setRequests(response.data.requests);
      setVisitedPages(response.data.visitedPages);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <input type="text" value={url} onChange={handleInputChange} />
      <button onClick={handleSubmit}>Analyze</button>
      {error && <p>Error: {error}</p>}
      {requests > 0 && (
        <div>
          <p>Number of requests: {requests}</p>
          <ul>
            {visitedPages.map((page) => (
              <li key={page}>{page}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WikipediaLoop;
