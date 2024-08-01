import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';
import fs from 'fs/promises';
import path from 'path';

async function genWallet(amount) {
    const walletsFilePath = path.join(process.cwd(), 'walletsList.json');
    const wallets = [];

    for (let i = 0; i < amount; i++) {
        const keyPair = Keypair.generate();

        const walletData = {
            [`Wallet ${i + 1}`]: {
                address: keyPair.publicKey.toString(),
                privateKey: bs58.encode(keyPair.secretKey)
            }
        };

        wallets.push(walletData);
        console.log(`Wallet ${i + 1} generated.`);
    }

    await fs.writeFile(walletsFilePath, JSON.stringify(wallets, null, 2));
    console.log('All wallets generated successfully.\n\n');
}

export default genWallet;
