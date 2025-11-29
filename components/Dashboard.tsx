'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { useState, useEffect } from 'react'
import { ShadowWireClient } from '@radr/shadowwire'
import { TransferForm } from './TransferForm'
import { BalanceCard } from './BalanceCard'
import { DepositForm } from './DepositForm'
import { WithdrawForm } from './WithdrawForm'

const SUPPORTED_TOKENS = ['SOL', 'USDC', 'ORE', 'BONK', 'JIM', 'GODL'] as const
type Token = typeof SUPPORTED_TOKENS[number]
type ActiveTab = 'deposit' | 'withdraw' | 'transfer'

export function Dashboard() {
  const { publicKey, connected } = useWallet()
  const [client] = useState(() => new ShadowWireClient({ debug: true }))
  const [selectedToken, setSelectedToken] = useState<Token>('SOL')
  const [balance, setBalance] = useState<{ available: number; pool_address: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<ActiveTab>('deposit')

  const fetchBalance = async () => {
    if (!publicKey) return
    
    setLoading(true)
    setError(null)
    
    try {
      const bal = await client.getBalance(publicKey.toString(), selectedToken)
      setBalance(bal)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch balance')
      console.error('Balance fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (connected && publicKey) {
      fetchBalance()
    }
  }, [connected, publicKey, selectedToken])

  if (!connected || !publicKey) {
    return null
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h2 className="text-3xl font-bold mb-2">Welcome back</h2>
          <p className="text-gray-400">
            Wallet: {publicKey.toString().slice(0, 4)}...{publicKey.toString().slice(-4)}
          </p>
        </div>

        {/* Token Selector */}
        <div className="bg-dark-card border border-dark-border rounded-2xl p-6">
          <label className="block text-sm font-medium text-gray-400 mb-3">
            Select Token
          </label>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            {SUPPORTED_TOKENS.map((token) => (
              <button
                key={token}
                onClick={() => setSelectedToken(token)}
                className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                  selectedToken === token
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'bg-dark-bg border border-dark-border text-gray-400 hover:border-purple-600'
                }`}
              >
                {token}
              </button>
            ))}
          </div>
        </div>

        {/* Balance Card */}
        <BalanceCard
          token={selectedToken}
          balance={balance}
          loading={loading}
          error={error}
          onRefresh={fetchBalance}
        />

        {/* Action Tabs */}
        <div className="bg-dark-card border border-dark-border rounded-2xl p-2">
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setActiveTab('deposit')}
              className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                activeTab === 'deposit'
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                  : 'text-gray-400 hover:bg-dark-bg'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Deposit</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('withdraw')}
              className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                activeTab === 'withdraw'
                  ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg'
                  : 'text-gray-400 hover:bg-dark-bg'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
                <span>Withdraw</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('transfer')}
              className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                activeTab === 'transfer'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                  : 'text-gray-400 hover:bg-dark-bg'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12M8 12h12M8 17h12M4 7h.01M4 12h.01M4 17h.01" />
                </svg>
                <span>Transfer</span>
              </div>
            </button>
          </div>
        </div>

        {/* Active Form */}
        {activeTab === 'deposit' && (
          <DepositForm
            client={client}
            walletAddress={publicKey.toString()}
            selectedToken={selectedToken}
            onDepositComplete={fetchBalance}
          />
        )}

        {activeTab === 'withdraw' && (
          <WithdrawForm
            client={client}
            walletAddress={publicKey.toString()}
            selectedToken={selectedToken}
            currentBalance={balance?.available || 0}
            onWithdrawComplete={fetchBalance}
          />
        )}

        {activeTab === 'transfer' && (
          <TransferForm
            client={client}
            senderWallet={publicKey.toString()}
            selectedToken={selectedToken}
            currentBalance={balance?.available || 0}
            onTransferComplete={fetchBalance}
          />
        )}
      </div>
    </div>
  )
}

