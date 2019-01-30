import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    clientData: null,
  },
  mutations: {
    setClientData: (state, clientData) => state.clientData = clientData,
  },
  actions: {
    setClientDataAsync: (context, idUserFound, token) => {
      let config = {
        headers: {
          'securityCode': token
        }
      }
      return new Promise((resolve, reject) => {
        axios.get('http://localhost:8080/PVIService/resources/users/' + idUserFound, config)
          .then((response) => {
              console.log("Datos del usuario consultado");
              console.log(response.data);
              console.log("Actualizando el Store con el nuevo Usuario");
              context.commit('setClientData', response.data.user);
              resolve(response);
            },
            error => {
              // http failed, let the calling function know that action did not work out
              reject(error);
            })
      })
    }
  }
});