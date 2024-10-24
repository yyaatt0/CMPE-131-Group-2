"use client"

import { useState } from "react"
import { CreditCard, DollarSign, FileText, PiggyBank, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

// Mock data for account details and transactions
const accountDetails = {
  balance: 5000.75,
  accountType: "Checking",
  accountNumber: "**** **** **** 1234",
}

const transactions = [
  { id: 1, amount: -50.00, type: "Purchase", info: "Grocery Store", date: "2023-05-01" },
  { id: 2, amount: 1000.00, type: "Deposit", info: "Payroll", date: "2023-04-30" },
  { id: 3, amount: -25.50, type: "Purchase", info: "Coffee Shop", date: "2023-04-29" },
  { id: 4, amount: -100.00, type: "Transfer", info: "To Savings Account", date: "2023-04-28" },
  { id: 5, amount: -75.25, type: "Purchase", info: "Restaurant", date: "2023-04-27" },
  { id: 6, amount: -200.00, type: "Withdrawal", info: "ATM", date: "2023-04-26" },
  { id: 7, amount: -35.99, type: "Purchase", info: "Online Store", date: "2023-04-25" },
  { id: 8, amount: 500.00, type: "Deposit", info: "Cash Deposit", date: "2023-04-24" },
  { id: 9, amount: -60.00, type: "Purchase", info: "Gas Station", date: "2023-04-23" },
  { id: 10, amount: -150.00, type: "Bill Payment", info: "Electricity Bill", date: "2023-04-22" },
]

export default function Component() {
  const [activeTab, setActiveTab] = useState("transactions")

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Account Overview</CardTitle>
            <CardDescription>{accountDetails.accountType} - {accountDetails.accountNumber}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">${accountDetails.balance.toFixed(2)}</div>
            <div className="text-sm text-muted-foreground">Available Balance</div>
          </CardContent>
        </Card>

        <div className="sticky top-0 z-10 bg-background shadow-md">
          <nav className="flex space-x-2 p-2">
            <Button
              variant={activeTab === "transactions" ? "default" : "outline"}
              onClick={() => setActiveTab("transactions")}
            >
              <FileText className="mr-2 h-4 w-4" />
              Transactions
            </Button>
            <Button
              variant={activeTab === "transfer" ? "default" : "outline"}
              onClick={() => setActiveTab("transfer")}
            >
              <Send className="mr-2 h-4 w-4" />
              Transfer
            </Button>
            <Button
              variant={activeTab === "pay" ? "default" : "outline"}
              onClick={() => setActiveTab("pay")}
            >
              <DollarSign className="mr-2 h-4 w-4" />
              Pay
            </Button>
            <Button
              variant={activeTab === "deposit" ? "default" : "outline"}
              onClick={() => setActiveTab("deposit")}
            >
              <PiggyBank className="mr-2 h-4 w-4" />
              Deposit
            </Button>
          </nav>
        </div>

        <ScrollArea className="h-[calc(100vh-300px)] rounded-md border">
          {activeTab === "transactions" && (
            <div className="space-y-4 p-4">
              {transactions.map((transaction) => (
                <Card key={transaction.id}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div>
                      <div className="font-semibold">{transaction.type}</div>
                      <div className="text-sm text-muted-foreground">{transaction.info}</div>
                      <div className="text-xs text-muted-foreground">{transaction.date}</div>
                    </div>
                    <div className={`text-lg font-bold ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${Math.abs(transaction.amount).toFixed(2)}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          {activeTab === "transfer" && (
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-4">Transfer Funds</h2>
              <p>Transfer functionality would be implemented here.</p>
            </div>
          )}
          {activeTab === "pay" && (
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-4">Pay Someone</h2>
              <p>E-pay functionality would be implemented here.</p>
            </div>
          )}
          {activeTab === "deposit" && (
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-4">Deposit Check</h2>
              <p>Online check deposit functionality would be implemented here.</p>
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  )
}