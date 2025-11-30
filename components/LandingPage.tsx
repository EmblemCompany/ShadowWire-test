'use client'

export function LandingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center space-y-8">
        {/* Hero Section */}
        <div className="space-y-4">
          <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Private Payments
            <br />
            on Solana
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Send and receive crypto with complete privacy using zero-knowledge proofs.
            Your amounts stay hidden while staying on-chain and verifiable.
          </p>
        </div>

        {/* CTA */}
        <div className="pt-8">
          <p className="text-lg text-gray-300 mb-4">Connect your wallet to get started</p>
          <div className="flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 pt-20">
          <div className="bg-dark-card border border-dark-border rounded-2xl p-8 hover:border-purple-600 transition-colors">
            <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Complete Privacy</h3>
            <p className="text-gray-400">
              Hide transaction amounts using Bulletproofs while keeping everything on-chain.
            </p>
          </div>

          <div className="bg-dark-card border border-dark-border rounded-2xl p-8 hover:border-blue-600 transition-colors">
            <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
            <p className="text-gray-400">
              Built on Solana for instant transactions with minimal fees.
            </p>
          </div>

          <div className="bg-dark-card border border-dark-border rounded-2xl p-8 hover:border-pink-600 transition-colors">
            <div className="w-12 h-12 bg-pink-600/20 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Multi-Token Support</h3>
            <p className="text-gray-400">
              Send SOL, USDC, ORE, BONK, JIM, GODL, and Hustle with complete privacy.
            </p>
          </div>
        </div>

        {/* Supported Wallets */}
        <div className="pt-20">
          <p className="text-sm text-gray-500 mb-6">Supported Wallets</p>
          <div className="flex items-center justify-center space-x-8 opacity-50">
            <div className="text-2xl font-bold">Phantom</div>
            <div className="text-2xl font-bold">Solflare</div>
            <div className="text-2xl font-bold">Torus</div>
            <div className="text-2xl font-bold">Ledger</div>
          </div>
        </div>
      </div>
    </div>
  )
}

