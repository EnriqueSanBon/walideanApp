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
          <v-btn round color="secondary" class="primary--text" dark @click="searchClient()">Send Token</v-btn>
          <v-text-field v-model="token" label="Received Token" required></v-text-field>
          <v-btn round color="secondary" class="primary--text" dark @click="getClient()">Check User</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
  {{documentsSelected}}
  {{idUserFound}}
  {{token}}
</div>
</template>

<script>
import axios from 'axios';
import consts from '../../consts.js';
export default {
  data() {
    return {
      dni: "53823177J",
      phone: "enriquesanchezbonet@gmail.com",
      token: 'BCFQFD',
      idUserFound: 17,
      documentTypes: consts.documentTypes,
      documentsSelected: []
    }
  },
  methods: {
    searchClient() {
      let config = {
        headers: {
          'maxRecords': 100,
          'initialRecord': 0,
          'userNumberId': this.dni,
          'userPhone': this.phone
        },
        withCredentials: true
      }
      axios.get(consts.ipPVIService + 'resources/users', config)
        .then((response) => {
          console.log("Respuesta busqueda usuario");
          console.log(response.data);
          if (response.data.usersCount == '1') {
            this.idUserFound = response.data.idList[0];
            this.sendToken();
          }
        })
    },
    sendToken() {
      axios.post(consts.ipPVIService + 'resources/users/' + this.idUserFound + '/token', {
          'docTypes': this.documentsSelected
        }, { withCredentials: true })
        .then((response) => {})
    },
    getClient() {
      console.log("Token antes de llamar a store");
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
