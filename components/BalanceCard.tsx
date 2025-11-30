'use client'

import { TokenUtils } from '@radr/shadowwire'

interface BalanceCardProps {
  token: string
  balance: { available: number; pool_address: string } | null
  loading: boolean
  error: string | null
  onRefresh: () => void
}

export function BalanceCard({ token, balance, loading, error, onRefresh }: BalanceCardProps) {
  const getDecimals = (token: string): number => {
    const decimals: Record<string, number> = {
      SOL: 9,
      USDC: 6,
      ORE: 11,
      BONK: 5,
      JIM: 9,
      GODL: 11,
      Hustle: 9,
    }
    return decimals[token] || 9
  }

  const formatBalance = (amount: number, token: string): string => {
    const decimals = getDecimals(token)
    const value = amount / Math.pow(10, decimals)
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: decimals > 6 ? 6 : decimals,
    })
  }

  return (
    <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-600/30 rounded-2xl p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-400">Available Balance</h3>
        <button
          onClick={onRefresh}
          disabled={loading}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
          title="Refresh balance"
        >
          <svg
            className={`w-5 h-5 text-gray-400 ${loading ? 'animate-spin' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div>

      {loading ? (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400">Loading balance...</p>
        </div>
      ) : error ? (
        <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-4">
          <p className="text-red-400">{error}</p>
        </div>
      ) : balance ? (
        <div>
          <div className="text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            {formatBalance(balance.available, token)} {token}
          </div>
          <p className="text-sm text-gray-500 break-all">
            Pool: {balance.pool_address.slice(0, 8)}...{balance.pool_address.slice(-8)}
          </p>
        </div>
      ) : (
        <p className="text-gray-400">No balance data available</p>
      )}
    </div>
  )
}

