<template>
<div>
  <v-form>
    <v-container text-xs-center>
      <v-layout align-center justify-space-around row fill-height>
        <v-flex xs12 sm12>
          <v-layout row wrap>
            <v-flex v-for="button in DNIValidations" xs6>
              <v-checkbox v-model="selected" :label="button" :value="button"></v-checkbox>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-btn round color="secondary" class="primary--text" small dark @click="uploadValidations()">Submit Validation</v-btn>
      <p>{{ selected }}</p>
    </v-container>
  </v-form>
</div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
import consts from '../../consts.js';
import DNIValidations from '../../DocValidations/DNI.js';

export default {
  computed: mapState(['clientData', 'token']),
  data() {
    return {
      DNIValidations: DNIValidations.validations,
      selected: []
    }
  },
  methods: {
    uploadValidations() {
      var context = this;
      let config = {
        headers: {
          'securityCode': this.token,
        },
        withCredentials: true
      }
      this.selected.forEach(function(element) {
        console.log(element);
        axios.post(consts.ipPVIService + 'resources/users/' + context.clientData.userId + '/documents/' + context.$route.params.id + '/validations', {
            "description": element,
            "timestamp": "20171231",
            "securityLevel": "ALTO"
          }, config)
          .then((response) => {
            console.log("Respuesta subida validacion");
            console.log(response.data);
          })
      });

    }
  }
}
</script>
