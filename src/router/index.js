import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

//解决编程式路由往同一地址跳转时会报错的情况
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;
//push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};
//replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalReplace.call(this, location, onResolve, onReject);
  return originalReplace.call(this, location).catch(err => err);
};

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: "/",
    name: "Login",
    component: () => import("../views/Login")
  },
  {
    path: "/faceToLand",
    name: "FaceToLand",
    component: () => import("../views/FaceToLand")
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import("../components/DataManipulation/DataTreat")
  },
  {
    path: '/visual',
    name: 'Visual',
    component: () => import("../components/VisualEditing/Visual")
  },
  {
    path: '/sweetfun',
    name: 'SweetFun',
    component: () => import("../components/NewPage/SweetFun")
  },
  {
    path: '/yulan',
    name: 'yulan',
    component: () => import("../components/VisualEditing/yulan")
  },
  {
    path: '/newPage',
    name: 'newPage',
    component: () => import("../VisualDrag/Index")
  },
  {
    path: '/voiceTest',
    name: 'voiceTest',
    component: () => import("../views/VoiceTest")
  },
  {
    path: '/dataProcessing',
    name: 'dataProcessing',
    component: () => import("../DataProcessing/Index")
  },
  {
    path: '/faceRenZhen',
    name: 'renlianrenzhen',
    component: () => import("../views/renlianrenzhen")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
