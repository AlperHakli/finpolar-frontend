import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from "recharts"

export function StockChart({ datahistory }) {
  // Eğer veri henüz gelmediyse veya boşsa boş dön
  if (!datahistory || datahistory.length === 0) return null;

  return (
    <div className="w-4/5 h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={datahistory} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />

          <XAxis
            dataKey="date"
            hide={true}
            padding={{ left: 0, right: 0 }}
          />

          <YAxis
            domain={['auto', 'auto']}
            hide={true}
          />


          <Tooltip
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
            labelClassName="text-slate-400 font-medium"
            itemStyle={{ color: '#2563eb', fontWeight: 'bold' }}
          />


          <Line
            type="monotone"
            dataKey="price"
            stroke="#2563eb"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}