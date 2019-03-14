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
  mounted() {

  },
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
      var context = this;
      if (this.$refs.form.validate() == false) {
        this.snackbar = true;
        this.snackbarText = 'Error, enter correct client data';
        return;
      }
      firebase.auth().signInWithEmailAndPassword(this.user, this.pass)
        .then(() => {
          console.log("Login correcto");
        })
        .catch((error) => {
          context.snackbar = true;
          context.snackbarText = error.message;
        });
    }
  }
}
</script>
