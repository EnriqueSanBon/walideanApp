<template>
<div>
  <v-form>
    <v-container text-xs-center>
      <v-layout align-center justify-space-around row fill-height>
        <v-flex xs12 sm8>
          <v-text-field v-model="dni" label="DNI" required></v-text-field>
          <v-text-field v-model="phone" label="Email" required></v-text-field>
          <v-btn round color="secondary" class="primary--text" dark @click="searchClient()">Send Token</v-btn>
          <v-layout row wrap>
            <v-flex v-for="button in documentTypes" xs4>
              <v-switch v-model="documentsSelected" :label="button" :value="button" color="primary"></v-switch>
            </v-flex>
          </v-layout>
          <v-text-field v-model="token" label="Received Token" required></v-text-field>
          <v-btn round color="secondary" class="primary--text" dark @click="getClient()">Check User</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
  {{documentsSelected}}
</div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import consts from '../../consts.js';
export default {
  data() {
    return {
      dni: "123456789A",
      phone: "enriquesanchezbonet@gmail.com",
      token: null,
      idUserFound: 3,
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
        }
      }
      axios.get('http://localhost:8080/PVIService/resources/users', config)
        .then((response) => {
          if (response.data.usersCount == '1') {
            this.idUserFound = response.data.idList[0];
            this.sendToken();
          } else {
            console.log("Mal especificados los parametros");
          }
        })
    },
    sendToken() {
      axios.post('http://localhost:8080/PVIService/resources/users/' + this.idUserFound + '/token', {
          DocTypes: documentsSelected
        })
        .then((response) => {})
    },
    getClient() {
      this.$store.dispatch('setClientDataAsync', this.idUserFound, this.token).then(() => {
        //pasar al siguiente modulo
        console.log("Cambiando de ruta");
        this.$router.push('/client', () => console.log('Ruta cambiada')); // Home
      })
    }
  }
}
</script>
