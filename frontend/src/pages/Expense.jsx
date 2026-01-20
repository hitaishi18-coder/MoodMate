import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Expense() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense"); 
  const [records, setRecords] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("expenses");
    if (saved) setRecords(JSON.parse(saved));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(records));
  }, [records]);

  function addRecord() {
    if (!title.trim() || !amount) return;

    const newRecord = {
      id: Date.now(),
      title,
      amount: Number(amount),
      type
    };

    setRecords([newRecord, ...records]);
    setTitle("");
    setAmount("");
  }

  function deleteRecord(id) {
    setRecords(records.filter((rec) => rec.id !== id));
  }

  // Calculate totals
  const incomeTotal = records
    .filter((r) => r.type === "income")
    .reduce((sum, r) => sum + r.amount, 0);

  const expenseTotal = records
    .filter((r) => r.type === "expense")
    .reduce((sum, r) => sum + r.amount, 0);

  const balance = incomeTotal - expenseTotal;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-white dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4 pt-20 pb-8">

          <h1 className="text-2xl font-semibold text-center mb-6">
            💰 Expense Tracker
          </h1>

          {/* Summary */}
          <div className="flex justify-around mb-6 text-center">
            <div>
              <p className="text-sm text-gray-500">Income</p>
              <p className="text-green-600 font-semibold">₹{incomeTotal}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Expense</p>
              <p className="text-red-500 font-semibold">₹{expenseTotal}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Balance</p>
              <p className="font-semibold">₹{balance}</p>
            </div>
          </div>

          {/* Input Form */}
          <div className="flex gap-3 mb-6">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title (e.g. Food, Salary)"
              className="flex-1 border border-gray-300 dark:border-zinc-800 rounded-md px-3 py-2"
            />

            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              placeholder="Amount"
              className="w-28 border border-gray-300 dark:border-zinc-800 rounded-md px-3 py-2"
            />

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border border-gray-300 dark:border-zinc-800 rounded-md px-2 py-2"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>

            <button
              onClick={addRecord}
              className="px-4 py-2 border border-gray-300 dark:border-zinc-800 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-900 transition"
            >
              Add
            </button>
          </div>

          {/* Records List */}
          <div className="space-y-3">
            {records.map((rec) => (
              <div
                key={rec.id}
                className="flex justify-between items-center border border-gray-200 dark:border-zinc-800 rounded-md px-3 py-2"
              >
                <div>
                  <p className="font-medium">{rec.title}</p>
                  <p className="text-xs text-gray-500">
                    {rec.type === "income" ? "Income" : "Expense"}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <p
                    className={`font-semibold ${
                      rec.type === "income" ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    ₹{rec.amount}
                  </p>

                  <button
                    onClick={() => deleteRecord(rec.id)}
                    className="text-sm text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {records.length === 0 && (
            <p className="text-center text-gray-500 mt-6">
              No records yet.
            </p>
          )}

        </div>
        <Footer/>
      </div>
    </>
  );
}
