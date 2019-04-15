<template>
<div>
  <v-form ref="form">
    <v-container text-xs-center>
      <v-layout align-left justify-space-around column fill-height>
        <v-flex xs12 sm8>
          <v-text-field v-model="numberId" :rules="numberIdRules" label="Number ID" required></v-text-field>
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
            <v-text-field slot="activator" :value="date" clearable label="Expiration date" readonly :rules="dateRules"></v-text-field>
            <v-date-picker v-model="date" @change="menu2 = false"></v-date-picker>
          </v-menu>
        </v-flex>
        <v-flex xs12 sm8>
          <img v-for="imageUrl in imageUrls" :src="imageUrl" height="150" v-if="imageUrl" />
          <v-text-field label="Select Images" @click='pickFile' prepend-icon='attach_file' v-model="imageNamesString"></v-text-field>
          <input type="file" style="display: none" ref="image" accept="image/*" @change="onFilePicked" multiple>
        </v-flex>
      </v-layout>
      <v-btn round color="secondary" class="primary--text" small dark @click="uploadDocument()">Submit Document</v-btn>
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
import uuidv4 from "uuid/v4";

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
      dateRules: [
        v => !!v || 'Expiration date is required'
      ],
      today: new Date().toISOString().substr(0, 10).replace(/-/g, ""),
      numberId: null,
      numberIdRules: [
        v => !!v || 'Number ID is required'
      ],
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
      docTypeSelected: null,
      snackbar: false,
      snackbarText: 'error',
      snackbarColor: 'error',
      imageNames: [],
      imageNamesString: '',
      imageUrls: [],
      imageFiles: [],
      folderUUID: ''
    }
  },
  methods: {
    pickFile() {
      this.$refs.image.click()
    },

    onFilePicked(e) {
      console.log("Archivo seleccionado");
      console.log(e);
      var context = this;
      this.imageNames = [];
      this.imageUrls = [];
      this.imageFiles = [];
      const files = Array.from(e.target.files)
      files.forEach(function(file) {
        console.log(file);
        if (file !== undefined) {
          if (file.name.lastIndexOf('.') <= 0) {
            return
          }
          context.imageNames.push(file.name)
          const fr = new FileReader()
          fr.readAsDataURL(file)
          fr.addEventListener('load', () => {
            console.log("load listener");
            context.imageUrls.push(fr.result);
            context.imageFiles.push(file) // this is an image file that can be sent to server...
          })
        } else {
          console.log("file undefined");
        }
      });
      this.imageNamesString = this.imageNames.toString();
    },
    uploadDocument() {
      var storage = firebase.storage();
      var firestore = firebase.firestore();
      var context = this;
      this.folderUUID = uuidv4();
      var storageRef = storage.ref(this.folderUUID);
      firestore.collection("documents").doc(context.folderUUID).set({
          allowedUsers: [],
          files: this.imageNames
        })
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
      this.imageFiles.forEach(function(file) {
        var fileRef = storageRef.child(file.name);
        fileRef.put(file)
          .then(function(snapshot) {
            console.log('Uploaded a blob or file!');
          });
      })

      if (this.$refs.form.validate() == false || !this.docTypeSelected) {
        this.snackbar = true;
        this.snackbarText = 'Please fill all the data';
        this.snackbarColor = 'error';
        return;
      }
      var documentData = {
        "userId": this.clientData.userId,
        "userNumberId": this.numberId,
        "docType": this.docTypeSelected.label,
        "item": this.folderUUID,
        "processDate": this.today,
        "expirationDate": this.formatedDate
      }
      this.$router.push({ name: 'validateDocument', params: { documentData: documentData } })
    }
  }
}
</script>
