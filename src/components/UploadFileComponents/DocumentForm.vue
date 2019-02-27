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
                <v-radio :key="button.component" :label="button.label" :value="button" color="primary"></v-radio>
              </v-flex>
            </v-layout>
          </v-radio-group>
          <v-layout row wrap v-if="docTypeSelected != null">
            <component :is="docTypeSelected.component"></component>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-btn round color="secondary" class="primary--text" small dark @click="uploadDocument()">Submit Document</v-btn>
    </v-container>
  </v-form>
</div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
import consts from '../../consts.js';
import DNIForm from '../../components/DocumentForms/DNIForm';
import LaboralLifeForm from '../../components/DocumentForms/LaboralLifeForm';
import LisenceForm from '../../components/DocumentForms/LisenceForm';
import PassportForm from '../../components/DocumentForms/PassportForm';
import RosterForm from '../../components/DocumentForms/RosterForm';
import SanitaryForm from '../../components/DocumentForms/SanitaryForm';

export default {
  components: { DNIForm, LaboralLifeForm, LisenceForm, PassportForm, RosterForm, SanitaryForm },
  computed: mapState(['clientData', 'token']),
  data() {
    return {
      numberId: null,
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
      let config = {
        headers: {
          'securityCode': this.token,
        },
        withCredentials: true
      }
      axios.post(consts.ipPVIService + 'resources/users/' + this.clientData.userId + '/documents', {
          "userId": this.clientData.userId,
          "userNumberId": this.numberId,
          "docType": this.docTypeSelected.label,
          "item": "http://prueba",
          "processDate": "20190226",
          "expirationDate": "20190326"
        }, config)
        .then((response) => {
          console.log("Respuesta subida fichero");
          console.log(response.data);
          this.$router.push('/UploadFile/' + response.data.documentId + '/validateDocument')
        })
    }
  }
}
</script>
