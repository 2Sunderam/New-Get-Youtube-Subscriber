import React from 'react';
import { BrowserRouter as Router, Routes, Route ,Link } from 'react-router-dom'

import Subscribers from './youtube.js';
import SubscriberNames from './subsname.js';
import Subdetail from './subdetail.js';

function RouterPage() {
  return (

    // Set up the router for handling different routes
    <Router>
<div>
         
        <nav>
          <ul>
          <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            
            <li>
              <Link to="/subdetail/Jeread Krus">Subscriber Detail-Jeread Krus</Link>
            </li>
            <li>
              <Link to="/subdetail/Lucifer">Subscriber Detail-Lucifer</Link>
            </li>
            <li>
              <Link to="/subdetail/John Doe">Subscriber Detail-John Doe</Link>
            </li>
            </ul>
        </nav>
    <Routes>
      {/* Define the route for the root path */}
  <Route path="/" element={<Subscribers />} />
      {/* Define the route for the about page */}
  <Route path="/about" element={<SubscriberNames />} />

  {/* 
    Define the route for displaying subscriber details.
    The ":id" parameter represents the ID of the subscriber.
  */}
  <Route 
  path="/subdetail/:id"
   element=       { <Subdetail/>} 
/>
  

</Routes>
</div>
    </Router>)
    
}

export default RouterPage;




