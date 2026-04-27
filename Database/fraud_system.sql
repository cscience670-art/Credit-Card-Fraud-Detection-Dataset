-- =========================================
-- 💸 FRAUD DETECTION DATABASE
-- =========================================

-- حذف الجداول إذا كانت موجودة
DROP TABLE IF EXISTS fraud_alerts;
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS users;

-- =========================================
-- 👤 USERS TABLE
-- =========================================
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- 🏦 ACCOUNTS TABLE
-- =========================================
CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    balance DECIMAL(15,2) DEFAULT 0,
    currency VARCHAR(10) DEFAULT 'USD',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- 💳 TRANSACTIONS TABLE
-- =========================================
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    sender_account_id INT REFERENCES accounts(id),
    receiver_account_id INT REFERENCES accounts(id),
    amount DECIMAL(15,2),
    location VARCHAR(100),
    device VARCHAR(100),
    transaction_type VARCHAR(50),
    status VARCHAR(20) DEFAULT 'PENDING',
    fraud_prediction BOOLEAN DEFAULT FALSE,
    fraud_probability DECIMAL(5,4),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- 🚨 FRAUD ALERTS TABLE
-- =========================================
CREATE TABLE fraud_alerts (
    id SERIAL PRIMARY KEY,
    transaction_id INT REFERENCES transactions(id) ON DELETE CASCADE,
    risk_level VARCHAR(20),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- 📜 LOGS TABLE (OPTIONAL)
-- =========================================
CREATE TABLE logs (
    id SERIAL PRIMARY KEY,
    action TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================================
-- 📊 INDEXES (Performance)
-- =========================================
CREATE INDEX idx_transactions_sender ON transactions(sender_account_id);
CREATE INDEX idx_transactions_receiver ON transactions(receiver_account_id);
CREATE INDEX idx_fraud_prediction ON transactions(fraud_prediction);

-- =========================================
-- 🧪 SAMPLE DATA
-- =========================================

-- Users
INSERT INTO users (full_name, email, password) VALUES
('Alice Doe', 'alice@example.com', 'hashed_password'),
('Bob Smith', 'bob@example.com', 'hashed_password');

-- Accounts
INSERT INTO accounts (user_id, balance) VALUES
(1, 5000),
(2, 3000);

-- Transactions
INSERT INTO transactions 
(sender_account_id, receiver_account_id, amount, location, device, transaction_type, fraud_prediction, fraud_probability)
VALUES
(1, 2, 100, 'Algeria', 'Mobile', 'Transfer', FALSE, 0.02),
(1, 2, 2000, 'Unknown Country', 'Desktop', 'Transfer', TRUE, 0.89);

-- Fraud Alert
INSERT INTO fraud_alerts (transaction_id, risk_level, message) VALUES
(2, 'HIGH', 'Suspicious transaction detected');

-- Logs
INSERT INTO logs (action) VALUES
('User login'),
('Transaction created');

-- =========================================
-- 🎉 DONE
-- =========================================
