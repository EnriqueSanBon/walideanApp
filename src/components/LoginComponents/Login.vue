<template>
<div>
  <v-form ref="form">
    <v-container text-xs-center>
      <v-layout align-center justify-space-around row fill-height>
        <v-flex xs12 sm8>
          <v-text-field v-model="user" :rules="userRules" label="Usuario" required></v-text-field>
          <v-text-field v-model="pass" :rules="passRules" :counter="20" label="Contraseña" required type="password"></v-text-field>
          <v-btn round color="secondary" class="primary--text" dark @click="loginUser()">Login</v-btn>
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
import firebase from "firebase";

export default {
  data() {
    return {
      user: null,
      userRules: [
        v => !!v || 'User is required'
      ],
      pass: null,
      passRules: [
        v => !!v || 'Password is required'
      ],
      valid: false,
      snackbarText: 'Error',
      snackbarColor: 'error',
      snackbar: false,
    }
  },
  methods: {
    loginUser() {
      if (this.$refs.form.validate() == false) {
        this.snackbar = true;
        this.snackbarText = 'Error, enter correct client data';
        return;
      }
      var context = this;
      //this should be on the then
      var firestore = firebase.firestore();
      var providersRef = firestore.collection("providers");
      let config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      }
      axios.post(consts.ipPVIService + 'resources/authenticate', {
          "user": this.user,
          "pass": this.pass
        }, config)
        .then((response) => {
          if (response.status == 200) {
            providersRef.where("userId", "==", this.user).get().then((querySnapshot) => {
                if (querySnapshot.size == 1) {
                  querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    context.$store.dispatch('setEthAddressAsync', doc.data().ethAddress).then(() => {
                      context.$router.push('/ClientDataRequest');
                    });
                  });
                } else {
                  context.snackbar = true;
                  context.snackbarText = 'User or password invalid';
                }
              })
              .catch(function(error) {
                context.snackbar = true;
                context.snackbarText = 'Error: '
                error;
              });
            this.$router.push('/ClientDataRequest');
          }
        }).catch((error) => {
          if (error.message === "Network Error") {
            context.snackbar = true;
            context.snackbarText = 'Network Error';
          } else {
            context.snackbar = true;
            switch (error.response.status) {
              case 401:
                context.snackbarText = 'User or password invalid';
                break;
              default:
                context.snackbarText = error.response.statusText;
            }
          }
        })
    }
  }
}
</script>
