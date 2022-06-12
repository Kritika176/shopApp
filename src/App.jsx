import style from "./App.module.css";
import {Form} from "./Form/Form";
import {Shop} from "./ShopDisplay/Shop.jsx";
import { Logo } from "./Logo/Logo";
function App() {
  return (
    <div className={style.App}>
     
         <Logo className={style.logo}></Logo>
         <div className={style.container_form_shop}>
        <Form>
          
        </Form>
        <Shop></Shop>
        </div>  
    </div>
  );
}

export default App;
