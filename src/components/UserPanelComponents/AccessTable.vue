<template>
<div>
  <h3>Access History to your Documents</h3>
  <v-data-table :headers="headers" :items="gridData" class="elevation-1" color='primary'>
    <template slot="items" slot-scope="props">
      <td class="text-xs-center">{{ props.item.date }}</td>
      <td class="text-xs-center">{{props.item.documentId}}</td>
      <td class="text-xs-center">{{ props.item.documentType }}</td>
      <td class="text-xs-center">{{ props.item.providerId }}</td>
    </template>
  </v-data-table>
</div>
</template>

<script>
import consts from '../../consts.js';
import firebase from "firebase";
export default {
  mounted() {
    this.getAccessHistory();
  },
  data() {
    return {
      gridData: [],
      headers: [{
          text: 'Date',
          align: 'center',
          value: 'date'
        },
        {
          text: 'Document Id',
          align: 'center',
          value: 'documentId'
        },
        {
          text: 'Document Type',
          align: 'center',
          value: 'documentType'
        },
        {
          text: 'Provider Id',
          align: 'center',
          value: 'providerId'
        }
      ],
    }
  },
  methods: {
    getAccessHistory() {
      var firestore = firebase.firestore();
      var providersRef = firestore.collection("accessHistory");
      var context = this;
      console.log("usuario logueado");
      console.log(this.$store.state.providerId);
      providersRef.where("userId", "==", this.$store.state.providerId).get()
        .then((querySnapshot) => {
          var context = this;
          console.log("tamaño consulta");
          console.log(querySnapshot.size);
          if (querySnapshot.size > 0) {
            console.log("transacciones encontradas");
            querySnapshot.forEach(function(doc) {
              let element = doc.data();
              var fecha = new Date(element.date.seconds * 1000)
              var day = fecha.getDate();
              var monthIndex = fecha.getMonth();
              var year = fecha.getFullYear();
              var hours = fecha.getHours();
              var minutes = fecha.getMinutes();
              minutes = minutes < 10 ? '0' + minutes : minutes;
              element.date = day + '-' + (monthIndex + 1) + '-' + year + ' ' + hours + ':' + minutes
              context.gridData.push(element);
            })
          }
        })
    }
  }
}
</script>
