import React, { useState, useEffect } from "react";
import { fetchEntries } from "../lib/contentful";

export default function BookingPage() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [ferryRoutes, setFerryRoutes] = useState([]);  // Initialize as an empty array

  useEffect(() => {
    console.log("Harman1Fetching routes...");  // This will let us know if useEffect is firing

    async function getRoutes() {
      try {
        const routes = await fetchEntries("ferryRoute");  // Assuming "ferryRoute" is your Contentful content type
        console.log("Fetched ferry routes:", routes);  // Log the fetched routes to check the response structure
        setFerryRoutes(routes);
      } catch (error) {
        console.error("Error fetching ferry routes:", error);  // Log any errors that occur during fetching
      }
    }

    getRoutes();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Booking from ${source} to ${destination} on ${date}`);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-2xl font-semibold mb-4">Ferry Booking</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="source" className="block text-sm font-medium text-gray-700">Source</label>
          <select
            id="source"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            required
          >
            {ferryRoutes.length > 0 ? (
              ferryRoutes.map((route) => (
                <option key={route.sys.id} value={route.fields.source}>
                  {route.fields.source}
                </option>
              ))
            ) : (
              <option disabled>Loading ferry routes...</option>  // Show loading message until data is fetched
            )}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="destination" className="block text-sm font-medium text-gray-700">Destination</label>
          <select
            id="destination"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          >
            {ferryRoutes.length > 0 ? (
              ferryRoutes.map((route) => (
                <option key={route.sys.id} value={route.fields.destination}>
                  {route.fields.destination}
                </option>
              ))
            ) : (
              <option disabled>Loading ferry routes...</option>  // Show loading message until data is fetched
            )}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            id="date"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md">Book Now</button>
      </form>
    </div>
  );
}
