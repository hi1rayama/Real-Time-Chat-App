import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import ChatDashboard from './views/ChatDashboard.vue'
import CreateUser from './views/CreateUser.vue'
import CreateRoom from './views/CreateRoom.vue'
import JoinRoom from './views/JoinRoom.vue'
import LeaveRoom from './views/LeaveRoom.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
        path: '/',
        name: 'login',
        component: Login
      },
      {
      path: '/createuser',
      name: 'createuser',
      component: CreateUser
    },
    {
      path: '/chat',
      name: 'chat',
      component: ChatDashboard,
    },
    {
      path: '/chat/createroom',
      name: 'createroom',
      component: CreateRoom,
    },
    {
      path: '/chat/joinroom',
      name: 'joinroom',
      component: JoinRoom,
    },
    {
      path:'/chat/leaveroom',
      name:'leaveroom',
      component:LeaveRoom,
    }
  ]
})