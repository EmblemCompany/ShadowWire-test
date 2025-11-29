# ShadowWire App

Private payments on Solana using zero-knowledge proofs.

## Features

- **Private Transfers** - Hide transaction amounts using Bulletproofs
- **Multi-Token Support** - SOL, USDC, ORE, BONK, JIM, GODL
- **Multiple Wallets** - Phantom, Solflare, Torus, Ledger
- **Deposit & Withdraw** - Seamlessly manage your ShadowWire balance
- **Fast & Secure** - Built on Solana with audited smart contracts

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure RPC Endpoint

Copy the example environment file:

```bash
cp .env.example .env.local
```

Then edit `.env.local` and add your Solana RPC endpoint:

```env
NEXT_PUBLIC_RPC_URL=https://your-rpc-endpoint.com
```

**RPC Provider Options:**
- **Helius**: `https://mainnet.helius-rpc.com/?api-key=YOUR_API_KEY` - [Get free API key](https://helius.dev)
- **Alchemy**: `https://solana-mainnet.g.alchemy.com/v2/YOUR_API_KEY` - [Get free API key](https://alchemy.com)
- **QuickNode**: `https://YOUR_ENDPOINT.solana-mainnet.quiknode.pro/YOUR_API_KEY/` - [Get free API key](https://quicknode.com)
- **Custom**: Any Solana RPC endpoint

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## How to Use

### Connect Wallet
Click "Select Wallet" and choose your preferred Solana wallet (Phantom, Solflare, etc.)

### Deposit
1. Click the **Deposit** tab
2. Enter amount to deposit
3. Approve transaction in your wallet
4. Wait for confirmation

### Withdraw
1. Click the **Withdraw** tab
2. Enter amount (or click "Max")
3. Approve transaction in your wallet
4. Funds return to your wallet

### Transfer
1. Click the **Transfer** tab
2. Choose transfer type:
   - **Private (Internal)** - Amount completely hidden (requires both users on ShadowWire)
   - **Public (External)** - Amount visible, sender anonymous (works with any wallet)
3. Enter recipient address
4. Enter amount
5. Send payment

## Supported Tokens

| Token | Decimals |
|-------|----------|
| SOL   | 9        |
| USDC  | 6        |
| ORE   | 11       |
| BONK  | 5        |
| JIM   | 9        |
| GODL  | 11       |

## Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **Blockchain**: Solana Web3.js
- **Wallet**: Solana Wallet Adapter
- **Privacy**: @radr/shadowwire SDK

## Customization

### Supporting Only Specific Tokens

By default, the app supports all ShadowWire tokens (SOL, USDC, ORE, BONK, JIM, GODL). To limit to specific tokens:

1. Open `components/Dashboard.tsx`
2. Modify the `SUPPORTED_TOKENS` array:

```typescript
// Support only SOL
const SUPPORTED_TOKENS = ['SOL'] as const

// Support only ORE
const SUPPORTED_TOKENS = ['ORE'] as const

// Support SOL and USDC only
const SUPPORTED_TOKENS = ['SOL', 'USDC'] as const
```

The token selector will automatically update to show only your chosen tokens.

## Environment Variables

- `NEXT_PUBLIC_RPC_URL` - Solana RPC endpoint (required) - Works with any RPC provider (Helius, Alchemy, QuickNode, etc.)

## Security

- Client-side wallet connection
- No private keys stored
- All transactions signed by your wallet
- Audited smart contracts
- Zero-knowledge proofs for privacy

## Fees

- 1% relayer fee on transfers
- Standard Solana transaction fees

## Get Help

Telegram: https://t.me/radrportal
Twitter: https://x.com/radrdotfun
Email: hello@radrlabs.io

## License

MIT

