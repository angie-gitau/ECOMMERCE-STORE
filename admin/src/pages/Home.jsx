import { LineChart } from "@mui/x-charts/LineChart";

const Home = () => {
  return (
    <div className="h-screen p-6 bg-[#e5e7eb] overflow-auto">
      {/* Top Cards */}
      <div className="flex flex-wrap gap-6 justify-center mb-8">
        <div className="bg-white w-60 h-52 shadow-xl rounded-lg flex flex-col items-center justify-center">
          <div className="h-32 w-32 border-[10px] border-[#3b82f6] rounded-full flex items-center justify-center">
            <h2 className="font-bold text-2xl">699</h2>
          </div>
          <h2 className="font-semibold text-xl mt-2">Products</h2>
        </div>

        <div className="bg-white w-60 h-52 shadow-xl rounded-lg flex flex-col items-center justify-center">
          <div className="h-32 w-32 border-[10px] border-[#ef4444] rounded-full flex items-center justify-center">
            <h2 className="font-bold text-2xl">100</h2>
          </div>
          <h2 className="font-semibold text-xl mt-2">Orders</h2>
        </div>

        <div className="bg-white w-60 h-52 shadow-xl rounded-lg flex flex-col items-center justify-center">
          <div className="h-32 w-32 border-[10px] border-[#9ca3af] rounded-full flex items-center justify-center">
            <h2 className="font-bold text-2xl">200</h2>
          </div>
          <h2 className="font-semibold text-xl mt-2">Users</h2>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
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
              ["Customer 2", "Ksh 200", "Declined"],
              ["Customer 3", "Ksh 200", "Approved"],
              ["Customer 4", "Ksh 200", "Declined"],
              ["Customer 5", "Ksh 200", "Approved"],
            ].map(([name, amount, status], i) => (
              <tr key={i} className="border-b">
                <td className="py-2 px-4">{name}</td>
                <td className="py-2 px-4">{amount}</td>
                <td
                  className={`py-2 px-4 ${
                    status === "Approved" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom: Revenue, Losses, and Chart */}
      <div className="flex flex-wrap gap-6">
        <div className="bg-white flex-1 min-w-[250px] p-5 shadow-xl rounded-lg flex items-center justify-center text-center">
          <h2 className="font-bold text-2xl">Total Revenue: $200,000</h2>
        </div>
        <div className="bg-white flex-1 min-w-[250px] p-5 shadow-xl rounded-lg flex items-center justify-center text-center">
          <h2 className="font-bold text-2xl">Total Losses: $0</h2>
        </div>
        <div className="bg-white w-full p-5 mt-4 shadow-xl rounded-lg">
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10], label: "Month" }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
                label: "Sales",
              },
            ]}
            height={350}
            margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
            grid={{ vertical: true, horizontal: true }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
