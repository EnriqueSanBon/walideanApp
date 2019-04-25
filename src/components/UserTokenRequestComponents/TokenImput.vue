<template>
<div>
  <v-form ref="form" v-model="valid">
    <v-container text-xs-center>
      <v-layout align-center justify-space-around row fill-height>
        <v-flex xs12 sm8>
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
  mounted() {
    this.sendToken();
  },
  data() {
    return {
      valid: true,
      token: 'vDyYRf',
      idUserFound: null,
      documentTypes: consts.documentTypes,
      documentsSelected: consts.documentTypes,
      snackbar: false,
      snackbarText: 'Texto de prueba',
      snackbarColor: 'error'
    }
  },
  methods: {
    sendToken() {
      console.log("Manda token");
      var context = this;
      let config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      }
      axios.post(consts.ipPVIService + 'resources/authenticate', {
          "user": "admin",
          "pass": "admin"
        }, config)
        .then((response) => {
          axios.put(consts.ipPVIService + 'resources/users/' + this.$store.state.providerId + '/token/', {
              "docTypes": this.documentsSelected
            }, config)
            .then(() => {
              context.snackbarColor = 'success';
              context.snackbarText = 'Token sent';
              context.snackbar = true;
            })
        })
    },
    getClient() {
      var context = this;
      var data = {
        'token': this.token,
        'idUserFound': this.idUserFound
      }
      this.$store.dispatch('setTokenAsync', this.token)
        .then(() => {
          this.$router.push('/userPanel'); // Home
        })
    }
  }
}
</script>
