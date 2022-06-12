import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux/es/exports';
import { shopData } from '../Shop/Redux/ShopData/action';
import style from "./Form.module.css";
export const Form = () => {
const [error,setError] = useState("");
const [success,setSuccess] = useState("");
const dispatch = useDispatch();
const [shop,setShop] = useState({
  name:"",
  area:"",
  category:"",
  openingDate:"",
  closingDate:"",
});

//  ShopData Updating
const createShopData = (e) => {
  let od = shop.openingDate.split("-").join(" ");
  let cd = shop.closingDate.split("-").join(" ");
  console.log(od,cd)
  
  if(Number(od) > Number(cd)){
    alert("Opening date should be less than closing date");
    setShop({...shop,closingDate:""});
  }
  else{
      const name = e.target.name;
      const value = e.target.value;
      setShop({...shop,[name]:value});
  }
}

// form submission fucntion
const submitForm = (e) => {
  e.preventDefault();
  
  
  if(shop.name === "" || shop.area === "" || shop.category === "" || shop.openingDate === "" || shop.closingDate === "" || error!==""){
    setSuccess("Please fill all the fields correctly");
   
  }
  else{
    axios.post("http://localhost:8080/shops",shop).then(res => {console.log(res.data)})
    .catch((err) => {console.log(err.message)})
   
      dispatch(shopData());
      setShop({...shop,name:"",area:"",category:"",openingDate:"",closingDate:""});
  }
}
  return (
    <div className={style.form_container}>
      
     <form className={style.form} onSubmit={submitForm}>
     <label className={style.title}>ADD SHOP</label>
   
     <input type="text" name='name' value={shop.name} placeholder = {"Enter Shop Name"} required  onChange = {(e) =>{
       createShopData(e);
       let letter = /^[A-Z a-z]+$/;
      if(e.target.value === ""){
        setError("");
      }
      if(e.target.value.match(letter)){
        setError("")
        return true;
      }
      else{
      alert("Shop Name should be alphabets only");
      e.target.value = ""
      setError("Shop Name should be alphabets only");

     return false;
     }
      }}></input>
      {error!=="" ? <p className={style.error}>{`*${error}`}</p>:""}

      <label className={style.label_field}></label>
      <select required name='area' value={shop.area} onChange={(e) => createShopData(e)}>
        <option value="" disabled selected>Select Area</option>
        <option value="Pune" >Pune</option>
        <option value="Mumbai Suburban" >Mumbai Suburban</option>
        <option value="Nashik">Nashik</option>
        <option value="Nagpur" >Nagpur</option>
        <option value="Ahmednagar" >Ahmednagar</option>
        <option value="Solapur" >Solapur</option>
        
      </select>
      <select required name='category'value={shop.category} onChange={(e) =>createShopData(e)}>
        <option value="" disabled  selected>Select Category</option>
        <option value="Grocery" >Grocery</option>
        <option value="Butcher" >Butcher</option>
        <option value="Baker">Baker</option>
        <option value="Chemist" >Chemist</option>
        <option value="Stationary" >Stationary</option>
        
      </select>
      // comparing today's date with opening date
<div className={style.start_date}>
     <label>Opening Date:</label>
      <input type="date" required name='openingDate' value = {shop.openingDate} onChange={(e) =>createShopData(e)}></input>
      </div>
<div className={style.start_date}>
     <label>Closing Date:</label>
      <input type="date" required name="closingDate"  value = {shop.closingDate} onChange={(e) =>{
        (e.target.value < shop.openingDate) ? alert("Closing Date should be greater than Opening Date") : createShopData(e);
        }}></input>
      </div>
      <button type='submit' className={style.submit}>Submit</button>
      {success!=="" ? <p className={style.success}>{`*${success}`}</p>:""}
      </form> 
    </div>
  )
}


