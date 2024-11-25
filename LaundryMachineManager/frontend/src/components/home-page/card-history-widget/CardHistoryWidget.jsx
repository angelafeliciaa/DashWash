import TransactionRow from "./TransactionRow";
import { useState, useEffect } from "react";

export default function CardHistoryWidget({ cid }) {
    const [transactions, setTransactions] = useState([]);
  
    useEffect(() => {
      const fetchTransactions = async () => {
        try {
          const response = await fetch(`http://localhost:5001/transactionHistory/${cid}`);
          const data = await response.json();
          if (response.ok) {
            setTransactions(data.transactions);
          } else {
            console.error(data.error);
          }
        } catch (err) {
          console.error("Failed to fetch transactions:", err);
        }
      };
  
      if (cid) {
        fetchTransactions();
      }
    }, [cid]);

  return (
    <section className="flex flex-col h-full gap-2 w-full bg-widget p-5 rounded-3xl overflow-y-auto">
      <h1>Card History</h1>
      {transactions.map((transaction) => (
        <TransactionRow key={transaction.tid} transaction={transaction} />
      ))}
    </section>
  );
}
