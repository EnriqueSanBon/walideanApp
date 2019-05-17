<template>
<div>
  <v-progress-linear v-if="gridData.length==0 && !noDataFlag" :indeterminate="true"></v-progress-linear>
  <h3>Current Documents</h3>
  <v-data-table :headers="headers" :items="newDocuments" class="elevation-1" color='primary'>
    <template slot="no-data">
      <v-alert :value="noDataFlag" color="error" icon="warning">
        {{emptyTableText}}
      </v-alert>
    </template>
    <template slot="items" slot-scope="props">
      <td>{{ props.item.docType }}</td>
      <td class="text-xs">{{props.item.id}}</td>
      <td class="text-xs">{{ props.item.expirationDateString }}</td>
      <td class="text-xs">{{ props.item.processDateString }}</td>
      <td class="justify-center layout px-0">
        <v-btn v-if="!docsPurchased.includes(props.item.id)" icon @click="openModal(props.item.id, props.item.docType)">
          <v-icon>
            mobile_friendly
          </v-icon>
        </v-btn>
        <v-dialog v-model="dialog" persistent max-width="290">
          <v-card>
            <v-card-title class="headline">Purchase this document?</v-card-title>
            <v-card-text>You will pay 5 WLD to the owner of the document.</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat @click="dialog = false">Disagree</v-btn>
              <v-btn color="green darken-1" flat @click="purchaseDocument(selectedDocId)">Agree</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-btn icon v-if="docsPurchased.includes(props.item.id)" @click="navigateToVal(props.item.id)">
          <v-icon color="primary">
            mobile_friendly
          </v-icon>
        </v-btn>
      </td>
    </template>
  </v-data-table>
  <h3>Expired Documents</h3>
  <v-data-table :headers="headers" :items="oldDocuments" class="elevation-1" color='primary'>
    <template slot="no-data">
      <v-alert :value="noDataFlag" color="error" icon="warning">
        {{emptyTableText}}
      </v-alert>
    </template>
    <template slot="items" slot-scope="props">
      <td>{{ props.item.docType }}</td>
      <td class="text-xs">{{props.item.id}}</td>
      <td class="text-xs">{{ props.item.expirationDateString }}</td>
      <td class="text-xs">{{ props.item.processDateString }}</td>
      <td class="justify-center layout px-0">
        <v-btn v-if="!docsPurchased.includes(props.item.id)" icon @click="openModal(props.item.id, props.item.docType)">
          <v-icon>
            mobile_friendly
          </v-icon>
        </v-btn>
        <v-dialog v-model="dialog" persistent max-width="290">
          <v-card>
            <v-card-title class="headline">Purchase this document?</v-card-title>
            <v-card-text>You will pay 5 WLD to the owner of the document.</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat @click="dialog = false">Disagree</v-btn>
              <v-btn color="green darken-1" flat @click="purchaseDocument(selectedDocId)">Agree</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-btn icon v-if="docsPurchased.includes(props.item.id)" @click="navigateToVal(props.item.id)">
          <v-icon color="primary">
            mobile_friendly
          </v-icon>
        </v-btn>
      </td>
    </template>
  </v-data-table>
  <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="6000">
    {{ snackbarText }}
    <v-btn dark flat @click="snackbar = false">
      Close
    </v-btn>
  </v-snackbar>
</div>
</template>

