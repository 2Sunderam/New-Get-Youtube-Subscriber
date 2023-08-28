import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Subscribers() {
  const [subscribers, setSubscribers] = useState([]);
// Fetch subscribers when the component mounts
  useEffect(() => {
    async function fetchData() {
      try {
        // Make an asynchronous HTTP GET request to retrieve subscribers
        const response = await axios.get('https://subscribers-oyrz.onrender.com/subscribers');
        setSubscribers(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {/* Render a list of subscribers */}
      <h2>Subscribers</h2>

      <ul>
        {subscribers.map((name, index) => (
          <li key={index}>
            {name}
          </li>
        ))}
      </ul>



  
    </div>
  );
}
console.log(Subscribers);
export default Subscribers;