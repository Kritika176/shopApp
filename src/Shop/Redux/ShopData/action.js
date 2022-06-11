import axios from "axios";
export const SHOP_DATA = "SHOP_DATA";

export const getShopData = (payload) => ({

    type:SHOP_DATA,
    payload
})

export const shopData=() => {
    return (dispatch) => {
        axios.get("http://localhost:8080/shops").then((res) => {
           return dispatch(getShopData(res.data))
        })
    }
}