import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import ClientDataRequest from './views/ClientDataRequest.vue'
import UploadFile from './views/UploadFile.vue'
import Client from './views/Client.vue'
import Document from './views/Document.vue'
import Validations from './views/Validations.vue'
import ValidateDocument from './views/ValidateDocument.vue'
import Statics from './views/Statics.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    }, {
      path: '/ClientDataRequest',
      name: 'clientDataRequest',
      component: ClientDataRequest
    }, {
      path: '/Client',
      name: 'client',
      component: Client
    }, {
      path: '/UploadFile',
      name: 'uploadFile',
      component: UploadFile
    },
    {
      path: '/document/:id',
      component: Document
    }, {
      path: '/document/:id/validations',
      component: Validations
    }, {
      path: '/UploadFile/validateDocument',
      component: ValidateDocument,
      name: 'validateDocument',
      props: true
    }, {
      path: '/Statics/',
      component: Statics
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})