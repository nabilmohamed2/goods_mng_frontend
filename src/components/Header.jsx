import React from "react";

import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="sm:mt-10 h-12 flex  sm:flex-row sm:flex justify-between mt-5 mx-4 sm:mx-20 sm:py-2 mb-6">
      {/* First section: Manage Goods */}
      <div className="flex flex-row gap-1 text-xl">
        <p className="font-bold">Manage .</p>
        <p className="opacity-60">Goods</p>
      </div>
      {location.pathname != "/login" && (
        <div className="flex mt-2 sm:mt-0 gap-4">
          <p
            onClick={() => {
              navigate("/");
            }}
            className="cursor-pointer"
          >
            Home
          </p>
          <p
            onClick={() => {
              navigate("/track");
            }}
            className="cursor-pointer"
          >
            Track
          </p>
          <p
            onClick={() => {
              navigate("/items");
            }}
            className="cursor-pointer"
          >
            Items
          </p>
          <div
            className="cursor-pointer flex gap-2"
            onClick={() => {
              navigate("/login");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
