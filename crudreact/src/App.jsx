import { Routes,Route,Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";
import DeletePage from "./pages/DeletePage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const VITE_BACKEND_URL= import.meta.env.VITE_BACKEND_URL;
const App=  ()=>{
  return(

   <div>
    <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <div className="container mx-auto p-2">
        <Link to="/"> <h2 className="text-white text-2xl font-bold  font-mono">CRUD React By Yeshan</h2></Link>

      </div>
    </nav>
    <div className="container mx-auto p-2 h-full">
    <Routes>
      <Route index element={<HomePage/>}></Route>
      <Route path="/create" element={<CreatePage/>}></Route>
      <Route path="/edit/:id" element={<EditPage/>}></Route>
      <Route path="/delete" element={<DeletePage/>}></Route>
    </Routes>
    </div>
    <ToastContainer/>
   </div>
  );
}

export default App;