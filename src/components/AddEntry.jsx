import React, { useEffect, useState } from "react";
import { FaCircleMinus } from "react-icons/fa6";
import { FaCirclePlus } from "react-icons/fa6";
import {
  add_tracker,
  list_of_items,
  update_item,
} from "../services/ItemService";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AddEntry = () => {
  const [options, setOptions] = useState();
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [itemDetails, setItemDetails] = useState({});
  const [done, setDone] = useState(true);
  const [action, setAction] = useState("");
  const [quantity, setQuantity] = useState();
  const navigate = useNavigate();
  const username = useSelector((store) => store.user.username);
  

  useEffect(() => {
    list_of_items().then((item_arr) => setItems(item_arr.data));
    console.log(items);
  }, []);

  const handleSubmit = () => {
    const now = new Date();
    const date =
      now.getDate().toString().padStart(2, "0") +
      "/" +
      (now.getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      now.getFullYear().toString() +
      " " +
      now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    const tracker = {
      item: itemDetails,
      action: action,
      quantity: quantity,
      timestamp: date,
      username: username
    };
    console.log(tracker);
    const savedItem = add_tracker(tracker);
    console.log(savedItem);
    const updatedQuantity =
      action === "Removed"
        ? Number(itemDetails.quantity) - Number(quantity)
        : Number(itemDetails.quantity) + Number(quantity);
    const item = {
      name: itemDetails.name,
      quantity: updatedQuantity,
      price: itemDetails.price,
    };

    update_item(itemDetails.id, item).then((response) => {
      console.log("UPDATED" + response);
    });
    navigate("/track");
  };

  return (
    <div className="pl-5 sm:pl-20">
      <h2 className="mt-5 w-5/12 font-light text-lg pb-6">Add Entry</h2>
      <div className="w-8/12">
        <p className="text-sm mt-3 ">Item name</p>
        <input
          type="text"
          className="border px-2 text-sm font-light border-gray-300 h-8 w-10/12 mt-3 rounded-md"
          value={selectedItem}
          onChange={(e) => {
            setSelectedItem(e.target.value);
            setDone(true);
          }}
        />

        {items.length != 0 && selectedItem != "" && done && (
          <div className="border w-10/12 border-gray-400 rounded-lg">
            {items.map((item, key) => {
              let regEx = new RegExp(selectedItem, "i");
              if (username != item.username) return <div></div>;
              return (
                regEx.test(item.name) &&
                selectedItem != "" && (
                  <div
                    key={key}
                    className=" border-gray-300 p-2 border-t-0 rounded-md"
                  >
                    <p
                      className="text-sm cursor-pointer "
                      onClick={() => {
                        setSelectedItem(item.name);
                        setItemDetails(item);
                        setDone(false);
                      }}
                    >
                      {item.name}
                    </p>
                  </div>
                )
              );
            })}
          </div>
        )}
        <p className="text-sm mt-3 ">Select an action</p>
        <div className="flex gap-3">
          <div
            className={`flex mt-3 cursor-pointer gap-2 border sm:w-2/12 p-2 rounded-md ${
              options === 1 ? "border-black border-4" : "border-gray-400"
            }`}
            onClick={() => {
              setOptions(1);
              setAction("Removed");
            }}
          >
            <p className="text-sm">Remove Item </p>
            <FaCircleMinus size={16} />
          </div>
          <div
            className={`flex mt-3 cursor-pointer gap-2 border sm:w-2/12 py-2 px-6 rounded-md ${
              options === 2 ? "border-black border-4" : "border-gray-400"
            }`}
            onClick={() => {
              setOptions(2);
              setAction("Added");
            }}
          >
            <p className="text-sm">Add Item </p>
            <FaCirclePlus size={16} />
          </div>
        </div>
        <p className="text-sm mt-3 ">Quantity</p>
        <input
          type="text"
          className="border px-2 text-sm font-light border-gray-300 h-8 w-10/12 mt-3 rounded-md"
          onChange={(e) => {
            setQuantity(e.target.value);
          }}
        />
      </div>
      <button
        onClick={handleSubmit}
        className="mt-6 bg-black text-white font-medium py-2 px-3 rounded-md"
      >
        Submit
      </button>
    </div>
  );
};

export default AddEntry;
