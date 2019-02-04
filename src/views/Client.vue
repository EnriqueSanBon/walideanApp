<template>
<v-layout align-center justify-space-around row fill-height wrap>
  <v-flex xs12 sm4>
    <v-layout column align-center>
      <v-flex xs12>
        <ProviderBalance />
        <br>
        <ClientInfo />
        <br>
      </v-flex>
      <v-btn round color="secondary" class="primary--text" @click="$router.push('/uploadFile')" dark>Upload File</v-btn>
    </v-layout>
  </v-flex>
  <v-flex xs12 sm8>
    <ClientDocumentsTable />
  </v-flex>
</v-layout>
</template>

<script>
import ClientInfo from '../components/GenericComponents/ClientInfo'
import ClientDocumentsTable from '../components/ClientComponents/ClientDocumentsTable'
import ProviderBalance from '../components/ClientComponents/ProviderBalance'

export default {
  components: { ClientInfo, ClientDocumentsTable, ProviderBalance },
  mounted() {}
}
</script>
