import React from "react";

interface InputProps {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ label, type, placeholder, value, onChange }: InputProps) => {
  return (
    <div className="mb-4">
      <label className="text-sm text-gray-600">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-md p-2 mt-1 outline-none text-sm"
      />
    </div>
  );
};

export default Input;
