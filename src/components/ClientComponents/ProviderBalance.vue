<template>
<v-card>
  <v-card-title>
    <h4>Account Balance</h4>
  </v-card-title>
  <v-divider></v-divider>
  <v-list dense>
    <v-list-tile>
      <v-list-tile-content class="font-weight-bold">Your gas balance is: </v-list-tile-content>
      <v-list-tile-content class="align-end">{{animatedETH}} ETH</v-list-tile-content>
    </v-list-tile>
    <v-list-tile>
      <v-list-tile-content class="font-weight-bold">Your coin balance is: </v-list-tile-content>
      <v-list-tile-content class="align-end">{{animatedWLD}} WLD</v-list-tile-content>
    </v-list-tile>
  </v-list>
</v-card>
</template>

<script>
import axios from 'axios';
export default {
  components: {},
  mounted() {
    console.log("Mounted");
    this.getETHBalance();
    this.getWLDBalance();
  },
  data() {
    return {
      ethBalance: 0,
      wldBalance: 0,
      tweenedETH: 0,
      tweenedWLD: 0
    }
  },
  computed: {
    animatedETH: function() {
      return this.tweenedETH.toFixed(5);
    },
    animatedWLD: function() {
      return this.tweenedWLD.toFixed(0);
    }
  },
  watch: {
    ethBalance: function(newValue) {
      TweenLite.to(this.$data, 1.5, { tweenedETH: newValue });
    },
    wldBalance: function(newValue) {
      TweenLite.to(this.$data, 1.5, { tweenedWLD: newValue });
    }
  },
  methods: {
    getETHBalance() {
      var context = this
      axios.get('https://api-ropsten.etherscan.io/api', {
        params: {
          'module': 'account',
          'action': 'balance',
          'address': '0x09C564205bbfdfDA1dd6F7F905BE7E44d55FFed9'
        }
      }).then((response) => {
        console.log("Saldo de ETH");
        console.log(response);
        context.ethBalance = response.data.result / Math.pow(10, 18);
      })
    },
    getWLDBalance() {
      var context = this
      axios.get('https://api-ropsten.etherscan.io/api', {
        params: {
          'module': 'account',
          'action': 'tokenbalance',
          'address': '0x09C564205bbfdfDA1dd6F7F905BE7E44d55FFed9',
          'contractaddress': '0xAcb75E759725816629b112927220b2d664808BB2'
        }
      }).then((response) => {
        console.log("Saldo de WLD");
        console.log(response);
        context.wldBalance = response.data.result;
      })
    },
  }
}
</script>
