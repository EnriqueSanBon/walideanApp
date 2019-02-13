<template>
<div>
  <v-data-table :headers="headers" :items="gridData" class="elevation-1" color='primary'>
    <template slot="items" slot-scope="props">
      <td>{{ props.item.docType }}</td>
      <td class="text-xs">{{ props.item.expirationDate }}</td>
      <td class="text-xs">{{ props.item.processDate }}</td>
      <td class="justify-center layout px-0">
        <v-dialog v-if="!docsPurchased.includes(props.item.id)" v-model="dialog" persistent max-width="290">
          <v-btn slot="activator" icon>
            <v-icon class="mr-2">
              mobile_friendly
            </v-icon>
          </v-btn>
          <v-card>
            <v-card-title class="headline">Purchase this document?</v-card-title>
            <v-card-text>You will pay 5 WLD to the owner of the document.</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" flat @click="dialog = false">Disagree</v-btn>
              <v-btn color="green darken-1" flat @click="purchaseDocument('0xB078A8db38Dfb6B298A215a92e96a7eeAfB4fF5b',props.item.id)">Agree</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-btn icon v-if="docsPurchased.includes(props.item.id)">
          <v-icon @click="navigateToVal(props.item.id)" color="primary">
            mobile_friendly
          </v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon @click="navigateToDoc(props.item.id)">
            wallpaper
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
import { mapState } from 'vuex';
import axios from 'axios';
import consts from '../../consts.js';
export default {
  computed: mapState(['clientData', 'docsPurchased']),
  components: {},
  mounted() {
    console.log("Mounted");
    this.getDocuments();
  },
  data() {
    return {
      searchQuery: '',
      gridData: [],
      headers: [
        { text: 'Document type', align: 'left', value: 'docType' },
        { text: 'Expiration Date', value: 'expirationDate' },
        { text: 'Process Date', value: 'processDate' },
        { text: 'Actions', align: 'center', sorteable: false, value: 'name' }
      ],
      dialog: false,
      abi: consts.abi,
      contractAddress: consts.contractAddress,
      snackbarText: 'Texto de prueba',
      snackbarColor: 'error',
      snackbar: false
    }
  },
  methods: {
    navigateToDoc: function(id) {
      console.log("navigateToDoc con id " + id);
      this.$router.push('/document/:' + id, () => console.log('Ruta cambiada'));
    },
    navigateToVal: function(id) {
      console.log("Validations Logo clicado");
      this.$router.push('/document/:' + id + '/validations', () => console.log('Ruta cambiada'));
    },
    getDocuments() {
      let config = {
        headers: {
          'securityCode': this.token
        }
      }
      axios.get('http://localhost:8080/PVIService/resources/users/' + this.clientData.userId + '/documents', config)
        .then((response) => {
          console.log("Consulta Documentos");
          console.log(response.data);
          this.gridData = response.data.documents;
        })
    },
    purchaseDocument(ownerAdress, documentPurchasedId) {
      var context = this;
      if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try { // Solicitar autorización a MetaMask (si fuese necesario)
          ethereum.enable().then(() => {
            // Instanciar el contrato de moneda Walidean (se necesita el ABI y dirección de contrato)
            var walideanABI = web3.eth.contract(this.abi);
            var walidean = walideanABI.at(this.contractAddress);
            // Eviar 10 WLD a la cuenta 0x43130D4f565fe9D9b06280617b51B634795B9583
            walidean.transfer(ownerAdress, 1, function(error, result) {
              if (!error) {
                console.log("Transaction hash: " + result);
                console.log(documentPurchasedId);
                context.$store.dispatch('addDocAsync', documentPurchasedId).then(() => {
                  //pasar al siguiente modulo
                  console.log("Cambiando de ruta");
                  context.navigateToVal(documentPurchasedId);
                })
              } else {
                console.log(error);
                context.snackbar = true;
                context.snackbarText = 'Error, operation not confirmed';
              }
            });
          })
          // Si ocurre algún problema dentro del try (autorización / acceso MetaMask principalmente)
        } catch (error) {
          console.log(error);
        } // En caso de que falle el primer if, es que MetaMask no está installado
      } else {
        console.log("MetaMask is not installed");
      }
    }
  }
}
</script>
