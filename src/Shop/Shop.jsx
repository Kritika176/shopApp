import style from "./Shop.module.css";
import { useDispatch } from "react-redux";
import {shopData} from "../Shop/Redux/ShopData/action";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
export const Shop = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state.shop.data);
  const [shopCollection,setShopCollection] = useState([]);
  const [filteredData,setFilteredData] = useState([]);
  let today = new Date().toISOString().slice(0, 10);
useEffect(() => {
  dispatch(shopData());
},[dispatch])
 
useEffect(() => {setShopCollection([...data])},[data])
  
 
      
      console.log("data",shopCollection);
  return (
<div className={style.shopContainer}>
  <div className={style.filter}>
  <select required name='area'  >
        <option value="">Filter by area</option>
        <option value="Pune" >Pune</option>
        <option value="Mumbai Suburban" >Mumbai Suburban</option>
        <option value="Nashik">Nashik</option>
        <option value="Nagur" >Nagpur</option>
        <option value="Ahmednagar" >Ahmednagar</option>
        <option value="Solpur" >Solapur</option>
        
      </select>
  <select required name='area'  >
        <option value="">Filter By category</option>
        <option value="Pune" >Pune</option>
        <option value="Mumbai Suburban" >Mumbai Suburban</option>
        <option value="Nashik">Nashik</option>
        <option value="Nagur" >Nagpur</option>
        <option value="Ahmednagar" >Ahmednagar</option>
        <option value="Solpur" >Solapur</option>
        
      </select>
  </div>
    <div className={style.shopMain} > 
    
      {
     shopCollection.map((item) => {
          today = today.split("-").join("");
          let openingDate = item.openingDate.split("-").join("");
          let closingDate = item.closingDate.split("-").join("");
          
            
        
          
          return (
            
            <div className={style.shop} key={item.id}>
             <img src="https://fakeimg.pl/250x100/"  width="70px" height="60px" ></img>
              <div>{`Name :${item.name}`}</div>
              <div>{`Area:${item.area}`}</div>
              <div>{`Category:${item.category}`}</div>
              
              <div className={style.status}>Status:{(Number(today)>=Number(openingDate) && Number(today)<Number(closingDate))?"Open":"Close"}</div>
              <button>Delete</button>
               
            </div>
              )
        })
        
      }
      
      </div>
    </div>
  )
}

