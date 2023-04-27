import React, {useState, useEffect} from 'react'
import {fetchFromApi} from '../utils/fetchFromApi';
import {Button} from '@mui/material';

const Singleplace = ({item, handleShow}) => {
  const [trips, setTrips] = useState([]);
  const [trips2, setTrips2] = useState([]);
  const [tripsLoaded,setTripsLoaded]= useState(false)
  const [dbHits, setDbHits] = useState(0)
  const [dbHits2,setDbHits2] = useState(0)
  const [loading, setLoading] = useState(true);
  const [average, setAverage] = useState(0);
  const [average2, setAverage2] = useState(0);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
       
        const response = await fetchFromApi(`trips?departure_id=${item.ID}`)
        await setDbHits(response.dbHits)
        await setTrips(response.trips);
        const response2 = await fetchFromApi(`trips?return_id=${item.ID}`)
        await setDbHits2(response2.dbHits)
        await setTrips2(response2.trips);
        
        setLoading(false);
        setTripsLoaded(true);
     
      } catch (error) {
        console.log(error);
      }
    };

    fetchTrips();
  }, []);
  useEffect(() => {
    if (tripsLoaded) {
      const average =
        trips.reduce((acc, trip) => acc + trip["Covered_distance_m"], 0) /
        trips.length;
      setAverage(average);
      if (trips2.length > 0) {
        const average2 =
          trips2.reduce((acc, trip) => acc + trip["Covered_distance_m"], 0) / trips2.length;
        setAverage2(average2);
        
      }
    }
  }, [trips, trips2])

 

  return (
    <div>
      <h4>
       Nimi: {item.Nimi}, Osoite: {item.Osoite},
       Lähteviä matkoja {dbHits},Lähtevien matkojen keskipituus: {average}
       Päättyviä matkoja {dbHits2},Päättyvien matkojen keskipituus: {average2}
      </h4>
      
      <Button onClick={handleShow} >Reset</Button>
    </div>
  )
}

export default Singleplace
