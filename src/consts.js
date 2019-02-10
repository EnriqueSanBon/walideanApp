export default {
  ipPVIService: '10.0.4.97',
  portPVIService: '8080',
  documentTypes: ['DNI', 'Sanitary', 'Laboral Life', 'Roster', 'License', 'Passport'],
  countries: ['Afganistán', 'Albania', 'Alemania', 'Andorra', 'Angola', 'AntiguayBarbuda', 'ArabiaSaudita', 'Argelia', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaiyán', 'Bahamas', 'Bangladés', 'Barbados', 'Baréin', 'Bélgica',
    'Belice', 'Benín', 'Bielorrusia', 'Birmania', 'Bolivia', 'BosniayHerzegovina', 'Botsuana', 'Brasil', 'Brunéi', 'Bulgaria', 'BurkinaFaso', 'Burundi', 'Bután', 'CaboVerde', 'Camboya', 'Camerún', 'Canadá', 'Catar', 'Chad', 'Chile',
    'China', 'Chipre', 'CiudaddelVaticano', 'Colombia', 'Comoras', 'CoreadelNorte', 'CoreadelSur', 'CostadeMarfil', 'CostaRica', 'Croacia', 'Cuba', 'Dinamarca', 'Dominica', 'Ecuador', 'Egipto', 'ElSalvador', 'EmiratosÁrabesUnidos',
    'Eritrea', 'Eslovaquia', 'Eslovenia', 'España', 'EstadosUnidos', 'Estonia', 'Etiopía', 'Filipinas', 'Finlandia', 'Fiyi', 'Francia', 'Gabón', 'Gambia', 'Georgia', 'Ghana', 'Granada', 'Grecia', 'Guatemala', 'Guyana', 'Guinea',
    'Guineaecuatorial', 'Guinea-Bisáu', 'Haití', 'Honduras', 'Hungría', 'India', 'Indonesia', 'Irak', 'Irán', 'Irlanda', 'Islandia', 'IslasMarshall', 'IslasSalomón', 'Israel', 'Italia', 'Jamaica', 'Japón', 'Jordania', 'Kazajistán', 'Kenia',
    'Kirguistán', 'Kiribati', 'Kuwait', 'Laos', 'Lesoto', 'Letonia', 'Líbano', 'Liberia', 'Libia', 'Liechtenstein', 'Lituania', 'Luxemburgo', 'Madagascar', 'Malasia', 'Malaui', 'Maldivas', 'Malí', 'Malta', 'Marruecos', 'Mauricio', 'Mauritania',
    'México', 'Micronesia', 'Moldavia', 'Mónaco', 'Mongolia', 'Montenegro', 'Mozambique', 'Namibia', 'Nauru', 'Nepal', 'Nicaragua', 'Níger', 'Nigeria', 'Noruega', 'NuevaZelanda', 'Omán', 'PaísesBajos', 'Pakistán', 'Palaos', 'Panamá',
    'PapúaNuevaGuinea', 'Paraguay', 'Perú', 'Polonia', 'Portugal', 'ReinoUnido', 'RepúblicaCentroafricana', 'RepúblicaCheca', 'RepúblicadeMacedonia', 'RepúblicadelCongo', 'RepúblicaDemocráticadelCongo', 'RepúblicaDominicana',
    'RepúblicaSudafricana', 'Ruanda', 'Rumanía', 'Rusia', 'Samoa', 'SanCristóbalyNieves', 'SanMarino', 'SanVicenteylasGranadinas', 'SantaLucía', 'SantoToméyPríncipe', 'Senegal', 'Serbia', 'Seychelles', 'SierraLeona', 'Singapur',
    'Siria', 'Somalia', 'SriLanka', 'Suazilandia', 'Sudán', 'SudándelSur', 'Suecia', 'Suiza', 'Surinam', 'Tailandia', 'Tanzania', 'Tayikistán', 'TimorOriental', 'Togo', 'Tonga', 'TrinidadyTobago', 'Túnez', 'Turkmenistán', 'Turquía',
    'Tuvalu', 'Ucrania', 'Uganda', 'Uruguay', 'Uzbekistán', 'Vanuatu', 'Venezuela', 'Vietnam', 'Yemen', 'Yibuti', 'Zambia', 'Zimbabue'
  ],
  provinces: ['ACoruña', 'Álava', 'Albacete', 'Alicante', 'Almería', 'Asturias', 'Ávila', 'Badajoz', 'IslasBaleares', 'Barcelona', 'Burgos', 'Cáceres', 'Cádiz', 'Cantabria', 'Castellón', 'CiudadReal', 'Córdoba', 'Cuenca', 'Girona', 'Granada', 'Guadalajara', 'Guipúzcoa', 'Huelva', 'Huesca', 'Jaén', 'LaRioja', 'LasPalmas', 'León', 'Lleida', 'Lugo', 'Madrid', 'Málaga', 'Murcia', 'Navarra', 'Orense', 'Palencia', 'Pontevedra', 'Salamanca', 'Segovia', 'Sevilla', 'Soria', 'Tarragona', 'SantaCruzdeTenerife', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya', 'Zamora', 'Zaragoza'],
  contractAddress: '0xAcb75E759725816629b112927220b2d664808BB2',
  abi: [{
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [{
      "name": "",
      "type": "string"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "name": "spender",
      "type": "address"
    }, {
      "name": "tokens",
      "type": "uint256"
    }],
    "name": "approve",
    "outputs": [{
      "name": "success",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{
      "name": "",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "name": "from",
      "type": "address"
    }, {
      "name": "to",
      "type": "address"
    }, {
      "name": "tokens",
      "type": "uint256"
    }],
    "name": "transferFrom",
    "outputs": [{
      "name": "success",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [{
      "name": "",
      "type": "uint8"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [],
    "name": "recoverContractBalance",
    "outputs": [{
      "name": "success",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "name": "to",
      "type": "address"
    }, {
      "name": "tokens",
      "type": "uint256"
    }],
    "name": "mint",
    "outputs": [{
      "name": "success",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "name": "tokenOwner",
      "type": "address"
    }],
    "name": "balanceOf",
    "outputs": [{
      "name": "balance",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [],
    "name": "acceptOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [{
      "name": "",
      "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [{
      "name": "",
      "type": "string"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "name": "to",
      "type": "address"
    }, {
      "name": "tokens",
      "type": "uint256"
    }, {
      "name": "docId",
      "type": "uint256"
    }],
    "name": "purchase",
    "outputs": [{
      "name": "success",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "name": "to",
      "type": "address"
    }, {
      "name": "tokens",
      "type": "uint256"
    }],
    "name": "transfer",
    "outputs": [{
      "name": "success",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "name": "spender",
      "type": "address"
    }, {
      "name": "tokens",
      "type": "uint256"
    }, {
      "name": "data",
      "type": "bytes"
    }],
    "name": "approveAndCall",
    "outputs": [{
      "name": "success",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [],
    "name": "newOwner",
    "outputs": [{
      "name": "",
      "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": true,
    "inputs": [{
      "name": "tokenOwner",
      "type": "address"
    }, {
      "name": "spender",
      "type": "address"
    }],
    "name": "allowance",
    "outputs": [{
      "name": "remaining",
      "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "name": "from",
      "type": "address"
    }, {
      "name": "to",
      "type": "address"
    }, {
      "name": "tokens",
      "type": "uint256"
    }, {
      "name": "docId",
      "type": "uint256"
    }],
    "name": "purchaseFrom",
    "outputs": [{
      "name": "success",
      "type": "bool"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "constant": false,
    "inputs": [{
      "name": "_newOwner",
      "type": "address"
    }],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "name": "_from",
      "type": "address"
    }, {
      "indexed": true,
      "name": "_to",
      "type": "address"
    }],
    "name": "OwnershipTransferred",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "name": "from",
      "type": "address"
    }, {
      "indexed": true,
      "name": "to",
      "type": "address"
    }, {
      "indexed": false,
      "name": "tokens",
      "type": "uint256"
    }, {
      "indexed": true,
      "name": "docId",
      "type": "uint256"
    }],
    "name": "Purchase",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "name": "from",
      "type": "address"
    }, {
      "indexed": true,
      "name": "to",
      "type": "address"
    }, {
      "indexed": false,
      "name": "tokens",
      "type": "uint256"
    }],
    "name": "Transfer",
    "type": "event"
  }]
}