<template>
<div>
  <v-form>
    <v-container text-xs-center>
      <v-layout align-center justify-space-around row fill-height>
        <v-flex xs12 sm8>
          <v-text-field v-model="dni" label="DNI" required></v-text-field>
          <v-text-field v-model="phone" label="Email" required></v-text-field>
          <v-layout row wrap>
            <v-flex v-for="button in documentTypes" xs4>
              <v-switch v-model="documentsSelected" :label="button" :value="button" color="primary"></v-switch>
            </v-flex>
          </v-layout>
          <v-btn round color="secondary" class="primary--text" dark @click="searchClient(true)">Send Token</v-btn>
          <v-text-field v-model="token" label="Received Token" required></v-text-field>
          <v-btn round color="secondary" class="primary--text" dark @click="getClient()">Check User</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</div>
</template>

<script>
import axios from 'axios';
import consts from '../../consts.js';
export default {
  data() {
    return {
      dni: "",
      phone: "",
      token: '',
      idUserFound: null,
      documentTypes: consts.documentTypes,
      documentsSelected: []
    }
  },
  methods: {
    searchClient(withToken) {
      console.log("Search Client");
      var context = this;
      let config = {
        headers: {
          'maxRecords': 100,
          'initialRecord': 0,
          'userNumberId': this.dni,
          'userPhone': this.phone
        },
        withCredentials: true
      }
      console.log("llega dentro de search cliente" + withToken);
      const promise = new Promise(function(resolve, reject) {
        axios.get(consts.ipPVIService + 'resources/users', config)
          .then((response) => {
            console.log("Respuesta busqueda usuario");
            console.log(response.data);
            if (response.data.usersCount == '1') {
              context.idUserFound = response.data.idList[0];
              if (withToken)
                context.sendToken();
              resolve(response.data.idList[0])
            } else {
              reject(new Error('Usuario invalido'))
            }
          })
      })
      return promise
    },
    sendToken() {
      axios.post(consts.ipPVIService + 'resources/users/' + this.idUserFound + '/token', {
          'docTypes': this.documentsSelected
        }, { withCredentials: true })
        .then((response) => {})
    },
    getClient() {
      console.log("Entra en getClient");
      var context = this;
      if (!this.idUserFound) {
        console.log("Antes de Search Client");
        this.searchClient(false)
          .then(() => {
            console.log("Token antes de llamar a store sin haberlo enviado");
            console.log(context.token);
            var data = {
              'token': context.token,
              'idUserFound': context.idUserFound
            }
            context.$store.dispatch('setClientDataAsync', data).then(() => {
              context.$store.dispatch('setTokenAsync', context.token).then(() => {
                context.$router.push('/client', () => console.log('Ruta cambiada')); // Home
              })
            })
          })
      }
      console.log("Token antes de llamar a store con userId encontrado");
      console.log(this.token);
      var data = {
        'token': this.token,
        'idUserFound': this.idUserFound
      }
      this.$store.dispatch('setClientDataAsync', data).then(() => {
        this.$store.dispatch('setTokenAsync', this.token).then(() => {
          this.$router.push('/client', () => console.log('Ruta cambiada')); // Home
        })
      })
    }
  }
}
</script>
