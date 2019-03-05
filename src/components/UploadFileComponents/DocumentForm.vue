<template>
<div>
  <v-form>
    <v-container text-xs-center>
      <v-layout align-left justify-space-around column fill-height>
        <v-flex xs12 sm8>
          <v-text-field v-model="numberId" label="Number ID" required></v-text-field>
          <v-radio-group v-model="docTypeSelected">
            <v-layout row wrap>
              <v-flex v-for="button in documentTypes" xs4>
                <v-radio :key="button.component" :label="button.label" :value="button" color="primary"></v-radio>
              </v-flex>
            </v-layout>
          </v-radio-group>
        </v-flex>
        <v-flex xs12 sm8>
          <v-menu v-model="menu2" :close-on-content-click="false" full-width max-width="290">
            <v-text-field slot="activator" :value="date" clearable label="Expiration date" readonly></v-text-field>
            <v-date-picker v-model="date" @change="menu2 = false"></v-date-picker>
          </v-menu>
        </v-flex>
      </v-layout>
      <v-btn round color="secondary" class="primary--text" small dark @click="uploadDocument()">Submit Document</v-btn>
    </v-container>
  </v-form>
  {{today}}
</div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
import consts from '../../consts.js';

export default {
  computed: {
    ...mapState(['clientData', 'token']),
    formatedDate: function() {
      var patron = /-/g;
      var newValue = "";
      return this.date.replace(patron, newValue);
    }
  },
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      today: new Date().toISOString().substr(0, 10).replace(/-/g, ""),
      numberId: null,
      menu2: false,
      documentTypes: [{
        label: 'Dni',
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
  methods: {
    uploadDocument() {
      var documentData = {
        "userId": this.clientData.userId,
        "userNumberId": this.numberId,
        "docType": this.docTypeSelected.label,
        "item": "http://prueba",
        "processDate": this.today,
        "expirationDate": this.formatedDate
      }
      this.$router.push({ name: 'validateDocument', params: { documentData: documentData } })
    }
  }
}
</script>
