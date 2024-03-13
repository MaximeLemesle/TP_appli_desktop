import fs from "fs";

import { Mnemonic, randomBytes } from "ethers";
import {
  accountGetTransaction,
  accountGetBalance,
  sleep,
} from "./utils/index.js";
import "dotenv/config";

let choice = 24;

for (let i = 0; i < 1; i++) {
  const bytesWithoutLast = randomBytes(choice).slice(0, -1);
  for (let y = 0; y < 2054; y++) {
    const bytes = Uint8Array.from([...bytesWithoutLast].concat(y));
    const { phrase, entropy } = Mnemonic.fromEntropy(bytes);
    const { haveTransation, transaction } = await accountGetTransaction(
      entropy
    );
    const wallet = haveTransation ? await accountGetBalance(entropy) : 0;

    const jsonKey = Array.from(bytesWithoutLast).join("-");
    const jsonValue = { phrase, entropy, wallet, transaction };

    await sleep(999999999);
  }
}
