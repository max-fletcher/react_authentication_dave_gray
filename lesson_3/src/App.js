import Register from './Register'
import Login from './Login'
import Home from './Home'
import Layout from './Layout'
import Editor from './Editor'
import Admin from './Admin'
import Missing from './Missing'
import Unauthorized from './Unauthorized'
import Lounge from './Lounge'
import LinkPage from './LinkPage'
import { Routes, Route } from 'react-router-dom'
import RequireAuth from './RequireAuth' // custom hook for access control/restriction

function App() {
  
  return (
      <Routes>
        <Route path="/" element={<Layout />}>

          {/* Public Routes */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="linkpage" element={<LinkPage />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* We Want to Protect These Routes */}
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
            <Route path="editor" element={<Editor />} />
            <Route path="admin" element={<Admin />} />
            <Route path="lounge" element={<Lounge />} />
          </Route>

          {/* Catch All */}
          <Route path="*" element={<Missing />} />

        </Route>
      </Routes>
  );
}

export default App;
