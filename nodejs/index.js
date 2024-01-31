import fs from "fs";
import { Mnemonic, randomBytes } from "ethers";
import { accountGetTransaction, accountGetBalance } from "./utils/index.js";
import "dotenv/config";

setInterval(async () => {
  const bytes = randomBytes(24);
  const { phrase, entropy } = Mnemonic.fromEntropy(bytes);
  const { haveTransation, transaction } = await accountGetTransaction(entropy);
  const wallet = haveTransation ? await accountGetBalance(entropy) : 0;
}, 1000);
