import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
import morgan from 'morgan';
import db from "./db/index.js"
import cors from 'cors'



const port=process.env.PORT || 6000;
const app =express()
app.use(cors())

app.use(express.json());

// ````````````MIDDLEWARE module  ```````````````````````` 

// app.use(morgan("tiny"))

// ````````````MIDDLEWARE Defined by us ```````````````````````` 

// app.use((req,res,next)=>{
// console.log("hit middleware")
// next()
// })

// app.use((req,res,next)=>{
// console.log("hit 2nd middleware")
// next()
// })


// Get a restaurant 


app.get('/Restaurants',async (req,res)=>{
     try {
        
        const response=await  db.query("select * from restaurant left join (select restaurant_id,count(*),trunc(avg(rating),1) as average_rating from reviews group by restaurant_id ) reviews on restaurant.id=reviews.restaurant_id;")

        // console.log('hit route handler')
        console.log(req.body)
        res.json({
            status:"success",
           
            data:{  
                resta:response.rows
            },
        })  
        
        //  res.json(response.rows)
        //  console.log(response)


     } catch (error) {
        
        console.error(error)
     }


})

app.get('/Restaurants/:id',async(req,res)=>{
    
    const id =req.params.id;
    console.log(id)

    try {

      
        const resta=await  db.query("select * from restaurant left join (select restaurant_id,count(*),trunc(avg(rating),1) as average_rating from reviews group by restaurant_id ) reviews on restaurant.id=reviews.restaurant_id where id =$1",[id])
        const review=await  db.query("select * from reviews where restaurant_id =$1",[id])
        res.json({
            status:"success",
           
            data:{  
                resta:resta.rows[0],
                review:review.rows

            },
        })  

    } 
    catch (error) {
       console.error(error) 
    }
    

     
})

//Create a Restaurant 


app.post("/Restaurants",async (req,res)=>{
   
    try {

        const { name, location, price_range } = req.body;
        
        const response= await db.query("insert into restaurant (name,location,price_range) values ($1,$2,$3) returning *",[req.body.name,req.body.location,req.body.price_range])
          
        res.json({
            status:"success",
           
            data:{  
                resta:response.rows[0]
            },
        })  
    } catch (error) {
        console.error(error)
    }


})

// Update Restaurants

app.put("/Restaurants/:id",async (req,res)=>{

    try {
        const results = await db.query(
          "UPDATE restaurant SET name = $1, location = $2, price_range = $3 where id = $4 returning *",
          [req.body.name, req.body.location, req.body.price_range, req.params.id]
        );
    
        res.status(200).json({
          status: "succes",
          data: {
            retaurant: results.rows[0],
          },
        });
      } catch (err) {
        console.log(err);
      }
      console.log(req.params.id);
      console.log(req.body);
    
})

// Delete Restaurants

app.delete("/Restaurants/:id",async(req,res)=>{

try {
    
const response = await db.query("delete from restaurant where id=$1",[req.params.id])
const data = await db.query("select * from restaurant")

res.status(205).json({
    status:"success",
   
    // data:{  
    //     // resta:response.rows[0]
    // },
})  
} catch (error) {
console.error(error)
}
    
});


app.post("/Restaurants/:id/addReview",async(req,res)=>{

try {

const newReview=  await db.query('Insert into reviews (restaurant_id,name,review,rating) values ($1,$2,$3,$4) returning *; ',[req.params.id,req.body.name,req.body.review,req.body.rating])

res.json({
    status:'success',
    data:{
        review: newReview.rows[0]
    }
})
    
} catch (error) {
    console.log(error)
}


})





app.listen(port,()=>{
    console.log(`server is up on port ${port}`)
})
