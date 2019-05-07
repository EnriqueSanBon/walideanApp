<template>
<div>
  <v-form ref="form">
    <v-container text-xs-center>
      <v-layout align-center justify-space-around row fill-height>
        <v-flex xs12 sm8>
          <v-text-field v-model="numberId" :rules="numberIdRules" label="Number ID" required></v-text-field>
          <v-btn round color="secondary" class="primary--text" dark @click="">Sign In</v-btn>
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
  mounted() {},
  data() {
    return {
      numberId: "",
      numberIdRules: [
        v => !!v || 'User is required'
      ],
      snackbarText: 'Error',
      snackbarColor: 'error',
      snackbar: false,
    }
  },
  methods: {

  }
}
</script>
