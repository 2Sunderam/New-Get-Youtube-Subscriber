import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
//const API = `https://localhost:3002/subscribers/${id}`;

const Subdetail = () => {

const [subdetail, setSubdetail] = React.useState({});
const { id } = useParams();
 // Fetch subscriber details when the component mounts or the ID changes
useEffect(() => {
  axios.get(`http://localhost:3002/subscribers/${id}`
  + '?id=' + id)
.then(res => setSubdetail(res.data))
.catch(err => console.log(err));
}, [id]);
// Destructure the relevant properties from the fetched subscriber details
const {
name,
subscribedChannel,
subscribedDate
} = subdetail;

return (
<div>
<h1>Single Subscriber</h1>
<p>Name: {name}</p>
<p>subscribedChannel: {subscribedChannel}</p>

<p>subscribedDate: {subscribedDate}</p>
</div>
);
};

export default Subdetail;





