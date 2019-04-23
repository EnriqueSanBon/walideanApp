<template>
<v-layout align-center justify-space-around row fill-height wrap>
  <v-flex xs12 sm8>
    <v-layout column wrap align-center>
      <AccessTable />
    </v-layout>
  </v-flex>
</v-layout>
</template>
<script>
import AccessTable from '../components/UserPanelComponents/AccessTable'
export default {
  components: {
    AccessTable
  }
}
</script>
