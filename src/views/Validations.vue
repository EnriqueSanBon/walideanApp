<template>
<v-layout align-center justify-space-around row fill-height wrap>
  <v-flex xs12 sm8>
    <v-layout column wrap align-center>
      <ValidationsTable />
    </v-layout>
  </v-flex>
</v-layout>
</template>


<script>
import ValidationsTable from '../components/ValidationsComponent/ValidationsTable'

export default {
  components: { ValidationsTable },
}
</script>
