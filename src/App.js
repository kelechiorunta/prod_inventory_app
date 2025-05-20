import { Routes, Route } from 'react-router-dom'
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AddProductForm from './components/AddProductForm.jsx';
import EditProductForm from './components/EditProductForm.jsx';
import Modal from './components/Modal.jsx';


function App() {
  return (
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/newProduct" element={<AddProductForm />} />
          <Route path="/newProduct/:id" element={<EditProductForm />} />
        </Route>
       
          <Route path="/login" element={<Login />} />
      </Routes>
  );
}

export default App;
