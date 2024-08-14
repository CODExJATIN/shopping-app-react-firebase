import './App.css';
import GetStarted from './components/GetStarted';
import SignupForm from './components/SignUpPage';
import LoginForm from './components/LoginPage';
import ProductUploadForm from './components/ProductForm';
import HomePage from './components/HomePage';
import { Routes,Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LoginForm/>}/>
        <Route path='/signup' element={<SignupForm/>}/>
        <Route path='/upload' element={<ProductUploadForm/>}/>
        <Route path='/get-started' element={<GetStarted/>}/>
      </Routes>

    </div>
  );
}

export default App;
