export default function DateSelector({ selectedDate, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">
        Select Date
      </label>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded px-3 py-2"
      />
    </div>
  )
}
