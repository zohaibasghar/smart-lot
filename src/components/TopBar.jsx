import React from "react";

function TopBar() {
  return (
    <div className="flex-row justify-between px-10 flex items-center py-4 sticky top-0 bg-[#161616]">
      <img src="/logo.png" alt="Smart lot pro" />
      <div className="flex-row flex items-center gap-10">
        <p>WELCOME, TOYOTA WESTBURY</p>
        <button className="py-2.5 px-10 rounded-md text-white">Logout</button>
      </div>
    </div>
  );
}

export default TopBar;
