class BankAccount {
    constructor(clientBalance) {
        this.balance = clientBalance;
    }

    getBalance() {
        return this.balance;
    }

    deposit(balancePlus) {
        this.balance += balancePlus;
    }

    withdraw(balanceMinus) {
        if (this.balance >= balanceMinus) {
            this.balance -= balanceMinus;
        } else {
            console.log('The amount exceeds the limit')
        }
    }
}

const account1 = new BankAccount(1000);
console.log(account1.getBalance()); // 1000
account1.deposit(500);
console.log(account1.getBalance()); // 1500

account1.withdraw(200);
console.log(account1.getBalance()); // 1300

