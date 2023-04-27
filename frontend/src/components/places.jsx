import React, { useState, useEffect } from 'react';

import { fetchFromApi } from '../utils/fetchFromApi';
import Singleplace from './singleplace';
const AllPlaces = () => {
  const [trips, setTrips] = useState([]);
  const [dbHits,setDbHits] = useState(0)
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false)
  const [ditem,setDitem] = useState('')
  const [page, setPage] = useState(1); // current page number
  const [sortBy, setSortBy] = useState(null); // column name to sort by
  const [nimi, setNimi] = useState(''); // filtered trips based on search term
  const [namn, setNamn] = useState(''); // filtered trips based on search term
  const [name, setName] = useState('');// filtered trips based on search term
  const [osoite, setOsoite] = useState(''); // filtered trips based on search term
  const [adress, setAdress] = useState('');// filtered trips based on search term
  const [kaupunki, setKaupunki] = useState('');// filtered trips based on search term
  const [stad, setStad] = useState('');// filtered trips based on search term
  const [operaattor, setOperaattor] = useState('');// filtered trips based on search term
  const [kapasiteet,setKapasiteet] = useState('')
const [distanceOperator, setDistanceOperator] = useState('=');
  


  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const duratationFilter = `Kapasiteet${distanceOperator}${kapasiteet}`
        console.log(duratationFilter)
        const response = await fetchFromApi(`places?page=${page}&Nimi=${nimi}&Namn=${namn}&Name=${name}&Osoite=${osoite}&Adress=${adress}&Kaupunki=${kaupunki}&Stad=${stad}&Operaattor=${operaattor}&numericFilters=${duratationFilter}&sort=${sortBy}`)
        setDbHits(response.dbHits)
        setTrips(response.places);
        setLoading(false);
        console.log(sortBy,page)
      } catch (error) {
        console.log(error);
      }
    };

    fetchTrips();
  }, [page, sortBy,nimi,namn,name,osoite,adress,kaupunki,stad,operaattor,kapasiteet]);

  if (loading) {
    return <div>Loading...</div>;
  }

  function handleShow()  {
    console.log("ASD", show)
    setShow(false)
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
          <th onClick={() => sortColumn('Nimi')}>
           Nimi {sortBy === 'Nimi'  && <span>&uarr;</span>}
                  {sortBy === '-Nimi' && <span>&darr;</span>}
          </th>
          <th onClick={() => sortColumn('Namn')}>
            Namn {sortBy === 'Namn'  && <span>&uarr;</span>}
                  {sortBy === '-Namn' && <span>&darr;</span>}
          </th>
            <th
                  onClick={() => sortColumn('Name')}>
                 Name {sortBy === 'Name'  && <span>&uarr;</span>}
                  {sortBy === '-Name' && <span>&darr;</span>}
                </th>
                <th onClick={() => sortColumn('Osoite')}>
                 Osoite {sortBy === 'Osoite'  && <span>&uarr;</span>}
                  {sortBy === '-Osoite'  && <span>&darr;</span>}
            </th>
            <th onClick={() => sortColumn('Adress')}>
                 Adress {sortBy === 'Adress'  && <span>&uarr;</span>}
                  {sortBy === '-Adress'  && <span>&darr;</span>}
            </th>
            <th onClick={() => sortColumn('Kaupunki')}>
                 Kaupunki {sortBy === 'Kaupunki'  && <span>&uarr;</span>}
                  {sortBy === '-Kaupunki'  && <span>&darr;</span>}
            </th>
            <th onClick={() => sortColumn('Stad')}>
                Stad {sortBy === 'Stad'  && <span>&uarr;</span>}
                  {sortBy === '-Stad'  && <span>&darr;</span>}
            </th>
            <th onClick={() => sortColumn('Operaattor')}>
                Operaattor {sortBy === 'Operaattor'  && <span>&uarr;</span>}
                  {sortBy === '-Operaattor'  && <span>&darr;</span>}
            </th>
            <th onClick={() => sortColumn('Kapasiteet')}>
                Kapasiteet {sortBy === 'Kapasiteet'  && <span>&uarr;</span>}
                  {sortBy === '-Kapasiteet'  && <span>&darr;</span>}
                </th>
              </tr>
            </thead>
            <tbody>
              {trips.map((trip) => (
                <tr key={trip._id} onClick={() => {
                  setDitem(trip);
                  setShow(true)

                  
                }
                }>
                  <td>{trip['Nimi']}</td>
                  <td>{trip['Namn']}</td>
                  <td>{trip['Name']}</td>
                  <td>{trip['Osoite']}</td>
                  <td>{trip['Adress']}</td>
                  <td>{trip['Kaupunki']}</td>
                  <td>{trip['Stad']}</td>
                  <td>{trip['Operaattor']}</td>
                  <td>{trip['Kapasiteet']}</td>
                </tr>
              ))}
        </tbody>
        <tfoot>
          <th> <input type="text" placeholder="Nimi" value={nimi} onChange={(e)=>setNimi(e.target.value)} /> </th>
          <th> <input type="text" placeholder="Namn" value={namn} onChange={(e)=>setNamn(e.target.value)} /> </th>
          <th> <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /> </th>
          <th> <input type="text" placeholder="Osoite" value={osoite} onChange={(e) => setOsoite(e.target.value)} /> </th>
          <th> <input type="text" placeholder="Adress" value={adress} onChange={(e) => setAdress(e.target.value)} /> </th>
          <th> <input type="text" placeholder="Kaupunki" value={kaupunki} onChange={(e) => setKaupunki(e.target.value)} /> </th>
          <th> <input type="text" placeholder="Stad" value={stad} onChange={(e) => setStad(e.target.value)} /> </th>
          <th> <input type="text" placeholder="Operaattor" value={operaattor} onChange={(e)=>setOperaattor(e.target.value)} /> </th>
          
      <th> <select value={distanceOperator} onChange={(e) => setDistanceOperator(e.target.value)}>
        <option value="=">=</option>
        <option value=">">{'>'}</option>
        <option value=">=">{'>='}</option>
        <option value="<">{'<'}</option>
        <option value="<=">{'<='}</option>
      </select>
      <input type="text" placeholder="Distance as meters" value={kapasiteet} onChange={(e) => setKapasiteet(e.target.value)} /></th>
        </tfoot>
      </table>
      <div>
        {page > 1 ? < button onClick={() => {setPage(page - 1)}}>Prev Page</button> : <></>}
        {page*10<dbHits ? <button onClick={() => {setPage(page + 1)}}>Next Page</button>:<></>}
      </div>
      {show ?  <Singleplace item={ditem} handleShow={handleShow}  />: <></>}
      </div>
  );
};



export default AllPlaces
