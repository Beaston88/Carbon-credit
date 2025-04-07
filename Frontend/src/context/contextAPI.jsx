import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Network, Alchemy } from 'alchemy-sdk';
import { contractABI, contractAddress } from '../utils/constants';

export const CarbonCreditContext = createContext();

export const CarbonCreditProvider = ({ children }) => {
  // State variables
  const [currentAccount, setCurrentAccount] = useState('');
  const [isGovernment, setIsGovernment] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const [carbonCreditPrice, setCarbonCreditPrice] = useState(0);
  const [totalPoolCredits, setTotalPoolCredits] = useState(0);
  const [contributionsCount, setContributionsCount] = useState(0);
  const [networkId, setNetworkId] = useState(null);
  const [provider, setProvider] = useState(null);
  const [error, setError] = useState(null);
  const [lastRefresh, setLastRefresh] = useState(Date.now());
  
  // Transaction states
  const [contractTransactions, setContractTransactions] = useState([]);
  const [alchemyTransactions, setAlchemyTransactions] = useState([]);
  const [localTransactions, setLocalTransactions] = useState([]);
  
  // Form states
  const [addCreditForm, setAddCreditForm] = useState({
    amount: '',
    paymentAddress: ''
  });
  const [purchaseForm, setPurchaseForm] = useState({
    amount: ''
  });

  // Alchemy configuration
  const alchemySettings = {
    apiKey: "OZQMEXeBXa8c7z4l_ZluEJjVd0DLkzMf",
    network: Network.ETH_MAINNET,
  };

  const alchemy = new Alchemy(alchemySettings);

  // Enhanced transaction management
  const getAllTransactions = () => {
    return [
      ...localTransactions,
      ...contractTransactions,
      ...alchemyTransactions
    ].sort((a, b) => {
      const dateA = a.timestamp || (a.blockNum ? parseInt(a.blockNum, 16) : 0);
      const dateB = b.timestamp || (b.blockNum ? parseInt(b.blockNum, 16) : 0);
      return dateB - dateA; // Newest first
    });
  };

  const addLocalTransaction = (transaction) => {
    setLocalTransactions(prev => [transaction, ...prev]);
  };

  const updateLocalTransaction = (txHash, updates) => {
    setLocalTransactions(prev => prev.map(tx => 
      tx.txHash === txHash ? { ...tx, ...updates } : tx
    ));
  };

  // Fetch transactions from Alchemy
  const fetchAlchemyTransactions = async (address) => {
    try {
      setIsLoading(true);
      const { transfers } = await alchemy.core.getAssetTransfers({
        fromBlock: "0x0",
        fromAddress: address,
        category: ["external", "erc20", "erc721"],
      });
      setAlchemyTransactions(transfers);
    } catch (error) {
      console.error("Error fetching Alchemy transactions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize Ethereum provider
  const initializeProvider = async () => {
    try {
      if (typeof window === 'undefined') {
        throw new Error('This application requires a browser environment');
      }

      const ethereum = window.ethereum;
      if (!ethereum) {
        setIsMetaMaskInstalled(false);
        throw new Error('MetaMask is not installed');
      }

      setIsMetaMaskInstalled(true);
      
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
      }

      const web3Provider = new ethers.BrowserProvider(ethereum);
      const network = await web3Provider.getNetwork();
      
      setProvider(web3Provider);
      setNetworkId(network.chainId.toString());
      return web3Provider;

    } catch (err) {
      console.error('Provider initialization failed:', err);
      setError(err);
      throw err;
    }
  };

  // Create contract instance
  const createContract = async () => {
    try {
      const provider = await initializeProvider();
      if (!provider) throw new Error('Provider not initialized');

      if (!contractAddress || !ethers.isAddress(contractAddress)) {
        throw new Error(`Invalid contract address: ${contractAddress}`);
      }

      const abi = Array.isArray(contractABI) ? contractABI : 
                 (contractABI?.abi ? contractABI.abi : null);

      if (!abi || !Array.isArray(abi)) {
        throw new Error('Invalid ABI format');
      }

      const signer = await provider.getSigner();
      return new ethers.Contract(contractAddress, abi, signer);
    } catch (err) {
      console.error('Contract creation failed:', err);
      setError(err);
      throw err;
    }
  };

  // Check wallet connection
  const checkWalletConnection = async () => {
    try {
      if (!window.ethereum) return;

      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        setCurrentAccount(accounts[0]);
        await loadContractData();
      }
    } catch (err) {
      console.error('Error checking wallet connection:', err);
      setError(err);
    }
  };

  // Connect wallet
  const connectWallet = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!window.ethereum) {
        throw new Error('MetaMask is not installed');
      }

      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      });

      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      setCurrentAccount(accounts[0]);

      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      setNetworkId(chainId);

      await loadContractData();
    } catch (err) {
      console.error('Wallet connection failed:', err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setCurrentAccount('');
    setProvider(null);
    setError(null);
  };

  // Load contract data
  const loadContractData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const contract = await createContract();
      if (!contract) return;

      const [price, government, poolInfo] = await Promise.all([
        contract.carbonCreditPrice(),
        contract.government(),
        contract.getPoolInfo()
      ]);

      setCarbonCreditPrice(ethers.formatEther(price));
      setIsGovernment(government.toLowerCase() === currentAccount.toLowerCase());
      setTotalPoolCredits(Number(poolInfo.total));
      setContributionsCount(Number(poolInfo.contributionsCount));

      await loadContractTransactions();
      if (currentAccount) {
        await fetchAlchemyTransactions(currentAccount);
      }
      setLastRefresh(Date.now());
    } catch (err) {
      console.error('Failed to load contract data:', err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Load transactions from contract
  const loadContractTransactions = async () => {
    try {
      const contract = await createContract();
      if (!contract) return;

      const txCount = await contract.transactionCount();
      const txIds = Array.from({ length: Number(txCount) }, (_, i) => i + 1);

      const transactions = await Promise.all(
        txIds.map(async id => {
          try {
            const tx = await contract.getTransactionDetails(id);
            return {
              id,
              type: 'purchase',
              buyer: tx.buyer,
              amount: Number(tx.amount),
              value: ethers.formatEther(tx.totalPrice),
              timestamp: new Date(Number(tx.timestamp) * 1000),
              completed: tx.completed,
              paymentDetails: tx.paymentAddresses?.map((addr, i) => ({
                address: addr,
                amount: ethers.formatEther(tx.paymentAmounts[i] || 0)
              })) || []
            };
          } catch (err) {
            console.error(`Error loading transaction ${id}:`, err);
            return null;
          }
        })
      );

      setContractTransactions(transactions.filter(tx => tx !== null));
    } catch (err) {
      console.error('Failed to load contract transactions:', err);
      setError(err);
    }
  };

  // Add credit to pool
  const addCreditToPool = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!currentAccount) {
        throw new Error('Please connect your wallet first');
      }

      const { amount, paymentAddress } = addCreditForm;

      if (!amount || Number(amount) <= 0) {
        throw new Error('Invalid credit amount');
      }

      if (!paymentAddress || !ethers.isAddress(paymentAddress)) {
        throw new Error('Invalid payment address');
      }

      const contract = await createContract();
      const tx = await contract.addCreditToPool(amount, paymentAddress, {
        gasLimit: 500000
      });

      // Create and add transaction immediately
      const newTransaction = {
        id: `temp-${Date.now()}`,
        type: 'credit',
        sender: currentAccount,
        amount: Number(amount),
        paymentAddress,
        timestamp: Date.now(),
        txHash: tx.hash,
        completed: false
      };

      addLocalTransaction(newTransaction);

      const receipt = await tx.wait();

      // Update transaction status after confirmation
      updateLocalTransaction(tx.hash, {
        id: `credit-${receipt.blockNumber}-${receipt.index}`,
        completed: true,
        blockNum: receipt.blockNumber.toString()
      });

      await loadContractData();
      setAddCreditForm({ amount: '', paymentAddress: '' });
      return receipt;
    } catch (err) {
      console.error('Failed to add credits:', err);
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Purchase credits
  const purchaseCredits = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!currentAccount) {
        throw new Error('Please connect your wallet first');
      }

      const { amount } = purchaseForm;

      if (!amount || Number(amount) <= 0) {
        throw new Error('Invalid purchase amount');
      }

      const contract = await createContract();
      const price = await contract.carbonCreditPrice();
      const totalPrice = ethers.parseEther(
        (Number(amount) * Number(ethers.formatEther(price))).toString()
      );

      const tx = await contract.purchaseCredits(amount, {
        value: totalPrice,
        gasLimit: 500000
      });

      // Create and add transaction immediately
      const newTransaction = {
        id: `temp-${Date.now()}`,
        type: 'purchase',
        buyer: currentAccount,
        amount: Number(amount),
        value: ethers.formatEther(totalPrice),
        timestamp: Date.now(),
        txHash: tx.hash,
        completed: false
      };

      addLocalTransaction(newTransaction);

      const receipt = await tx.wait();

      // Update transaction status after confirmation
      updateLocalTransaction(tx.hash, {
        id: `purchase-${receipt.blockNumber}-${receipt.index}`,
        completed: true,
        blockNum: receipt.blockNumber.toString()
      });

      await loadContractData();
      setPurchaseForm({ amount: '' });
      return receipt;
    } catch (err) {
      console.error('Failed to purchase credits:', err);
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Setup event listeners
  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts) => {
      if (accounts.length === 0) {
        disconnectWallet();
      } else if (accounts[0] !== currentAccount) {
        setCurrentAccount(accounts[0]);
        loadContractData();
      }
    };

    const handleChainChanged = (chainId) => {
      setNetworkId(chainId);
      window.location.reload();
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, [currentAccount]);

  // Initialize on mount
  useEffect(() => {
    const init = async () => {
      try {
        if (typeof window !== 'undefined' && window.ethereum) {
          await initializeProvider();
          await checkWalletConnection();
        } else {
          setIsMetaMaskInstalled(false);
        }
      } catch (err) {
        console.error('Initialization error:', err);
        setError(err);
      }
    };

    init();
  }, []);

  // Auto-refresh transactions
  useEffect(() => {
    if (!currentAccount) return;

    const interval = setInterval(() => {
      fetchAlchemyTransactions(currentAccount);
      loadContractTransactions();
      setLastRefresh(Date.now());
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [currentAccount]);

  return (
    <CarbonCreditContext.Provider
      value={{
        // Account and contract state
        currentAccount,
        isGovernment,
        isLoading,
        isMetaMaskInstalled,
        carbonCreditPrice,
        totalPoolCredits,
        contributionsCount,
        networkId,
        error,
        lastRefresh,

        // Transaction data
        contractTransactions,
        alchemyTransactions,
        localTransactions,
        getAllTransactions,

        // Forms
        addCreditForm,
        purchaseForm,

        // Functions
        connectWallet,
        disconnectWallet,
        addCreditToPool,
        purchaseCredits,
        loadContractData,
        fetchAlchemyTransactions,
        addLocalTransaction,

        // Form handlers
        handleAddCreditFormChange: (e, name) => 
          setAddCreditForm(prev => ({ ...prev, [name]: e.target.value })),
        handlePurchaseFormChange: (e, name) =>
          setPurchaseForm(prev => ({ ...prev, [name]: e.target.value })),
      }}
    >
      {children}
    </CarbonCreditContext.Provider>
  );
};

export const useCarbonCredit = () => useContext(CarbonCreditContext);