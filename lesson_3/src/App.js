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

          {/* We Want to Protect These Routes. AllowedRoles are just the role codes that are allowed. Logic in the 
              the "RequireAuth" will check it and redirect the logged-in user accordingly. */}
          <Route element={<RequireAuth allowedRoles={[2001]} />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[1984]} />}>
            <Route path="editor" element={<Editor />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[5150]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[1984, 5150]} />}>
            <Route path="lounge" element={<Lounge />} />
          </Route>

          {/* Catch All */}
          <Route path="*" element={<Missing />} />

        </Route>
      </Routes>
  );
}

export default App;
