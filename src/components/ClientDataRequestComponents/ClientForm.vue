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
          <v-btn round color="secondary" class="primary--text" dark @click="searchClient(true).catch((err) => {snackbar = true; snackbarText = err.message;})">Send Token</v-btn>
          <p>User not found? <b @click="$router.push('/NewFinalUser')">Register it</b></p>
          <v-text-field v-model="token" label="Received Token" required></v-text-field>
          <v-btn round color="secondary" class="primary--text" dark @click="getClient()">Check User</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
  <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="15000">
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
      dni: "53823177J",
      dniRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      phone: "enriquesanchezbonet@gmail.com",
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      token: 'vDyYRf',
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
      var context = this;
      var abort = false;
      let config = {
        headers: {
          'maxRecords': 100,
          'initialRecord': 0,
          'userNumberId': this.dni,
          'userPhone': this.phone
        },
        withCredentials: true
      }
      if ((this.documentsSelected.length == 0 || this.$refs.form.validate() == false) && withToken) {
        abort = true;
      }
      const promise = new Promise(function(resolve, reject) {
        if (abort) {
          return reject(new Error('Error, enter correct client data'));
        }
        axios.get(consts.ipPVIService + 'resources/users', config)
          .then((response) => {
            if (response.data.usersCount == '1') {
              context.idUserFound = response.data.idList[0];
              if (withToken)
                context.sendToken();
              return resolve(response.data.idList[0])
            } else {
              return reject(new Error('Combinatios numberId and phone not found'))
            }
          })
          .catch((error) => {
            if (error.message === "Network Error") {
              context.snackbarColor = 'error';
              context.snackbar = true;
              context.snackbarText = 'Network Error';
            } else {
              context.snackbar = true;
              switch (error.response.status) {
                case 401:
                  context.snackbarText = 'Must be logged';
                  break;
                default:
                  context.snackbarText = error.response.statusText;
              }
            }
          })
      })
      return promise
    },
    sendToken() {
      console.log("Manda token");
      var context = this;
      let config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      }
      axios.put(consts.ipPVIService + 'resources/users/' + this.idUserFound + '/token/', {
          "docTypes": this.documentsSelected
        }, config)
        .then(() => {
          context.snackbarColor = 'success';
          context.snackbarText = 'Token sent';
          context.snackbar = true;
        })
    },
    getClient() {
      var context = this;
      if (!this.idUserFound) {
        this.searchClient(false)
          .then(() => {
            var data = {
              'token': context.token,
              'idUserFound': context.idUserFound
            }
            context.$store.dispatch('setClientDataAsync', data)
              .then(() => {
                context.$store.dispatch('setTokenAsync', context.token).then(() => {
                  context.$router.push('/client');
                })
              }).catch((err) => {
                context.snackbarColor = 'error';
                context.snackbarText = err;
                context.snackbar = true;
              })
          }).catch((err) => {
            context.snackbar = true;
            context.snackbarText = err.message;
          })
      } else {
        var data = {
          'token': this.token,
          'idUserFound': this.idUserFound
        }
        this.$store.dispatch('setClientDataAsync', data)
          .then((response) => {
            this.$store.dispatch('setTokenAsync', this.token)
              .then(() => {
                this.$router.push('/client'); // Home
              })
          }).catch((err) => {
            context.snackbarColor = 'error';
            context.snackbarText = err;
            context.snackbar = true;
          })
      }
    }
  }
}
</script>
