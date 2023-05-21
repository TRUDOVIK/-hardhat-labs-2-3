// Импорт библиотеки Web3.js
const Web3 = require('web3');
require("dotenv").config(".env");

const privateKey = process.env.PRIVATE_KEY;
const endpoint = process.env.URL;
const etherscanKey = process.env.ETHERSCAN_KEY;
// Создание экземпляра объекта Web3, указывая провайдер для сети Sepolia
const web3 = new Web3(endpoint);

// Адрес смарт-контракта
const contractAddress = '0xf4Ff6842D0418394db311443D160404b2D8bcBBD';

// ABI (Application Binary Interface) контракта - описание функций контракта
const contractABI = [
    {
        name: 'addOwnerInformation',
        type: 'function',
        inputs: [
          { name: '_key', type: 'bytes32' },
          { name: '_name', type: 'string' },
          { name: '_age', type: 'uint256' },
          { name: '_balance', type: 'uint256' }
        ],
        outputs: []
      },
      {
        name: 'removeOwnerInformation',
        type: 'function',
        inputs: [
          { name: '_key', type: 'bytes32' }
        ],
        outputs: []
      },
      {
        name: 'getOwnerInformation',
        type: 'function',
        inputs: [
          { name: '_key', type: 'bytes32' }
        ],
        outputs: [
          { name: 'ownerName', type: 'string' },
          { name: 'age', type: 'uint256' },
          { name: 'balance', type: 'uint256' }
        ]
      }
    ];
    

// Создание экземпляра контракта на основе адреса и ABI
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Функция для запроса событий по адресу и фильтру
function getEventsByAddressAndFilter(address, eventFilter) {
  return new Promise((resolve, reject) => {
    contract.getPastEvents(eventFilter, { fromBlock: 0, toBlock: 'latest', filter: { address: address } })
      .then((events) => {
        resolve(events);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// Пример использования функции getEventsByAddressAndFilter
const addressToQuery = privateKey;
const eventFilterToQuery = { event: 'OwnerInformationAdded' };

getEventsByAddressAndFilter(addressToQuery, eventFilterToQuery)
  .then((events) => {
    console.log('Events:', events);
  })
  .catch((error) => {
    console.error('Error:', error);
  });