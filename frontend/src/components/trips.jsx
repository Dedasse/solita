import React, { useState, useEffect } from 'react';

import { fetchFromApi } from '../utils/fetchFromApi';
const AllTrips = () => {
  const [trips, setTrips] = useState([]);
  const [dbHits,setDbHits] = useState(0)
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1); // current page number
const [debname, setDebName] = useState(''); // number of items to show per page
const [sortBy, setSortBy] = useState(null); // column name to sort by
const [returni, setReturni] = useState(''); // sorting order (asc/desc)
const [distance, setDistance] = useState(''); // search term to filter trips
const [durationOperator, setDurationOperator] = useState('=');
const [distanceOperator, setDistanceOperator] = useState('=');
  
const [duration, setDuration] = useState(''); // filtered trips based on search term

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const duratationFilter = `Covered_distance_m${distanceOperator}${distance},Duration_sec${durationOperator}${duration}`
        console.log(duratationFilter)
        const response = await fetchFromApi(`trips?page=${page}&departure=${debname}&returni=${returni}&numericFilters=${duratationFilter}&sort=${sortBy}`)
        setDbHits(response.dbHits)
        setTrips(response.trips);
        setLoading(false);
        console.log(sortBy,page)
      } catch (error) {
        console.log(error);
      }
    };

    fetchTrips();
  }, [page, sortBy,debname,returni,duration,distance]);

  if (loading) {
    return <div>Loading...</div>;
  }


const sortColumn = (column) => {
  if (column === sortBy) {    
    setSortBy( "-"+column)
  } else {
    setSortBy(column);
  }
};

  return (

    <div>
    database hits with your choises{dbHits}
    <table>
      <thead>
        <tr>
          <th onClick={() => sortColumn('Departure station name')}>
            Lähtö {sortBy === 'Departure station name'  && <span>&uarr;</span>}
                  {sortBy === '-Departure station name' && <span>&darr;</span>}
          </th>
          <th onClick={() => sortColumn('Return station name')}>
            Paluu {sortBy === 'Return station name'  && <span>&uarr;</span>}
                  {sortBy === '-Return station name' && <span>&darr;</span>}
          </th>
            <th
                  onClick={() => sortColumn('Duration_sec')}>
                  Kesto {sortBy === 'Duration_sec'  && <span>&uarr;</span>}
                  {sortBy === '-Duration_sec' && <span>&darr;</span>}
                </th>
                <th onClick={() => sortColumn('Covered_distance_m')}>
                  Matka {sortBy === 'Covered_distance_m'  && <span>&uarr;</span>}
                  {sortBy === '-Covered_distance_m'  && <span>&darr;</span>}
                </th>
              </tr>
            </thead>
            <tbody>
              {trips.map((trip) => (
                <tr key={trip._id}>
                  <td>{trip['Departure station name']}</td>
                  <td>{trip['Return station name']}</td>
                  <td>{(trip['Duration_sec'] / 60).toFixed(2)} mins</td>
                  <td>{(trip['Covered_distance_m'] / 1000).toFixed(2)} km</td>
                </tr>
              ))}
        </tbody>
        <tfoot>
          <th> <input type="text" placeholder="Lähtö name" value={debname} onChange={(e)=>setDebName(e.target.value)} /> </th>
          <th> <input type="text" placeholder="Paluu name" value={returni} onChange={(e)=>setReturni(e.target.value)} /> </th>
          <th> <select value={durationOperator} onChange={(e) => setDurationOperator(e.target.value)}>
        <option value="=">=</option>
        <option value=">">{'>'}</option>
        <option value=">=">{'>='}</option>
        <option value="<">{'<'}</option>
        <option value="<=">{'<='}</option>
      </select>
      <input type="text" placeholder="Duration as sec" value={duration} onChange={(e) => setDuration(e.target.value)} /></th>
      <th> <select value={distanceOperator} onChange={(e) => setDistanceOperator(e.target.value)}>
        <option value="=">=</option>
        <option value=">">{'>'}</option>
        <option value=">=">{'>='}</option>
        <option value="<">{'<'}</option>
        <option value="<=">{'<='}</option>
      </select>
      <input type="text" placeholder="Distance as meters" value={distance} onChange={(e) => setDistance(e.target.value)} /></th>
        </tfoot>
      </table>
      <div>
        {page > 1 ? < button onClick={() => {setPage(page - 1)}}>Prev Page</button> : <></>}
        <button onClick={()=>{setPage(page+1)}}>Next Page</button>
      </div>
      </div>
  );
};

export default AllTrips;