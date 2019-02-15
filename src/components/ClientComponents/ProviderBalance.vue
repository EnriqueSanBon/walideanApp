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
    <v-list-tile>
      <v-list-tile-content class="font-weight-bold">Metamask: </v-list-tile-content>
      <template v-if="metamaskState">
        <v-list-tile-content class="align-end">Installed and available</v-list-tile-content>
        <v-icon>done</v-icon>
      </template>
      <template v-if="!metamaskState">
        <v-list-tile-content class="align-end">not installed or disabled</v-list-tile-content>
        <v-icon>warning</v-icon>
      </template>
    </v-list-tile>
    <v-list-tile>
      <v-list-tile-content class="font-weight-bold">Global amount of WLD</v-list-tile-content>
      <v-list-tile-content class="align-end">{{animatedCirculationWLD}}</v-list-tile-content>
    </v-list-tile>
  </v-list>
  <v-card-actions>
    <v-btn flat color="secondary" @click="$router.push('/Statics');">Blockchain movements</v-btn>
  </v-card-actions>
</v-card>
</template>

<script>
import axios from 'axios';
import consts from '../../consts.js';
import { mapState } from 'vuex';

export default {
  components: {},
  mounted() {
    console.log("Mounted");
    this.getETHBalance();
    this.getWLDBalance();
    if (window.ethereum) {
      this.metamaskState = true
    } else {
      console.log("MetaMask is not installed or not enabled");
    }
    this.getTotalWalies();
  },
  data() {
    return {
      ethBalance: 0,
      wldBalance: 0,
      circulationWLD: 0,
      tweenedETH: 0,
      tweenedWLD: 0,
      tweenedCirculationWLD: 0,
      metamaskState: false,
      abi: consts.abi,
      contractAddress: this.ethAddress
    }
  },
  computed: {
    animatedETH: function() {
      return this.tweenedETH.toFixed(5);
    },
    animatedWLD: function() {
      return this.tweenedWLD.toFixed(0);
    },
    animatedCirculationWLD: function() {
      return this.tweenedCirculationWLD.toFixed(0);
    },
    ethAddress: function() {
      return this.$store.state.ethAddress;
    }
  },
  watch: {
    ethBalance: function(newValue) {
      TweenLite.to(this.$data, 1.5, {
        tweenedETH: newValue
      });
    },
    wldBalance: function(newValue) {
      TweenLite.to(this.$data, 1.5, {
        tweenedWLD: newValue
      });
    },
    circulationWLD: function(newValue) {
      TweenLite.to(this.$data, 1.5, {
        tweenedCirculationWLD: newValue
      });
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
          'contractaddress': this.contractAddress
        }
      }).then((response) => {
        console.log("Saldo de WLD");
        console.log(response);
        context.wldBalance = response.data.result;
      })
    },
    getTotalWalies() {
      var context = this;
      window.web3 = new Web3(ethereum);
      ethereum.enable().then(() => {
        console.log("Acceso a metamask Correcto");
        var walideanABI = web3.eth.contract(this.abi);
        var walidean = walideanABI.at(this.contractAddress);
        walidean.totalSupply(function(error, result) {
          if (!error) {
            console.log("Respues metamask total monedas");
            console.log(result);
            context.circulationWLD = result.c[0];
          } else console.log(error);
        })
      })
    },
  }
}
</script>
