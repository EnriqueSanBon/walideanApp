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
      <v-btn round color="secondary" class="primary--text" small dark>Submit Validation</v-btn>
      <p>{{ selected }}</p>
    </v-container>
  </v-form>
</div>
</template>

<script>
import { mapState } from 'vuex';
import DNIValidations from '../../DocValidations/DNI.js';

export default {
  data() {
    return {
      DNIValidations: DNIValidations.validations,
      selected: []
    }
  },
  methods: {}
}
</script>
