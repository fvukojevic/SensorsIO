import Login from './components/auth/Login'
import Dashboard from './components/backoffice/Dashboard'
import Logout from './components/auth/Logout'
import Profile from './components/backoffice/Profile'
import Room from './components/backoffice/Room'

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
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/rooms',
    name: 'rooms',
    component: Room,
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
