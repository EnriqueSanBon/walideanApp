<template>
<div>
  <v-form ref="form" v-model="valid">
    <v-container text-xs-center>
      <v-layout align-center justify-space-around row fill-height>
        <v-flex xs12 sm8>
          <v-text-field v-model="dni" :rules="dniRules" label="DNI" required></v-text-field>
          <v-text-field v-model="phone" :rules="emailRules" label="Email" required></v-text-field>
          <v-text-field v-model="name" :rules="nameRules" label="Name" required></v-text-field>
          <v-text-field v-model="surname" :rules="surnameRules" label="Surname" required></v-text-field>

          <v-btn round color="secondary" class="primary--text" dark @click="SignInUser()">Complete</v-btn>
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
import { mapState } from 'vuex';
import axios from 'axios';
import consts from '../../consts.js';
import firebase from "firebase";

export default {
  data() {
    return {
      dni: "",
      dniRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      name: "",
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 30) || 'Name must be less than 30 characters'
      ],
      surname: "",
      surnameRules: [
        v => !!v || 'Surname is required',
        v => (v && v.length <= 30) || 'Surname must be less than 30 characters'
      ],
      phone: "",
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      snackbar: false,
      snackbarText: 'error',
      snackbarColor: 'error',

    }
  },
  methods: {
    SignInUser() {
      let config = {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true
      }
      var router = this.$router
      axios.post(consts.ipPVIService + 'resources/users', {
          "name": this.name,
          "surname": this.surname,
          "phone": this.phone,
          "userNumberId": this.dni
        }, config)
        .then((response) => {
          console.log("usuario logueado correctamente");
          console.log(response);
          router.push('/ClientDataRequest');
        })
    }

  }
}
</script>
