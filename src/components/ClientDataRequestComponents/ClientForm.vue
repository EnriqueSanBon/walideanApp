<template>
<div>
  <v-form ref="form" v-model="valid">
    <v-container text-xs-center>
      <v-layout align-center justify-space-around row fill-height>
        <v-flex xs12 sm8>
          <v-text-field v-model="dni" :rules="dniRules" label="DNI" required></v-text-field>
          <v-text-field v-model="phone" :rules="emailRules" label="Email" required></v-text-field>
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
  <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="6000">
    {{ snackbarText }}
    <v-btn dark flat @click="snackbar = false">
      Close
    </v-btn>
  </v-snackbar>
</div>
</template>

<script>
import axios from 'axios';
import consts from '../../consts.js';
export default {
  data() {
    return {
      valid: true,
      dni: "123456789B",
      dniRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      phone: "walideanpruebas@gmail.com",
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      token: 'XQOUHC',
      idUserFound: null,
      documentTypes: consts.documentTypes,
      documentsSelected: [],
      snackbar: false,
      snackbarText: 'Texto de prueba',
      snackbarColor: 'error'
    }
  },
  methods: {
    searchClient(withToken) {

      if ((this.documentsSelected.length == 0 || this.$refs.form.validate() == false) && withToken) {
        this.snackbar = true;
        this.snackbarText = 'Error, enter correct client data';
        return;
      }
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
      console.log(this.idUserFound);
      var context = this;
      if (!this.idUserFound) {
        console.log("Entra en no hay user found");
        this.searchClient(false)
          .then(() => {
            var data = {
              'token': context.token,
              'idUserFound': context.idUserFound
            }
            console.log("Despues de searchcliente el iduserfound vale: " + context.idUserFound);
            context.$store.dispatch('setClientDataAsync', data).then(() => {
              context.$store.dispatch('setTokenAsync', context.token).then(() => {
                context.$router.push('/client', () => console.log('Ruta cambiada')); // Home
              })
            })
          })
      } else {
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
}
</script>
