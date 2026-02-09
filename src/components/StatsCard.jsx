export default function StatsCard({ title, count, borderColor }) {
  return (
    <div
      className="bg-white rounded-xl shadow p-4 text-center border-t-4"
      style={{ borderColor }}
    >
      <h2 className="text-2xl font-bold">{count}</h2>
      <p className="text-gray-500">{title}</p>
    </div>
  )
}
