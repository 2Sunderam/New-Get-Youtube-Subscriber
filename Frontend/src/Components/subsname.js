import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SubscriberNames() {
const [subscriberNames, setSubscriberNames] = useState([]);
// Fetch subscriber names when the component mounts
useEffect(() => {
async function fetchData() {
try {
 // Make an asynchronous HTTP GET request to retrieve subscriber names
const response = await axios.get('https://subscribers-oyrz.onrender.com/subscribers/names');
setSubscriberNames(response.data);
} catch (error) {
console.error(error);
}
}
fetchData();
}, []);

return (
<div>
<h2>Subscriber Names</h2>
<ul>
        {subscriberNames.map(subscriber => (
          <li key={subscriber.name}>
            {subscriber.name} - {subscriber.subscribedChannel}
          </li>
        ))}
      </ul>
</div>
);
}

export default SubscriberNames;



