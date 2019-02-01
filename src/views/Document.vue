<template>
<v-layout align-center justify-space-around row fill-height wrap>
  <v-flex xs12 sm8>
    <v-layout column wrap align-center>
      <DocumentInfo />
    </v-layout>
  </v-flex>
</v-layout>
</template>


<script>
import DocumentInfo from '../components/DocumentComponents/DocumentInfo'

export default {
  components: { DocumentInfo },
}
</script>
