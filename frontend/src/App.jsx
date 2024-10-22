import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import SignUp from './pages/signup/SignUp';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/Authcontext';
import CreateEmployee from './pages/createEmployee/createEmployee';
import EmployeeList from './pages/listEmployees.jsx/ListEmployees';
import HomePage from './pages/mainPage/homePage';
import Jobs from './pages/mainPage/careers';
import WorkShopList from './pages/listWorkShop/listWorkShop';
import CreateWorkShop from './pages/createWorkShop/createWorkShop';
import HomePageWorkShopList from './pages/mainPage/workShops';

function App() {
  const { authUser } = useAuthContext();

  return (
    <div >
      
        <Routes>
          <Route path='/dashboard' element={authUser ? <Home /> : <Navigate to={"/login"}/>} />
        <Route path='/createJob' element={<CreateEmployee />} />
        <Route path='/employeeList' element={authUser ? <EmployeeList /> : <Navigate to={"/login"} />} />
        <Route path='/workshopList' element={authUser ? <WorkShopList /> : <Navigate to={"/login"} />} />
        <Route path='/createWorkShop' element={authUser ? <CreateWorkShop /> : <Navigate to={"/login"} />} />


        <Route path='/login' element={authUser ? < Navigate to='/dashboard' /> : <Login />} />
        <Route path='/signup' element={authUser ? < Navigate to='/dashboard'/> : <SignUp />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/jobs' element={<Jobs />} />
        <Route path='/workshops' element={<HomePageWorkShopList />} />


          
          
        </Routes>
        <Toaster />
      
    </div>
  );
}

export default App;
