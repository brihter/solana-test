const fs = require('fs').promises
const esb = require('esbuild')

const adapter = [
  'PhantomWalletAdapter',
  'GlowWalletAdapter', 
  'SlopeWalletAdapter', 
  'SolflareWalletAdapter', 
  'SolletExtensionWalletAdapter', 
  'BitKeepWalletAdapter',
  'BitpieWalletAdapter',
  'CloverWalletAdapter',
  'Coin98WalletAdapter',
  'CoinhubWalletAdapter',
  // 'HuobiWalletAdapter',
  'MathWalletAdapter',
  'SafePalWalletAdapter',
  'SolongWalletAdapter',
  'TokenPocketWalletAdapter',
  'TorusWalletAdapter',
  'LedgerWalletAdapter',
  'SolletWalletAdapter', 
  'BloctoWalletAdapter'
]

const createFile = async (adapterName) => {
  await fs.writeFile(`adapters/${adapterName}.js`, `
    import { ${adapterName} as adapter } from '@solana/wallet-adapter-wallets'
    console.log(new adapter({ network: {} }))
  `)
}

const buildFile = async (adapterName) => {
  await esb.build({
    entryPoints: [`adapters/${adapterName}.js`],
    bundle: true,
    minify: true,
    legalComments: 'none',
    outfile: `adapters/${adapterName}.min.js`
  })
}

const main = async () => {
  await Promise.all(adapter.map(createFile))
  await Promise.all(adapter.map(buildFile))
}

main().catch(console.error)
