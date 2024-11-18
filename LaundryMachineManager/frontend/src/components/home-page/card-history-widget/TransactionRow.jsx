// TransactionRow displays a single transaction row
// RecordsTransaction(tid: INT, cid: INT, day: DATE, time: Char[10], price: INT)
export default function TransactionRow({ transaction }) {
  const formatSQLDate = (sqlDate) => {
    const date = new Date(sqlDate);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatSQLTime = (sqlTime) => {
    const [hours, minutes] = sqlTime.split(":");
    const date = new Date();
    date.setHours(hours, minutes);
    return date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-row justify-around items-center min-h-[40px] bg-white rounded-lg">
      <small>{formatSQLDate(transaction.day)}</small>
      <small>{formatSQLTime(transaction.time)}</small>
      <small>-{transaction.price}</small>
    </div>
  );
}
