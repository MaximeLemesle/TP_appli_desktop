import { ethers } from 'https://cdn.ethers.io/lib/ethers-5.2.esm.min.js'

const englishWords = ethers.wordlists.en

for (const word of englishWords) {
  console.log(word)
}
