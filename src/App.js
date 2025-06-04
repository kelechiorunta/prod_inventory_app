import { Routes, Route, Navigate } from 'react-router-dom'
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
import ChatAlarm from './components/ChatAlarm.jsx';
import Modal from './components/Modal.jsx';
import ProductCard from './components/ProductCard.jsx';
import AppDashBoard from './components/AppDashBoard.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Page1 from './components/Page1.jsx';
import Page2 from './components/Page2.jsx';
import Page3 from './components/Page3.jsx';



function App() {
  return (
    <>  
      <FoundProductToast/>
      <ProductSubscriptionToast/>
      <ProductDeleteToast />
      <ChatAlarm/>
      
      <Routes>
      <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchProduct />} />
          <Route path="/product" element={<AddProductForm />} />
          <Route path="/product/:id" element={<EditProductForm />} />
          <Route path="/payment/:id" element={<PaymentForm />} />
          <Route path="/payment/callback" element={<VerifyPayment />} />
          <Route path="/chat/:userId" element={<ChatDashboard/>} />
          <Route path="/dashboard" element={<AppDashBoard />}>
            <Route index element={<Navigate to="page1" replace />} />
            <Route path="page1" element={<Page1 />} />
            <Route path="page2" element={<Page2 />} />
            <Route path="page3" element={<Page3 />} />
          </Route>
        </Route>
       
          <Route path="/login" element={<Login />} />
      </Routes>
    </>
      
  );
}

export default App;
