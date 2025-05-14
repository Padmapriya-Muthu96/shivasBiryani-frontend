

 import Navbarcomponent from "./Components/Navbarcomponent";
 import MainDashboard from "./Components/MainDashboard";
 import { CartProvider } from './context/CartContext';
 import { BrowserRouter, Routes, Route } from "react-router-dom";
 import AddressForm from "./Components/AddressForm";
 import ProcessPayment from "./Components/ProcessPayment";

function App() {
 
 return (
    <>
      <div>
        <BrowserRouter>
      <CartProvider>
      <Navbarcomponent />
      
      <Routes>
        <Route path="/" element={<MainDashboard/>}/>
        <Route path="/user-address-details" element={<AddressForm/>}/>
        <Route path="/process-payment" element={<ProcessPayment/>}/>
      </Routes>
    </CartProvider>
    
    </BrowserRouter>
       
      </div>
      
    </>
  )
}

export default App
