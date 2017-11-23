import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Main from '@/views/main'
import Locking from "@/components/lockingPage"

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
    	path: '/main',
      name: 'main',
      component: Main,
      children:[
        {path:'home',title:'首页',name:'home',component:resolve=>{require(['@/components/home/home'],resolve);}},
        {path:'medicalInsurance',title:'医保登记',name:'medicalInsurance',component:resolve=>{require(['@/components/medicalInsurance/medicalInsurance'],resolve);}},
        {path:'drugs',title:'药品管理',name:'drugs',component:resolve=>{require(['@/components/drugs/drugs'],resolve);}},
        {path:'inLibrary',title:'药品入库',name:'inLibrary',component:resolve=>{require(['@/components/inLibrary/inLibrary'],resolve);}},
        {path:'outLibrary',title:'药品出库',name:'outLibrary',component:resolve=>{require(['@/components/outLibrary/outLibrary'],resolve);}},
        {path:'record',title:'医疗记录',name:'record',component:resolve=>{require(['@/components/record/record'],resolve);}},
        {path:'wareHouse',title:'仓库管理',name:'wareHouse',component:resolve=>{require(['@/components/wareHouse/wareHouse'],resolve);}}
      ]
    },
    {
      path:'/locking',
      name: 'locking',
      component:Locking
    }
  ]
})
