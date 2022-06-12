import style from "./Shop.module.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import {shopData} from "../Shop/Redux/ShopData/action";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
export const Shop = () => {
  const dispatch = useDispatch();
  
  const [shopCollection,setShopCollection] = useState([]);
 const [area,setArea] = useState("");
 const data = useSelector(state => state.shop.data);
 const[category,setCategory] = useState("");

 // getting today's date
  let today = new Date().toISOString().slice(0, 10);
useEffect(() => {
  dispatch(shopData());
},[dispatch])


// setting shop collection
useEffect(() => {setShopCollection([...data])},[data])
 useEffect(() => {
  dispatch(shopData(area,category));
 },[area,category,dispatch,data])
    
 // deleting shop
 const handleDelete = (id) => {
  console.log(id)
 axios.delete(`http://localhost:8080/shops/${id}`)
  .then((res) => {
                  console.log("res",res);
                 
  })
}
  return (
<div className={style.shopContainer}>
  <div className={style.filter}>
  <select required  onChange={(e) => {
    setArea(e.target.value)
    
  }}>
        <option value="all" disabled selected >Filter by area</option>
        <option value="Pune" >Pune</option>
        <option value="Mumbai Suburban" >Mumbai Suburban</option>
        <option value="Nashik">Nashik</option>
        <option value="Nagpur" >Nagpur</option>
        <option value="Ahmednagar" >Ahmednagar</option>
        <option value="Solpur" >Solapur</option>
        
      </select>
  <select required name='area'   onChange={(e) => {
   setCategory(e.target.value)
  
  }
  } >
        <option value="" disabled selected>Filter By category</option>
        <option value="Grocery" >Grocery</option>
        <option value="Butcher" >Butcher</option>
        <option value="Baker">Baker</option>
        <option value="Chemist" >Chemist</option>
        <option value="Stationary" >Stationary</option>
       
        
      </select>
  </div>
    <div className={style.shopMain} > 
    
      {
     data.map((item) => {
          today = today.split("-").join("");
          let openingDate = item.openingDate.split("-").join("");
          let closingDate = item.closingDate.split("-").join("");
          
            
        
          
          return (
            
            <div className={style.shop} key={item.id}>
             <img src="https://fakeimg.pl/250x100/"   ></img>
              <div className={style.text}>{`Name :${item.name}`}</div>
              <div className={style.text}>{`Area:${item.area}`}</div>
              <div className={style.text}>{`Category:${item.category}`}</div>
              
              <div className={style.status}>Status:{(Number(today)>=Number(openingDate) && Number(today)<Number(closingDate))?<span className={style.font} style={{"color":"green"}}>Open</span>:<span className={style.font} style={{"color":"red" }}>Close</span>}</div>
              <button className={style.delete} onClick={() => {handleDelete(item.id)}}>Delete</button>
               
            </div>
              )
        })
        
      }
      
      </div>
    </div>
  )
}

