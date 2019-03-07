<template>
<div>
  <v-form>
    <v-container text-xs-center>
      <v-layout align-center justify-space-around column fill-height>
        <v-flex xs12 sm12 v-if="loaded == 0">
          <v-layout row wrap>
            <v-flex v-for="button in DNIValidations" xs6>
              <v-checkbox v-model="selected" :label="button" :value="button" color="primary"></v-checkbox>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 sm12 v-if="loaded > 0">
          <v-progress-circular :rotate="360" :size="animatedRadius" :width="25" :value="loaded" color="primary">
            <template v-if="loaded < 100 && animatedRadius>=250">
              <h2>Updating the blockchain</h2>
              <h2>Minning</h2>
              <h1>{{Math.round(loaded)}}</h1>
            </template>
            <template v-if="loaded >= 100">
              <h1>Transaction successed</h1>
              <v-btn round color="primary" class="secondary--text" small dark @click="$router.push('/client', () => console.log('Ruta cambiada'));">Return to Client Data</v-btn>

            </template>
          </v-progress-circular>
        </v-flex>
      </v-layout>
      <v-btn v-if="loaded == 0" round color="secondary" class="primary--text" small dark @click="uploadValidations()">Submit Validation</v-btn>
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
import DNIValidations from '../../DocValidations/DNI.js';

export default {
  props: ["documentData"],
  data() {
    return {
      DNIValidations: DNIValidations.validations,
      selected: [],
      loaded: 0,
      radius: 0,
      tweenedRadius: 0,
      snackbar: false,
      snackbarText: 'error',
      snackbarColor: 'error'
    }
  },
  computed: {
    animatedRadius: function() {
      return this.tweenedRadius;
    },
    clientData() {
      return this.$store.state.clientData
    },
    token() {
      return this.$store.state.token
    }
  },
  watch: {
    radius: function(newValue) {
      TweenLite.to(this.$data, 1.5, {
        tweenedRadius: newValue
      });
    }
  },
  methods: {
    uploadValidations: async function() {
      var abort = false;
      if (this.selected.length == 0) {
        this.snackbar = true;
        this.snackbarText = 'Please select at least one validation';
        this.snackbarColor = 'error';
      }
      this.loaded = 0.1;
      this.radius = 300;
      var context = this;
      var documentId = null;
      let config = {
        headers: {
          'securityCode': this.token,
        },
        withCredentials: true
      }
      await axios.post(consts.ipPVIService + 'resources/users/' + this.clientData.userId + '/documents', {
        "userId": this.documentData.userId,
        "userNumberId": this.documentData.userNumberId,
        "docType": this.documentData.docType,
        "item": this.documentData.item,
        "processDate": this.documentData.processDate,
        "expirationDate": this.documentData.expirationDate,
      }, config).then((response) => {
        documentId = response.data.documentId;
        context.loaded += 100 / (context.selected.length + 1)
      }).catch((err) => {;
        this.$router.go(-1)
        abort = true;
      })
      if (abort) {
        return;
      }
      var element;
      for (element in this.selected) {
        await axios.post(consts.ipPVIService + 'resources/users/' + context.clientData.userId + '/documents/' + documentId + '/validations', {
            "description": this.selected[element],
            "timestamp": new Date().toISOString().substr(0, 10).replace(/-/g, ""),
            "securityLevel": "ALTO"
          }, config)
          .then((response) => {
            context.loaded += 100 / (context.selected.length + 1)
          }).catch((err) => {})
      };
    }
  }
}
</script>
