const { Mnemonic, randomBytes } = ethers

const renderAccountsFoundCount = document.querySelector('#account-found')
const renderAccountsWithoutTransationCount = document.querySelector('#accounts-without-transaction')
const renderAccountsWithTransationCount = document.querySelector('#accounts-with-transaction')

const table = document.querySelector('#table')

const startBtn = document.querySelector('#start-btn')

let start = false
let accountsFound = 0
let accountsWithTransaction = 0
let accountsWithoutTransaction = 0
let intervalId

const accountHaveTransaction = async (address) => {
  const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=CH99TUEU5VEXK58Y38DYIM1RUQZSMCYDP4`
  const response = await fetch(url)
  const json = await response.json()
  return json.message !== 'No transactions found'
}

const accountGetBalance = async (address) => {
  const url = `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=CH99TUEU5VEXK58Y38DYIM1RUQZSMCYDP4`
  const response = await fetch(url)
  const json = await response.json()
  return json.result / 1e18
}

const addRowToTable = (table, phrase, walletAdress, walletAmount, transaction) => {
  const newRow = table.insertRow(0)
  const cell1 = newRow.insertCell(0)
  const cell2 = newRow.insertCell(1)
  const cell3 = newRow.insertCell(2)
  const cell4 = newRow.insertCell(3)

  cell1.innerHTML = phrase
  cell2.innerHTML = walletAdress
  cell3.innerHTML = walletAmount
  cell4.innerHTML = transaction
}

startBtn.addEventListener('click', () => {
  start = !start
  startBtn.textContent = start ? 'Stop' : 'Start'

  let transaction = false

  const updateUI = () => {
    renderAccountsFoundCount.textContent = accountsFound
    renderAccountsWithTransationCount.textContent = accountsWithTransaction
    renderAccountsWithoutTransationCount.textContent = accountsWithoutTransaction
  }

  const processAccount = async () => {
    const { phrase, entropy } = Mnemonic.fromEntropy(randomBytes(16))
    const wallet = await accountGetBalance(entropy)
    accountsFound++

    if (wallet) {
      transaction = await accountHaveTransaction(entropy)
      transaction ? accountsWithTransaction++ : accountsWithoutTransaction++
    } else accountsWithoutTransaction++
    addRowToTable(table, phrase, entropy, wallet, transaction)
    updateUI()
  }

  if (start) intervalId = setInterval(processAccount, 1000)
  else clearInterval(intervalId)
})

window.addEventListener('dom-ready', () => {
  const uaArr = window.getUserAgent().split(' ')
  const newUaArr = uaArr.filter((uar) => !uar.startsWith('Electron'))
  window.setUserAgent(newUaArr.join(' '))
})
