<template>
<v-layout align-center justify-space-around row fill-height wrap>
  <v-flex xs12 sm8>
    <DocumentFiles />
  </v-flex>
  <v-flex xs12 sm8>
    <ValidationsTable />
  </v-flex>
</v-layout>
</template>


<script>
import ValidationsTable from '../components/ValidationsComponent/ValidationsTable'
import DocumentFiles from '../components/ValidationsComponent/DocumentFiles'

export default {
  components: { ValidationsTable, DocumentFiles },
}
</script>
