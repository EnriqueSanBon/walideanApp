<template>
<v-layout align-center justify-space-around row fill-height wrap>
  <v-flex xs12 sm4>
    <v-layout column wrap align-center>
      <clientInfo />
    </v-layout>
  </v-flex>
  <v-flex xs12 sm8>
    <documentForm />
  </v-flex>
</v-layout>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
import ClientInfo from '../components/ClientInfo'
import DocumentForm from '../components/DocumentForm'
export default {
  components: { ClientInfo, DocumentForm },
  mounted() {},
  data() {
    return {}
  },
  methods: {}
}
</script>
