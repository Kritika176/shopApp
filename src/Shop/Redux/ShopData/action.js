import axios from "axios";
export const SHOP_DATA = "SHOP_DATA";

export const getShopData = (payload) => ({

    type:SHOP_DATA,
    payload
})

export const shopData=(area,category) => {
   console.log(area,category)
   if(area!=="" && category!==""){
    console.log('ar',area)
        return (dispatch) => {
            axios.get(`http://localhost:8080/shops?area=${area}&category=${category}`).then((res) => {
                console.log("res",res.data)
                return dispatch(getShopData(res.data))
             })
        }

   }
    else if(area!=="" ){
        console.log('ar',area)
        return (dispatch) => {
            axios.get(`http://localhost:8080/shops?area=${area}`).then((res) => {
                console.log("res",res.data)
                return dispatch(getShopData(res.data))
             })
        }

    }
    else if(category){ 
        console.log("cat",category)     
        return (dispatch) => {
            axios.get(`http://localhost:8080/shops?category=${category}`).then((res) => {
                console.log("res",res.data)
                return dispatch(getShopData(res.data))
             }
       )}
    }
     if(!area && !category)
        {
    return (dispatch) => {
        axios.get("http://localhost:8080/shops").then((res) => {
            console.log("resss",res.data)
           return dispatch(getShopData(res.data))
        })
    }
}
}