<script>
import {
  mapState
} from 'vuex';
import axios from 'axios';
import consts from '../../consts.js';
import firebase from "firebase";
export default {
  computed: mapState(['clientData', 'docsPurchased', 'token', 'ethAddress']),
  components: {},
  mounted() {
    if (!this.clientData) {
      this.$router.push('/ClientDataRequest');
    }
    this.getDocuments();
  },
  data() {
    return {
      searchQuery: '',
      firebaseDocumentId: '',
      gridData: [],
      oldDocuments: [],
      newDocuments: [],
      emptyTableText: 'Sorry, nothing to display here :(',
      headers: [{
          text: 'Document type',
          align: 'left',
          value: 'docType'
        },
        {
          text: 'Id',
          align: 'left',
          value: 'id'
        },
        {
          text: 'Expiration Date',
          value: 'expirationDateString'
        },
        {
          text: 'Process Date',
          value: 'processDateString'
        },
        {
          text: 'Actions',
          align: 'center',
          sorteable: false,
          value: 'name'
        }
      ],
      dialog: false,
      abi: consts.abi,
      contractAddress: consts.contractAddress,
      snackbarText: 'Error',
      snackbarColor: 'error',
      snackbar: false,
      selectedDocId: null,
      selectedDocType: null,
      noDataFlag: false
    }
  },
  methods: {
    navigateToVal: function(id) {
      this.$router.push('/document/' + id + '/validations');
    },
    duplicateBucket: function(srcFilename, destFilename) {
      console.log("funcion duplicate buckets");
      console.log(srcFilename);
      console.log(destFilename);
      var createCopyBucket = firebase.functions().httpsCallable('createCopyBucket');
      createCopyBucket({
        destFilename: destFilename,
        srcFilename: srcFilename
      }).then(function(result) {
        console.log("resultado cloud function");
        console.log(result.data.text);
      });
    },
    duplicateFile(storageUrl) {
      console.log("Consulta direcciones");
      console.log(storageUrl);
      var context = this;
      var firestore = firebase.firestore();
      var documentsRef = firestore.collection("documents");
      documentsRef.doc(storageUrl).get()
        .then((documentSnapshot) => {
          console.log("Document Snapshot");
          console.log(documentSnapshot);
          console.log(documentSnapshot.data());
          var document = documentSnapshot.data();
          if (document != null) {
            context.urls = document.files
            this.urls.forEach(function(url) {
              return context.duplicateBucket(response.data.item, response.data.item + '/' + user.uid + '/' + url);

            });
          } else {
            console.log("error");
          }
        })
    },
    openModal(selectedDocId, selectedDocType) {
      this.dialog = true;
      this.selectedDocId = selectedDocId;
      this.selectedDocType = selectedDocType;
    },
    getDocuments() {
      let config = {
        headers: {
          'securityCode': this.token
        },
        withCredentials: true
      }
      axios.get(consts.ipPVIService + 'resources/users/' + this.clientData.userId + '/documents/', config)
        .then((response) => {
          const today = new Date().toISOString().substr(0, 10).replace(/-/g, "")
          this.gridData = response.data.documents.map(element => {
            element.expirationDateString = [element.expirationDate.toString().slice(0, 4), "-", element.expirationDate.toString().slice(4, 6), "-", element.expirationDate.toString().slice(6)].join('');
            element.processDateString = [element.processDate.toString().slice(0, 4), "-", element.processDate.toString().slice(4, 6), "-", element.processDate.toString().slice(6)].join('');
            return element
          });
          console.log(this.gridData);
          this.oldDocuments = this.gridData.filter(document => document.expirationDate < today)
          this.newDocuments = this.gridData.filter(document => document.expirationDate > today)
          if (response.data.documents.length == 0) {
            this.noDataFlag = true;
            this.emptyTableText = "No documents for this user"
          }
        })
        .catch((response) => {
          if (response.message === "Network Error") {
            this.noDataFlag = true;
            this.emptyTableText = "Network Error: please check connection"
          } else {
            this.noDataFlag = true;
            this.emptyTableText = "No documents for this user"
          }
        })
    },
    purchaseDocumentTransaction(ownerAdress, documentPurchasedId) {
      var context = this;
      var firestore = firebase.firestore();
      var accessHistoryRef = firestore.collection("accessHistory");
      var providersRef = firestore.collection("providers");
      var documentsRef = firestore.collection("documents").doc(this.firebaseDocumentId);
      var user = firebase.auth().currentUser;
      if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try { // Solicitar autorización a MetaMask (si fuese necesario)
          ethereum.enable().then(() => {
            // Instanciar el contrato de moneda Walidean (se necesita el ABI y dirección de contrato)
            var walideanABI = web3.eth.contract(this.abi);
            var walidean = walideanABI.at(this.contractAddress);
            // Eviar 10 WLD a la cuenta 0x43130D4f565fe9D9b06280617b51B634795B9583
            walidean.transfer('0x' + ownerAdress, 5, function(error, result) {
              if (!error) {
                context.$store.dispatch('addDocAsync', documentPurchasedId).then(() => {
                  // Add a new document in collection "cities"
                  accessHistoryRef.doc().set({
                      date: firebase.firestore.FieldValue.serverTimestamp(),
                      documentId: documentPurchasedId,
                      documentType: context.selectedDocType,
                      providerId: context.$store.state.providerId,
                      userId: context.$store.state.clientData.userId
                    })
                    .then(() => {
                      console.log("Se modifica firestore");
                      return documentsRef.get()
                    })
                    .then((doc) => {
                      console.log("El valor de allowed users es:");
                      console.log(doc.data().allowedUsers);
                      var allowedUsers = doc.data().allowedUsers
                      if (!allowedUsers.includes(user.uid)) {
                        console.log("el usuario actual no estaba en allowed Users");
                        console.log("Se modifica firestore");
                        allowedUsers.push(user.uid)
                        console.log("New allowed Users");
                        console.log(allowedUsers);
                        return documentsRef.update({
                          allowedUsers: allowedUsers
                        })
                      } else {
                        console.log("AllowedUsers ya contenia el usuario actual");
                        console.log("usuario actual");
                        console.log(user.uid);
                        console.log("AllowedUsers");
                        console.log(doc.data().allowedUsers);
                      }
                    })
                    .then(() => {
                      console.log("Document successfully written!");
                      let config = {
                        headers: {
                          'securityCode': context.token
                        },
                        withCredentials: true
                      }
                      console.log("la llamada que falla es");
                      console.log(consts.ipPVIService + 'resources/users/' + context.clientData.userId + '/documents/' + documentPurchasedId);
                      return axios.get(consts.ipPVIService + 'resources/users/' + context.clientData.userId + '/documents/' + documentPurchasedId, config)
                        .then((response) => {
                          console.log("Document Info");
                          console.log(response.data);
                          if (!response.data.item) {
                            console.log("No storage pointer");
                          } else {
                            var user = firebase.auth().currentUser;
                            var query = providersRef.where("pviId", "==", response.data.providerId);
                            console.log("la query es");
                            console.log(query);
                            return context.duplicateFiles(response.data.item + '/' + user.uid)
                          }
                        })
                        .then(() => {
                          context.navigateToVal(documentPurchasedId);
                        })
                    })
                    .catch(function(error) {
                      console.error("Error writing document: ", error);
                      context.navigateToVal(documentPurchasedId);
                    });
                  //pasar al siguiente modulo
                })
              } else {
                context.snackbar = true;
                context.snackbarText = 'Error: operation not confirmed';
                context.dialog = false;
              }
            });
          })
          // Si ocurre algún problema dentro del try (autorización / acceso MetaMask principalmente)
        } catch (error) {
          context.snackbar = true;
          context.color = 'error';
          context.snackbarText = error;
          context.dialog = false;
        } // En caso de que falle el primer if, es que MetaMask no está installado
      } else {
        context.snackbar = true;
        context.color = 'error';
        context.snackbarText = 'MetaMask is not installed';
      }
    },
    purchaseDocument(documentPurchasedId) {
      var context = this;
      var firestore = firebase.firestore();
      var accessHistoryRef = firestore.collection("accessHistory");
      var providersRef = firestore.collection("providers");
      let config = {
        headers: {
          'securityCode': this.token
        },
        withCredentials: true
      }
      axios.get(consts.ipPVIService + 'resources/users/' + this.clientData.userId + '/documents/' + documentPurchasedId, config)
        .then((response) => {
          console.log("Documento consultado");
          console.log(response.data);
          context.firebaseDocumentId = response.data.item
          providersRef.where("pviId", "==", parseInt(response.data.providerId)).get().then((querySnapshot) => {
            if (querySnapshot.size == 1) {
              querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                if (context.ethAddress.toLowerCase() == doc.data().ethAddress.toLowerCase()) {
                  accessHistoryRef.doc().set({
                      date: firebase.firestore.FieldValue.serverTimestamp(),
                      documentId: documentPurchasedId,
                      documentType: context.selectedDocType,
                      providerId: context.$store.state.providerId,
                      userId: context.$store.state.clientData.userId
                    })
                    .then(function() {
                      console.log("Document successfully written!");
                      context.navigateToVal(documentPurchasedId);
                    })
                    .catch(function(error) {
                      console.error("Error writing document: ", error);
                      context.navigateToVal(documentPurchasedId);
                    });
                } else {
                  context.purchaseDocumentTransaction(doc.data().ethAddress, documentPurchasedId)
                }
              });
            } else {
              throw "Provider not found";
            }
          })
        }).catch((response) => {
          if (response.message === "Network Error") {
            context.snackbar = true;
            context.snackbarText = 'Network Error';
            context.dialog = false;
          } else {
            context.snackbar = true;
            context.snackbarText = 'Error: ' + response.status;
            context.dialog = false;
          }
        })
    }
  }
}
</script>
