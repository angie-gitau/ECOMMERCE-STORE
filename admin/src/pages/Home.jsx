import { LineChart } from "@mui/x-charts/LineChart";

const Home = () => {
  return (
    <div className="h-screen p-4 bg-[#e5e7eb] overflow-auto">
      {/* Top Cards Container with light gray background */}
      <div className="flex flex-row gap-[38px] mb-8 overflow-x-auto pb-2 bg-gray-100 p-4 rounded-lg">
        {[
          { count: "699", label: "Products", border: "#3b82f6" },
          { count: "100", label: "Orders", border: "#ef4444" },
          { count: "200", label: "Users", border: "#9ca3af" },
        ].map(({ count, label, border }, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 shadow-xl rounded-[1.5rem] flex flex-col items-center justify-center transition-transform duration-300 hover:shadow-2xl hover:-translate-y-3 hover:scale-105"
            style={{ width: "4cm", height: "6cm" }}
          >
            <div
              className="w-[2.5cm] h-[2.5cm] border-[6px] rounded-full flex items-center justify-center mb-3"
              style={{ borderColor: border }}
            >
              <h2 className="font-bold text-base">{count}</h2>
            </div>
            <h2 className="font-semibold text-sm text-center">{label}</h2>
          </div>
        ))}
      </div>

      {/* Transactions Table */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h3 className="text-lg font-bold mb-4">Latest Transactions</h3>
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">Customer</th>
              <th className="py-2 px-4 text-left">Amount</th>
              <th className="py-2 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Customer 1", "Ksh 200", "Approved"],
              ["Customer 2", "Ksh 200", "Pending"],
              ["Customer 3", "Ksh 200", "Approved"],
              ["Customer 4", "Ksh 200", "Declined"],
              ["Customer 5", "Ksh 200", "Approved"],
            ].map(([name, amount, status], i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="py-1 px-4">{name}</td>
                <td className="py-1 px-4">{amount}</td>
                <td className="py-1 px-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom: Revenue, Losses, and Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow-xl rounded-lg flex items-center justify-center text-center">
          <h2 className="font-bold text-lg">Total Revenue: $200,000</h2>
        </div>
        <div className="bg-white p-4 shadow-xl rounded-lg flex items-center justify-center text-center">
          <h2 className="font-bold text-lg">Total Losses: $0</h2>
        </div>
        <div
          className="bg-white p-4 shadow-xl rounded-lg mx-auto"
          style={{ width: "50%", minWidth: "300px" }}
        >
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10], label: "Month" }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
                label: "Sales",
              },
            ]}
            height={200}
            margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
            grid={{ vertical: true, horizontal: true }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
