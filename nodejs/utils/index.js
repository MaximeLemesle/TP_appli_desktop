import "dotenv/config";

export const accountGetTransaction = async (address) => {
  const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${process.env.ETHER_SCAN_API_KEY}`;
  const response = await fetch(url);
  const json = await response.json();
  return {
    haveTransation:
      json.message !== "No transactions found" &&
      json.result !== "Max rate limit reached",
    transaction: json.result,
  };
};

export const accountGetBalance = async (address) => {
  const url = `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${process.env.ETHER_SCAN_API_KEY}`;
  const response = await fetch(url);
  const json = await response.json();
  return json.result / 1e18;
};
