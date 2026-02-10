-- Payout accounts
CREATE TABLE payout_accounts (
    id SERIAL PRIMARY KEY,
    type VARCHAR(20) NOT NULL,
    account_identifier VARCHAR(100) NOT NULL,
    currency VARCHAR(10) NOT NULL DEFAULT 'GHS',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Repayments
CREATE TABLE repayments (
    id SERIAL PRIMARY KEY,
    merchant_id INTEGER NOT NULL,
    public_token VARCHAR(120) UNIQUE NOT NULL,
    status VARCHAR(20) DEFAULT 'ACTIVE',
    created_by VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);

-- Payments
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    repayment_id INTEGER REFERENCES repayments(id),
    amount NUMERIC(12,2) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    network VARCHAR(20) NOT NULL,
    provider VARCHAR(20),
    provider_reference VARCHAR(100),
    payout_msisdn VARCHAR(20) NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING', -- PENDING, SUCCESS, FAILED
    created_at TIMESTAMP DEFAULT NOW(),
    confirmed_at TIMESTAMP
);
