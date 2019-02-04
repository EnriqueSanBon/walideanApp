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
      "docType": "AAAPrueba",
      "processDate": 20181114,
      "expirationDate": 21191114
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
      description: "El numero de identificacion ha sido reconocido",
      timestamp: "20171231",
      securityLevel: "ALTO"
    },
    {
      id: 2,
      description: "No ha caducado",
      timestamp: "20121120",
      securityLevel: "ALTO"
    },
    {
      id: 3,
      description: "El numero de identificacion introducido por el usuario en el anverso del documento coincide con el reverso",
      timestamp: "20131120",
      securityLevel: "ALTO"
    },
    {
      id: 4,
      description: "El nombre introducido por el usuario en el anverso del documento coincide con el reverso",
      timestamp: "20141120",
      securityLevel: "ALTO"
    },
    {
      id: 5,
      description: "Los apellidos introducidos por el usuario en el anverso del documento coinciden con el reverso",
      timestamp: "20151120",
      securityLevel: "ALTO"
    },
    {
      id: 6,
      description: "La fecha de caducidad introducida por el usuario en el anverso del documento coinciden con el reverso",
      timestamp: "20161120",
      securityLevel: "ALTO"
    },
    {
      id: 7,
      description: "Los metadatos no indican manipulacion",
      timestamp: "20191120",
      securityLevel: "ALTO"
    }
  ]
});
mock.onAny().passThrough();