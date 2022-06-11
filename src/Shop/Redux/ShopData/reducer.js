import { SHOP_DATA} from "./action";

const fetchedData = {
    data: []
}

export const ShopReducer =(store=fetchedData,{type,payload}) =>{

    switch(type){
        case SHOP_DATA: {
           return {...store,data:[...payload] }
           
        }
        default:{
            return store
    }
    
}
}