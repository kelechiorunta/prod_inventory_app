import { Routes, Route } from 'react-router-dom'
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AddProductForm from './components/AddProductForm.jsx';
import EditProductForm from './components/EditProductForm.jsx';
import PaymentForm from './components/PaymentForm.jsx';
import VerifyPayment from './components/VerifyPayment.jsx';
import SearchProduct from './components/SearchProduct.jsx';
import ProductDeleteToast from './components/ProductDeleteToast.jsx';
import ProductSubscriptionToast from './components/ProductSubscriptionToast.jsx';
import FoundProductToast from './components/FoundProductToaster.jsx';
import ChatNotifications from './components/ChatNotifications.jsx';
import ChatDashboard from './components/ChatDashBoard.jsx';


function App() {
  return (
    <>  
      <FoundProductToast/>
      <ProductSubscriptionToast/>
      <ProductDeleteToast />
      
      <Routes>
      <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchProduct />} />
          <Route path="/product" element={<AddProductForm />} />
          <Route path="/product/:id" element={<EditProductForm />} />
          <Route path="/payment/:id" element={<PaymentForm />} />
          <Route path="/payment/callback" element={<VerifyPayment />} />
          <Route path="/chat/:userId" element={<ChatDashboard/>} />
        </Route>
       
          <Route path="/login" element={<Login />} />
      </Routes>
    </>
      
  );
}

export default App;
