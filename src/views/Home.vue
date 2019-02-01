<template>
<v-layout align-center justify-space-around row fill-height wrap>
  <v-flex xs12 md4>
    <SideInfo />
  </v-flex>
  <v-flex xs12 md8>
    <Login />
  </v-flex>
</v-layout>
</template>

<script>
import Login from '../components/LoginComponents/Login'
import SideInfo from '../components/LoginComponents/SideInfo'

export default {
  components: {
    Login,
    SideInfo
  }
}
</script>
