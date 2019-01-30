<template>
<v-layout align-center justify-space-around row fill-height wrap>
  <v-flex xs12 sm4>
    <v-layout column wrap align-center>
      <ClientInfo />
      <v-btn round color="secondary" class="primary--text" @click="$router.push('/uploadFile')" dark>Upload File</v-btn>
    </v-layout>
  </v-flex>
  <v-flex xs12 sm8>
    <ClientDocumentsTable />
  </v-flex>
</v-layout>
</template>

<script>
import ClientInfo from '../components/ClientInfo'
import ClientDocumentsTable from '../components/ClientDocumentsTable'

export default {
  components: { ClientInfo, ClientDocumentsTable },
}
</script>
