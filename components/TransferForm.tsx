'use client'

import { useState } from 'react'
import { ShadowWireClient, RecipientNotFoundError, InsufficientBalanceError, TokenSymbol } from '@radr/shadowwire'
import { useWallet } from '@solana/wallet-adapter-react'

interface TransferFormProps {
  client: ShadowWireClient
  senderWallet: string
  selectedToken: TokenSymbol
  currentBalance: number
  onTransferComplete: () => void
}

type TransferType = 'internal' | 'external'

export function TransferForm({
  client,
  senderWallet,
  selectedToken,
  currentBalance,
  onTransferComplete,
}: TransferFormProps) {
  const { signTransaction } = useWallet()
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [transferType, setTransferType] = useState<TransferType>('internal')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const getDecimals = (token: string): number => {
    const decimals: Record<string, number> = {
      SOL: 9,
      USDC: 6,
      ORE: 11,
      BONK: 5,
      JIM: 9,
      GODL: 11,
      HUSTLE: 9,
    }
    return decimals[token] || 9
  }

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!recipient || !amount) {
      setError('Please fill in all fields')
      return
    }

    const amountNum = parseFloat(amount)
    if (isNaN(amountNum) || amountNum <= 0) {
      setError('Please enter a valid amount')
      return
    }

    // Check if amount exceeds balance
    const decimals = getDecimals(selectedToken)
    const amountInSmallestUnit = amountNum * Math.pow(10, decimals)
    if (amountInSmallestUnit > currentBalance) {
      setError('Insufficient balance')
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const result = await client.transfer({
        sender: senderWallet,
        recipient: recipient.trim(),
        amount: amountNum,
        token: selectedToken,
        type: transferType,
      })

      setSuccess(
        `Transfer successful! ${
          result.amount_hidden ? 'Amount is hidden on-chain' : 'Amount is visible'
        }. Tx: ${result.tx_signature.slice(0, 8)}...`
      )
      setRecipient('')
      setAmount('')
      
      // Refresh balance after successful transfer
      setTimeout(() => {
        onTransferComplete()
      }, 2000)
    } catch (err: any) {
      if (err instanceof RecipientNotFoundError) {
        setError(
          "Recipient hasn't used ShadowWire before. Try an external transfer instead."
        )
      } else if (err instanceof InsufficientBalanceError) {
        setError('Insufficient balance for this transfer')
      } else {
        setError(err.message || 'Transfer failed. Please try again.')
      }
      console.error('Transfer error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-dark-card border border-dark-border rounded-2xl p-8">
      <h3 className="text-2xl font-bold mb-6">Send Payment</h3>

      <form onSubmit={handleTransfer} className="space-y-6">
        {/* Transfer Type Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-3">
            Transfer Type
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setTransferType('internal')}
              className={`p-4 rounded-xl border-2 transition-all ${
                transferType === 'internal'
                  ? 'border-purple-600 bg-purple-600/10'
                  : 'border-dark-border hover:border-gray-600'
              }`}
            >
              <div className="font-semibold mb-1">Private (Internal)</div>
              <div className="text-xs text-gray-400">Amount is hidden</div>
            </button>
            <button
              type="button"
              onClick={() => setTransferType('external')}
              className={`p-4 rounded-xl border-2 transition-all ${
                transferType === 'external'
                  ? 'border-blue-600 bg-blue-600/10'
                  : 'border-dark-border hover:border-gray-600'
              }`}
            >
              <div className="font-semibold mb-1">Public (External)</div>
              <div className="text-xs text-gray-400">Amount is visible</div>
            </button>
          </div>
          {transferType === 'internal' && (
            <p className="mt-2 text-xs text-gray-500">
              Both sender and recipient must be ShadowWire users
            </p>
          )}
          {transferType === 'external' && (
            <p className="mt-2 text-xs text-gray-500">
              Works with any Solana wallet, but amount is visible
            </p>
          )}
        </div>

        {/* Recipient Input */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Recipient Address
          </label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Enter Solana wallet address"
            className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl focus:outline-none focus:border-purple-600 transition-colors"
            disabled={loading}
          />
        </div>

        {/* Amount Input */}
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Amount ({selectedToken})
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            step="any"
            min="0"
            className="w-full px-4 py-3 bg-dark-bg border border-dark-border rounded-xl focus:outline-none focus:border-purple-600 transition-colors"
            disabled={loading}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <svg
                className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-green-900/20 border border-green-600/30 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <svg
                className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-green-400 text-sm">{success}</p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !recipient || !amount}
          className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98]"
        >
          {loading ? (
            <span className="flex items-center justify-center space-x-3">
              <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing...</span>
            </span>
          ) : (
            'Send Payment'
          )}
        </button>

        {/* Fee Notice */}
        <p className="text-xs text-center text-gray-500">
          1% relayer fee automatically applied
        </p>
      </form>
    </div>
  )
}

