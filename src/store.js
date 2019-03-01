import Vue from 'vue';
import consts from './consts.js';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    token: null,
    clientData: null,
    ethAddress: null,
    docsPurchased: []
  },
  mutations: {
    setToken: (state, token) => state.token = token,
    setClientData: (state, clientData) => state.clientData = clientData,
    setEthAddress: (state, ethAddress) => state.ethAddress = ethAddress,
    addDoc: (state, docId) => state.docsPurchased.push(docId)
  },
  actions: {
    setClientDataAsync: (context, data) => {
      console.log("token y idUserFound en store");
      console.log(data.idUserFound);
      console.log(data.token);
      let config = {
        headers: {
          'securityCode': data.token
        },
        withCredentials: true
      }
      return new Promise((resolve, reject) => {
        axios.get(consts.ipPVIService + 'resources/users/' + data.idUserFound, config)
          .then((response) => {
              console.log("Datos del usuario consultado");
              console.log(response.data);
              console.log(response.status);
              console.log("Actualizando el Store con el nuevo Usuario");
              context.commit('setClientData', response.data);
              resolve(response);
            },
            error => {
              // http failed, let the calling function know that action did not work out
              reject(error);
            })
      })
    },
    addDocAsync: (context, docId) => {
      context.commit('addDoc', docId);
    },
    setTokenAsync: (context, token) => {
      context.commit('setToken', token);
    },
    setEthAddressAsync: (context, ethAddress) => {
      context.commit('setEthAddress', ethAddress);
    }
  },

});