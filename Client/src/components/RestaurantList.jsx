import React,{useEffect} from 'react';
import RestaurantFinder from '../api/RestaurantFinder';
import { useContext } from 'react';
import { RestaurantsContext } from '../context/RestaurantContext';
import {useNavigate} from "react-router-dom"
import StarRating from './StarRating'

const RestaurantList = (props) => {
 const{restaurants,setRestaurants}=useContext(RestaurantsContext)
 const navigate = useNavigate()
   useEffect(()=>{

 const fetchData =async()=>{

     try {
        const response=await  RestaurantFinder.get("/")
        setRestaurants(response.data.data.resta)
        console.log(response.data.data)
     } catch (error) {
        
     }       
 }

 fetchData()
   },[]);



  const handleDelete =async (e,id)=>{

     e.stopPropagation()
     
      try {
       const response=await RestaurantFinder.delete(`/${id}`)
       setRestaurants(restaurants.filter(restaurant=>{
        return restaurant.id !==id 
       }))
      } catch (error) {
        
      }
      
  }

  const handleUpdate=(e,id)=>{
    e.stopPropagation()

    navigate(`/Restaurants/${id}/update`)

  }


   const handleRestaurantSelect=(id)=>{
        navigate(`/Restaurants/${id}`)
   }


   const renderRating =(restaurant)=>{

    if(!restaurant.count){
      return <span className="text-warning">0 reviews</span>
    }  

   return (<>
   
   <StarRating rating={restaurant.average_rating}/>
 <span className='text-warning ml-1'>({restaurant.count})</span>
   </>
  )
   }


  return (
    <div className='list-group'>

      <table class="table table-dark table-hover">
           
           <thead>
            <tr className="bg-primary">
                <th scope='col'> Restaurant</th>
                <th scope='col'> Location</th>
                <th scope='col'> Price Range</th>
                <th scope='col'> Ratings</th>
                <th scope='col'> Edit</th>
                <th scope='col'> Delete</th>
            </tr>
           </thead>
         

           <tbody>
          {restaurants &&
           restaurants.map((restaurant) => (


            <tr onClick={()=>handleRestaurantSelect(restaurant.id)} key={restaurant.id}>
              <td>{restaurant.name}</td>
              <td>{restaurant.location}</td>
              <td>{"$".repeat(restaurant.price_range)}</td>
              <td>{renderRating(restaurant)}</td>
              <td>
                <button onClick={(e)=>handleUpdate(e,restaurant.id)} className='btn btn-warning'>Update</button>
              </td>
              <td>
                <button onClick={(e)=>handleDelete(e,restaurant.id)} className='btn btn-danger'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
          



            {/* <tr>
                <td>macD</td>
                <td>New Delhi</td>
                <td>$$</td>
                <td>Rating</td>
                <td>
                    <button className='btn btn-warning'>Update</button>
                </td>
                <td>
                    <button className='btn btn-danger'>Delete</button>
                </td>
                
            </tr>
            <tr>
                <td>macD</td>
                <td>New Delhi</td>
                <td>$$</td>
                <td>Rating</td>
                <td>
                    <button className='btn btn-warning'>Update</button>
                </td>
                <td>
                    <button className='btn btn-danger'>Delete</button>
                </td>
                
            </tr> */}

         {/* </tbody> */}


      </table>

    </div>
  )
}

export default RestaurantList;
