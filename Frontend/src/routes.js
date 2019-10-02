import Login from './components/auth/Login'
import Dashboard from './components/backoffice/dashboard/Dashboard'
import Logout from './components/auth/Logout'
import Profile from './components/backoffice/profile/Profile'
import Room from './components/backoffice/room/Room'
import Settings from './components/backoffice/settings/Settings'
import Notifications from './components/backoffice/notifications/Notifications'

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
    },
    {
        path: '/settings',
        name: 'settings',
        component: Settings,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: '/notifications',
        name: 'notifications',
        component: Notifications,
        meta: {
            requiresAuth: true,
        }
    },
]

export default routes
