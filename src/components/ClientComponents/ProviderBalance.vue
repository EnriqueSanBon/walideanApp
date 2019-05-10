<template>
<div>
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
  <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="15000">
    {{ snackbarText }}
    <v-btn dark flat @click="snackbar = false">
      Close
    </v-btn>
  </v-snackbar>
</div>
</template>

<script>
import axios from 'axios';
import consts from '../../consts.js';
import { mapState } from 'vuex';

export default {
  components: {},
  mounted() {
    this.getETHBalance();
    this.getWLDBalance();
    if (window.ethereum) {
      this.metamaskState = true
    } else {
      context.snackbarColor = 'error';
      context.snackbarText = 'MetaMask is not installed or not enabled';
      context.snackbar = true;
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
      contractAddress: consts.contractAddress,
      snackbar: false,
      snackbarText: 'Error',
      snackbarColor: 'error'
    }
  },
  computed: {
    ...mapState(['ethAddress']),

    animatedETH: function() {
      return this.tweenedETH.toFixed(5);
    },
    animatedWLD: function() {
      return this.tweenedWLD.toFixed(0);
    },
    animatedCirculationWLD: function() {
      return this.tweenedCirculationWLD.toFixed(0);
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
          'address': '0x' + this.ethAddress
        }
      }).then((response) => {
        context.ethBalance = response.data.result / Math.pow(10, 18);
      })
    },
    getWLDBalance() {
      var context = this
      axios.get('https://api-ropsten.etherscan.io/api', {
        params: {
          'module': 'account',
          'action': 'tokenbalance',
          'address': '0x' + this.ethAddress,
          'contractaddress': this.contractAddress
        }
      }).then((response) => {
        context.wldBalance = response.data.result;
      })
    },
    getTotalWalies() {
      var context = this;
      window.web3 = new Web3(ethereum);
      ethereum.enable().then(() => {
        var walideanABI = web3.eth.contract(this.abi);
        var walidean = walideanABI.at(this.contractAddress);
        walidean.totalSupply(function(error, result) {
          if (!error) {
            context.circulationWLD = result.c[0];
          } else {
            context.snackbarColor = 'error';
            context.snackbarText = error;
            context.snackbar = true;
          }
        })
      })
    },
  }
}
</script>
