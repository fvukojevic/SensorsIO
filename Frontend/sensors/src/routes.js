import Login from './components/auth/Login'
import Dashboard from './components/backoffice/Dashboard'
import Logout from './components/auth/Logout'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Login,
    meta: {
      requiresVisitor: true,
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout,
  }
]

export default routes
