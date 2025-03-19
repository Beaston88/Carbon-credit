// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract FixedCarbonCreditMarketplace {
    address public government;
    uint256 public carbonCreditPrice;
    uint256 private _nextTransactionId = 1;
    
    struct SellerContribution {
        address seller;
        address paymentAddress; 
        uint256 amount;
        uint256 timestamp;
    }
    
    SellerContribution[] public contributionQueue;
    uint256 public totalPoolCredits;
    
    struct Transaction {
        uint256 id;
        address buyer;
        uint256 amount;
        uint256 totalPrice;
        uint256 timestamp;
        bool completed;
        address[] paymentAddresses;
        uint256[] paymentAmounts;
    }
    
    mapping(uint256 => Transaction) public transactions;
    mapping(address => uint256) public addressBalances;
    mapping(address => uint256[]) public buyerTransactions;
    mapping(address => uint256[]) public sellerTransactions;
    
    event CreditAddedToPool(address indexed seller, address indexed paymentAddress, uint256 amount, uint256 timestamp);
    event CreditPurchased(uint256 indexed transactionId, address indexed buyer, uint256 amount, uint256 totalPrice);
    event SellerPaid(uint256 indexed transactionId, address indexed paymentAddress, uint256 amount, uint256 payment);
    event PriceUpdated(uint256 oldPrice, uint256 newPrice);
    event TransactionCompleted(uint256 indexed transactionId);
    event PaymentSent(address indexed to, uint256 amount);
    event PaymentReceived(address indexed from, uint256 amount);
    event Error(string message);
    
    modifier onlyGovernment() {
        require(msg.sender == government, "Only government can call this function");
        _;
    }
    
    constructor(uint256 initialPrice) {
        government = msg.sender;
        carbonCreditPrice = initialPrice;
    }
    
    function transferGovernment(address newGovernment) external onlyGovernment {
        require(newGovernment != address(0), "Invalid address");
        government = newGovernment;
    }
    
    function updateCarbonCreditPrice(uint256 newPrice) external onlyGovernment {
        emit PriceUpdated(carbonCreditPrice, newPrice);
        carbonCreditPrice = newPrice;
    }
  
    function addCreditToPool(uint256 amount, address paymentAddress) external {
        require(amount > 0, "Amount must be greater than zero");
        require(paymentAddress != address(0), "Payment address cannot be zero");
        
        contributionQueue.push(SellerContribution({
            seller: msg.sender,
            paymentAddress: paymentAddress,
            amount: amount,
            timestamp: block.timestamp
        }));
        totalPoolCredits += amount;
        
        uint256 txId = _nextTransactionId++;
        sellerTransactions[msg.sender].push(txId);
        
        Transaction storage transaction = transactions[txId];
        transaction.id = txId;
        transaction.buyer = address(0); 
        transaction.amount = amount;
        transaction.totalPrice = 0; 
        transaction.timestamp = block.timestamp;
        transaction.completed = true;
        
        emit CreditAddedToPool(msg.sender, paymentAddress, amount, block.timestamp);
    }
    
    function purchaseCredits(uint256 amount) external payable {
        require(amount > 0, "Amount must be greater than zero");
        require(amount <= totalPoolCredits, "Not enough credits in the pool");
        
        uint256 totalPrice = amount * carbonCreditPrice;
        
        require(msg.value >= totalPrice, "Insufficient payment");
        
        uint256 transactionId = _nextTransactionId++;
        Transaction storage transaction = transactions[transactionId];
        transaction.id = transactionId;
        transaction.buyer = msg.sender;
        transaction.amount = amount;
        transaction.totalPrice = totalPrice;
        transaction.timestamp = block.timestamp;
        transaction.completed = false;
        transaction.paymentAddresses = new address[](0);
        transaction.paymentAmounts = new uint256[](0);
        
        buyerTransactions[msg.sender].push(transactionId);
        
        _processQueue(transactionId, amount);
        
        transaction.completed = true;
        emit TransactionCompleted(transactionId);
        
        uint256 refundAmount = msg.value - totalPrice;
        if (refundAmount > 0) {
            (bool success, ) = payable(msg.sender).call{value: refundAmount}("");
            if (!success) {
                emit Error("Refund failed");
            } else {
                emit PaymentSent(msg.sender, refundAmount);
            }
        }
        
        emit CreditPurchased(transactionId, msg.sender, amount, totalPrice);
    }
    

    function purchaseCreditsSimple(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        require(amount <= totalPoolCredits, "Not enough credits in the pool");
        
        uint256 transactionId = _nextTransactionId++;
        Transaction storage transaction = transactions[transactionId];
        transaction.id = transactionId;
        transaction.buyer = msg.sender;
        transaction.amount = amount;
        transaction.totalPrice = amount * carbonCreditPrice;
        transaction.timestamp = block.timestamp;
        transaction.completed = true;
        
        buyerTransactions[msg.sender].push(transactionId);
        
        _reduceFromPool(amount);
        
        emit CreditPurchased(transactionId, msg.sender, amount, transaction.totalPrice);
    }
    function _processQueue(uint256 transactionId, uint256 amount) private {
        uint256 remainingAmount = amount;
        uint256 processedSellers = 0;
        
        Transaction storage transaction = transactions[transactionId];
        
        while (remainingAmount > 0 && processedSellers < contributionQueue.length) {
            SellerContribution storage contribution = contributionQueue[processedSellers];
            address paymentAddress = contribution.paymentAddress;
            
            if (contribution.amount <= remainingAmount) {
                uint256 payment = contribution.amount * carbonCreditPrice;
                
                transaction.paymentAddresses.push(paymentAddress);
                transaction.paymentAmounts.push(payment);
                
                sellerTransactions[contribution.seller].push(transactionId);
                
                (bool success, ) = payable(paymentAddress).call{value: payment}("");
                if (!success) {
                    emit Error("Payment transfer failed");
                } else {
                    emit PaymentSent(paymentAddress, payment);
                }
                
                remainingAmount -= contribution.amount;
                totalPoolCredits -= contribution.amount;
                
                emit SellerPaid(transactionId, paymentAddress, contribution.amount, payment);
                
                processedSellers++;
            } else {
                uint256 partialAmount = remainingAmount;
                uint256 payment = partialAmount * carbonCreditPrice;
                
                transaction.paymentAddresses.push(paymentAddress);
                transaction.paymentAmounts.push(payment);
                
                sellerTransactions[contribution.seller].push(transactionId);
                
                (bool success, ) = payable(paymentAddress).call{value: payment}("");
                if (!success) {
                    emit Error("Payment transfer failed");
                } else {
                    emit PaymentSent(paymentAddress, payment);
                }
                
                contribution.amount -= partialAmount;
                totalPoolCredits -= partialAmount;
                
                emit SellerPaid(transactionId, paymentAddress, partialAmount, payment);
                
                remainingAmount = 0;
            }
        }
        
        if (processedSellers > 0) {
            _cleanupQueue(processedSellers);
        }
    }
    
    function _reduceFromPool(uint256 amount) private {
        uint256 remainingAmount = amount;
        uint256 processedSellers = 0;
        
        while (remainingAmount > 0 && processedSellers < contributionQueue.length) {
            SellerContribution storage contribution = contributionQueue[processedSellers];
            
            if (contribution.amount <= remainingAmount) {
                remainingAmount -= contribution.amount;
                totalPoolCredits -= contribution.amount;
                
                processedSellers++;
            } else {
                uint256 partialAmount = remainingAmount;
                
                contribution.amount -= partialAmount;
                totalPoolCredits -= partialAmount;
                
                remainingAmount = 0;
            }
        }
        
        if (processedSellers > 0) {
            _cleanupQueue(processedSellers);
        }
    }
    
    function _cleanupQueue(uint256 processedSellers) private {
        // Instead of shifting elements, we'll swap with the last element and pop
        for (uint256 i = 0; i < processedSellers; i++) {
            // If we're not at the last element, swap with the last
            if (i < contributionQueue.length - 1) {
                contributionQueue[i] = contributionQueue[contributionQueue.length - 1];
            }
            contributionQueue.pop();
        }
    }
    
    function getTransactionDetails(uint256 transactionId) external view returns (
        address buyer,
        uint256 amount,
        uint256 totalPrice,
        uint256 timestamp,
        bool completed
    ) {
        Transaction storage transaction = transactions[transactionId];
        require(transaction.timestamp > 0, "Transaction does not exist");
        
        return (
            transaction.buyer,
            transaction.amount,
            transaction.totalPrice,
            transaction.timestamp,
            transaction.completed
        );
    }
    function getBuyerTransactions(address buyer) external view returns (uint256[] memory) {
        return buyerTransactions[buyer];
    }
    
    function getSellerTransactions(address seller) external view returns (uint256[] memory) {
        return sellerTransactions[seller];
    }
    
    function getPoolInfo() external view returns (uint256 total, uint256 contributionsCount) {
        return (totalPoolCredits, contributionQueue.length);
    }
    
    function getSellerContribution(uint256 index) external view returns (
        address seller,
        address paymentAddress,
        uint256 amount,
        uint256 timestamp
    ) {
        require(index < contributionQueue.length, "Index out of bounds");
        SellerContribution storage contribution = contributionQueue[index];
        return (
            contribution.seller,
            contribution.paymentAddress,
            contribution.amount,
            contribution.timestamp
        );
    }
    
    receive() external payable {
        emit PaymentReceived(msg.sender, msg.value);
    }
    
    fallback() external payable {
        emit PaymentReceived(msg.sender, msg.value);
    }
}