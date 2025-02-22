import { useState } from 'react';
import Link from 'next/link';  // Import Link for navigation

export default function Search({ ferryRoutes }) {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');

  const filteredRoutes = ferryRoutes.filter(route => 
    route.source.toLowerCase().includes(source.toLowerCase()) &&
    route.destination.toLowerCase().includes(destination.toLowerCase()) &&
    route.date.includes(date)
  );

  return (
    <div>
      <h1>Search Ferry Routes</h1>
      <div>
        <label>Source: </label>
        <input
          type="text"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          placeholder="Enter Source"
        />
      </div>
      <div>
        <label>Destination: </label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Enter Destination"
        />
      </div>
      <div>
        <label>Date: </label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div>
        <h2>Results:</h2>
        {filteredRoutes.map((route) => (
          <div key={route.id}>
            <h3>{route.source} → {route.destination}</h3>
            <p>{route.date}</p>
            {/* Add a link to the booking page */}
            <Link href={`/booking?source=${route.source}&destination=${route.destination}&date=${route.date}`}>
              <a>Book Now</a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

// Fetch data from Contentful API on server side
export async function getServerSideProps() {
  const response = await fetch('https://cdn.contentful.com/spaces/YOUR_SPACE_ID/environments/master/entries?access_token=YOUR_ACCESS_TOKEN');
  const data = await response.json();
  
  // Format ferry routes from Contentful data
  const ferryRoutes = data.items.map(item => ({
    id: item.sys.id,
    source: item.fields.source,
    destination: item.fields.destination,
    date: item.fields.date,
  }));

  return {
    props: {
      ferryRoutes,
    },
  };
}
