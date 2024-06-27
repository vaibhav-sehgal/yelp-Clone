import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RestaurantsContext } from '../context/RestaurantContext';
import RestaurantFinder from '../api/RestaurantFinder';
import StarRating from '../components/StarRating';
import Reviews from '../components/Reviews';
import AddReview from '../components/AddReview';

const ResDetails = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } = useContext(RestaurantsContext);
  // const[selectedRestaurant,setSelectedRestaurant]=useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        // console.log(response)
        setSelectedRestaurant(response.data.data); // Ensure this matches your API structure
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>      
      {selectedRestaurant && (

        <>
        <h1 className='text-centre display-1'>{selectedRestaurant.resta.name}</h1>
        <div className="text-centre">
          <StarRating   rating={selectedRestaurant.resta.average_rating}/>
          <span className='text-warning ml-1'>
                {selectedRestaurant.resta.count? `(${selectedRestaurant.resta.count})`:"(0)"}
                </span> 
        </div>
        <div className='mt-3'>         
               <Reviews reviews={selectedRestaurant.review}/> 
                
        </div>
        <AddReview/>
        </>
      )}
    </div>
  );
};

export default ResDetails;
