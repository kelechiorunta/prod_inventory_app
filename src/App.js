import { Routes, Route } from 'react-router-dom'
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AddProductForm from './components/AddProductForm.jsx';
import Modal from './components/Modal.jsx';


function App() {
  return (
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
        <Route path="/newProduct" element={
          // <Modal>
            <AddProductForm />
          // </Modal>
        } />
        </Route>
       
          <Route path="/login" element={<Login />} />
      </Routes>
  );
}

export default App;
