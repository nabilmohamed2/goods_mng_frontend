import React, { useEffect, useState } from "react";

import { IoMdAdd } from "react-icons/io";
import { get_all_tracker } from "../services/ItemService";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Tracker = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const username = useSelector((state)=>state.user.username);

  const fetchData = () => {
    get_all_tracker().then((items) => setData(items.data));
  };

  useEffect(() => {
    fetchData();
    if (username == "") navigate("/login");
    window.location.reload;
  }, [username]);

  return (
    <div className="sm:ml-8 pb-5">
      <div className=" flex mx-5 sm:mx-11 w-10/12 sm:w-8/12">
        <h2 className="mt-5 w-3/12 font-light text-lg ">Tracker</h2>
        <input
          type="text"
          placeholder="Search item..."
          className="border border-slate-950 rounded-md py-1 w-5/12 mt-auto px-2 font-light text-sm"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <p className="mt-auto justify-end w-4/12 flex gap-1 text-lg cursor-pointer">
          <IoMdAdd />
          <p
            className="text-sm"
            onClick={() => {
              navigate("/addEntry");
            }}
          >
            Add Entry
          </p>
        </p>
      </div>

      <div className=" sm:mx-6">
        <div className="flex flex-row mx-5 py-2 mt-6 bg-slate-950 text-white text-lg font-bold sm:w-10/12">
          <div className="w-4/12 flex">
            <p className="w-4/12 text-center">ID</p>
            <p className="w-8/12">Name</p>
          </div>
          <div className="w-8/12 flex">
            <p className="w-4/12 ">Process</p>
            <p className="w-4/12">Quantity</p>
            <p className="w-4/12">Date</p>
          </div>
        </div>
        <div className="sm:w-10/12 mx-5  border border-black">
          {data.length === 0 ? (
            <p className="p-5 text-center text-sm">Nothing to display</p>
          ) : (
            data.map((items, key) => {
              let regex = new RegExp(search, "i");
              if (search != "" && !regex.test(items.item.name)) return <div></div>;
              if (username != items.username) return <div></div>;
              return (
                <div key={key} className="flex  py-5">
                  <div className="w-4/12 flex">
                    <p className="w-4/12 text-center">{items.trackerId}</p>
                    <p className="w-8/12">{items.item.name}</p>
                  </div>
                  <div className="w-8/12 flex">
                    <p className="w-4/12">{items.action}</p>
                    <p className="w-4/12">{items.quantity}</p>
                    <p className="w-4/12 text-sm sm:text-md">
                      {items.timestamp}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Tracker;
