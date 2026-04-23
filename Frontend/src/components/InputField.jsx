export default function InputField({
  label,
  name,
  type,
  placeholder,
  icon,
  value,
  onChange,
  inputMode,
}) {
  return (
    <div className="mb-4">
      <label className="block text-[15px] font-semibold text-black mb-1.5">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-300">
          {icon}
        </div>
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          inputMode={inputMode}
          className="w-full pl-11 pr-4 py-3 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-800 bg-white placeholder-gray-500 text-sm"
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );
}
