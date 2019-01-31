<template>
<div>
  <v-form>
    <v-container text-xs-center>
      <v-layout align-center justify-space-around row fill-height>
        <v-flex xs12 sm8>
          <v-text-field v-model="numberId" label="Number ID" required></v-text-field>
          <v-radio-group v-model="docTypeSelected">
            <v-layout row wrap>
              <v-flex v-for="button in documentTypes" xs4>
                <v-radio :key="button.component" :label="button.label" :value="button.component" color="primary"></v-radio>
              </v-flex>
            </v-layout>
          </v-radio-group>
          <v-layout row wrap>
            <component :is="docTypeSelected"></component>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</div>
</template>

<script>
import { mapState } from 'vuex';
import consts from '../consts.js';
import DNIForm from '../components/documentForms/DNIForm';
import LaboralLifeForm from '../components/documentForms/LaboralLifeForm';
import LisenceForm from '../components/documentForms/LisenceForm';
import PassportForm from '../components/documentForms/PassportForm';
import RosterForm from '../components/documentForms/RosterForm';
import SanitaryForm from '../components/documentForms/SanitaryForm';

export default {
  components: { DNIForm, LaboralLifeForm, LisenceForm, PassportForm, RosterForm, SanitaryForm },
  data() {
    return {
      numberId: null,
      documentTypes: [{
        label: 'DNI',
        component: 'DNIForm'
      }, {
        label: 'Sanitary',
        component: 'SanitaryForm'
      }, {
        label: 'Laboral Life',
        component: 'LaboralLifeForm'
      }, {
        label: 'Roster',
        component: 'RosterForm'
      }, {
        label: 'Lisence',
        component: 'LisenceForm'
      }, {
        label: 'Passport',
        component: 'PassportForm'
      }],
      docTypeSelected: null
    }
  },
  methods: {}
}
</script>
