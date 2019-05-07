<template>
<v-layout align-center justify-space-around row fill-height wrap>
  <v-flex xs12 sm4>
    <AccessTable />
  </v-flex>
  <v-flex xs12 sm7>
    <UserDocumentsTable />
  </v-flex>
</v-layout>
</template>
<script>
import AccessTable from '../components/UserPanelComponents/AccessTable'
import UserDocumentsTable from '../components/UserPanelComponents/UserDocumentsTable'
export default {
  components: {
    AccessTable,
    UserDocumentsTable
  }
}
</script>
