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
    providerId: null,
    docsPurchased: []
  },
  mutations: {
    setToken: (state, token) => state.token = token,
    setClientData: (state, clientData) => state.clientData = clientData,
    setEthAddress: (state, ethAddress) => state.ethAddress = ethAddress,
    setProviderId: (state, providerId) => state.providerId = providerId,
    addDoc: (state, docId) => state.docsPurchased.push(docId)
  },
  actions: {
    setClientDataAsync: (context, data) => {
      let config = {
        headers: {
          'securityCode': data.token
        },
        withCredentials: true
      }
      return new Promise((resolve, reject) => {
        axios.get(consts.ipPVIService + 'resources/users/' + data.idUserFound, config)
          .then((response) => {
              if (response.data.userId == "") {
                return reject("Invalid token");
              }
              context.commit('setClientData', response.data);
              return resolve(response);
            },
            error => {
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
    },
    setProviderIdAsync: (context, providerId) => {
      context.commit('setProviderId', providerId);
    }
  },
});