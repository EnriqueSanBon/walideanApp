<template>
<v-layout align-center justify-space-around row fill-height wrap>
  <v-flex xs12 md8>
    <ValidateDocumentForm :documentData="documentData" />
  </v-flex>
</v-layout>
</template>

<script>
import ValidateDocumentForm from '../components/ValidateDocumentComponents/ValidateDocumentForm'

export default {
  components: {
    ValidateDocumentForm
  },
  props: ["documentData"]
}
</script>
