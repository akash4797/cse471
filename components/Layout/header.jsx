import React from "react";

export default function Header({ title, children }) {
  return (
    <header className="bg-slate-50 h-20 px-5 flex justify-between items-center  border-b border-gray-200">
      <div className="">
        <span className="text-xl font-semibold">{title}</span>
      </div>
      {children}
    </header>
  );
}
