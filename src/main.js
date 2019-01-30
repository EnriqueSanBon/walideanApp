import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import { store } from './store.js'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';



Vue.config.productionTip = false

new Vue({
  router,
  store: store,
  render: h => h(App)
}).$mount('#app')



var mock = new MockAdapter(axios);
mock.onGet('http://localhost:8080/PVIService/resources/users/3').reply(200, {
  user: {
    name: "Pichu",
    phone: "enriquesanchezbonet@gmail.com",
    surname: "Calzada",
    userId: "3",
    userNumberId: '1234562A'
  }
});

mock.onGet('http://localhost:8080/PVIService/resources/users/3/documents').reply(200, {
  documents: [{
      "id": "1",
      "docType": "Paysheet",
      "processDate": 20181114,
      "expirationDate": 20191114
    },
    {
      "id": "2",
      "docType": "Dni",
      "processDate": 20191114,
      "expirationDate": 20240629
    },
    {
      "id": "4",
      "docType": "Passport",
      "processDate": 20211114,
      "expirationDate": 20280629
    },
    {
      "id": "5",
      "docType": "Dni",
      "processDate": 20111114,
      "expirationDate": 20220629
    },
    {
      "id": "6",
      "docType": "Dni",
      "processDate": 20101114,
      "expirationDate": 20220629
    },
    {
      "id": "7",
      "docType": "Dni",
      "processDate": 20001114,
      "expirationDate": 20220629
    },
    {
      "id": "8",
      "docType": "Dni",
      "processDate": 20021114,
      "expirationDate": 20220629
    },
    {
      "id": "9",
      "docType": "Dni",
      "processDate": 19901114,
      "expirationDate": 20220629
    },
    {
      "id": "10",
      "docType": "Dni",
      "processDate": 20211114,
      "expirationDate": 20320629
    },
    {
      "id": "11",
      "docType": "Dni",
      "processDate": 19801114,
      "expirationDate": 20220629
    },
    {
      "id": "12",
      "docType": "Dni",
      "processDate": 20131114,
      "expirationDate": 20220629
    }
  ]
});


mock.onGet('http://localhost:8080/PVIService/resources/users/3/documents/:1').reply(200, {
  data: {
    userId: "1",
    userNumberId: "123456789K",
    docType: "Dni",
    item: "http://prueba",
    providerId: "0",
    processDate: "2017/11/08",
    expirationDate: "2030/02/05"
  }
});

mock.onGet('http://localhost:8080/PVIService/resources/users/3/documents/:1/validations').reply(200, {
  validations: [{
      id: 1,
      description: "Descripcon de la validacion 1",
      timestamp: "20171231",
      securityLevel: "ALTO"
    },
    {
      id: 2,
      description: "Descripcon de la validacion 2",
      timestamp: "20171120",
      securityLevel: "MEDIO"
    }
  ]
});