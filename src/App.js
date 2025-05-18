import { Routes, Route } from 'react-router-dom'
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';


function App() {
  return (
      <Routes>
        <Route element={<ProtectedRoute />}>
             <Route path="/" element={<Home />} />
        </Route>
       
          <Route path="/login" element={<Login />} />
      </Routes>
  );
}

export default App;
