import TransactionRow from "./TransactionRow";

export default function CardHistoryWidget({ transactions }) {
  return (
    <section className="flex flex-col h-full gap-2 w-full bg-widget p-5 rounded-3xl overflow-y-auto">
      <h1>Card History</h1>
      {transactions.map((transaction) => (
        <TransactionRow key={transaction.tid} transaction={transaction} />
      ))}
    </section>
  );
}
