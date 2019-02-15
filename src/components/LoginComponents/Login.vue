<template>
<div>
  <v-form>
    <v-container text-xs-center>
      <v-layout align-center justify-space-around row fill-height>
        <v-flex xs12 sm8>
          <v-text-field v-model="user" label="Usuario" required></v-text-field>
          <v-text-field v-model="pass" :counter="20" label="Contraseña" required></v-text-field>
          <v-btn round color="secondary" class="primary--text" dark @click="loginUser()">Login</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</div>
</template>

<script>
import axios from 'axios';
import firebase from "firebase";

export default {
  data() {
    return {
      user: null,
      pass: null,
      valid: false
    }
  },
  methods: {
    loginUser() {
      var context = this;
      //this should be on the then
      var firestore = firebase.firestore();
      var providersRef = firestore.collection("providers");
      providersRef.where("userId", "==", this.user).get().then((querySnapshot) => {
          console.log(querySnapshot);
          if (querySnapshot.size == 1) {
            querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              console.log(doc.data());
              console.log(doc.data().ethAddress);
              context.$store.dispatch('setEthAddressAsync', doc.data().ethAddress).then(() => {
                context.$router.push('/ClientDataRequest', () => console.log('Ruta /ClientDataRequest'));
              });
            });
          } else {
            console.log("Usuario introducido incorrecto");
          }
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
        });

      axios.post('http://localhost:8080/PVIService/resources/authenticate', {
          "user": this.user,
          "pass": this.pass
        })
        .then((response) => {
          console.log(response)
          if (response.status == 200) {
            console.log("Login Correcto");
            this.$router.push('/ClientDataRequest', () => console.log('Ruta /ClientDataRequest'));
          }
        })
    }
  }
}
</script>
