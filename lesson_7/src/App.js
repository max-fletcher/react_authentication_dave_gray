import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import Layout from './components/Layout'
import Editor from './components/Editor'
import Admin from './components/Admin'
import Missing from './components/Missing'
import Unauthorized from './components/Unauthorized'
import Lounge from './components/Lounge'
import LinkPage from './components/LinkPage'
import { Routes, Route } from 'react-router-dom'
import RequireAuth from './components/RequireAuth' // custom hook for access control/restriction
import PersistLogin from './components/PersistLogin'

const ROLES = {
  'User' : 2001,
  'Editor' : 1984,
  'Admin' : 5150
}

function App() {
  
  return (
      <Routes>
        <Route path="/" element={<Layout />}>

          {/* Public Routes */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="linkpage" element={<LinkPage />} />
          <Route path="unauthorized" element={<Unauthorized />} />

        {/* Wrapping everything in "PersistLogin" so that before any of the nested routes are accessed, "accessToken" is refreshed if "refreshToken"
          exists. There, the useEffect is called, which calls "verifyRefreshToken" which in turn calls "refresh"(to refresh accessToken duh!).
          Until it is refreshed, it will show a loading page. */}
        <Route element={<PersistLogin />}>
          {/* We Want to Protect These Routes. AllowedRoles are just the role codes that are allowed. Logic in the 
              the "RequireAuth" will check it and redirect the logged-in user accordingly. */}
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
            <Route path="editor" element={<Editor />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
            <Route path="lounge" element={<Lounge />} />
          </Route>
        </Route>

        {/* Catch All */}
        <Route path="*" element={<Missing />} />

        </Route>
      </Routes>
  );
}

export default App;
