// TransactionRow displays a single transaction row
// RecordsTransaction(tid: INT, cid: INT, day: DATE, time: Char[10], price: INT)
export default function TransactionRow({ transaction }) {
  return (
    <div className="flex flex-row justify-around items-center min-h-[80px] bg-white rounded-lg">
      <p>{transaction.day}</p>
      <p>{transaction.time}</p>
      <p>-{transaction.price}</p>
    </div>
  );
}
