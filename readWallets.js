import { readFile } from 'fs/promises';
import { join } from 'path';
import bs58 from 'bs58';
import { Keypair } from '@solana/web3.js';

async function loadWallets() {
    const walletsFilePath = join(process.cwd(), 'walletsList.json');
    const data = await readFile(walletsFilePath, 'utf-8');
    const walletsJson = JSON.parse(data);

    const wallets = walletsJson.map(walletObject => {
        const walletKey = Object.keys(walletObject)[0];
        const { address, privateKey } = walletObject[walletKey];
        const keypair = Keypair.fromSecretKey(bs58.decode(privateKey.trim()));

        return {
            pubKey: address.trim(),
            privKey: privateKey.trim(),
            keypair
        };
    });

    return wallets;
}

export default loadWallets;
