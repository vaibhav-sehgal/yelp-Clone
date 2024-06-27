import React, { useContext, useEffect, useState } from 'react'
import { useParams ,useNavigate} from 'react-router-dom'
import { RestaurantsContext } from '../context/RestaurantContext';
import RestaurantFinder from '../api/RestaurantFinder';


const UpdateRestaurant = () => {
  
  const {id}= useParams();
  const {restaurants}=useContext(RestaurantsContext)
  const [name,setName]=useState("")
  const [location,setLocation]=useState("")
  const [priceRange,setPriceRange]=useState("")
  const navigate=useNavigate();

useEffect(()=>{
  const fetchData=async()=>{
    const response=await RestaurantFinder.get(`/${id}`)
    console.log(response.data.data)
    setName(response.data.data.resta.name)
    setLocation(response.data.data.resta.location)
    setPriceRange(response.data.data.resta.price_range)
   
  }

  fetchData();
},[]);

 const handleSubmit=async(e)=>{
    e.preventDefault()

const updatedRestaurant = await RestaurantFinder.put(`/${id}`,{
    name,
    location,
    price_range:priceRange
});

navigate("/")

// windows.location.reload()

   
 }
 
  return (
    <div>
      
      

      <form action="">

        <div className='form-group'>
          <label htmlFor="name">Name</label>
            <input 
             value={name} 
             onChange={(e)=>setName(e.target.value)}  
              id="name"
               className='form-control'
                type="text" 
                />
        </div>

        <div className='form-group'>
          <label htmlFor="location">Location</label>
            <input
            value={location}
            onChange={(e)=>setLocation(e.target.value)}
             id="location"
              className='form-control'
               type="text" 
               />
        </div>

        <div className='form-group'>
          <label htmlFor="price_range">Price Range</label>
            <input
            value={priceRange}
            onChange={(e)=>setPriceRange(e.target.value)}
             id="price_range"
              className='form-control' 
              type="number" 
              />
        </div>

        <button
         type='submit' 
         onClick={handleSubmit}
          className='btn btn-primary'>
            Submit</button>
      </form>
    </div>
  )
}

export default UpdateRestaurant
