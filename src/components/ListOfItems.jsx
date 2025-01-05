import React, { useEffect, useState } from "react";
import { delete_item, list_of_items } from "../services/ItemService";
import { IoMdAdd } from "react-icons/io";
import { SlOptions } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";

const ListOfItems = () => {
  const [item, setItems] = useState([]);
  const [options, setOptions] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const username = useSelector((state) => state.user.username);

  useEffect(() => {
    list_of_items()
      .then((resp) => {
        console.log("came in");
        setItems(resp.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function addItem() {
    navigate("/addNewItem");
  }

  function updateItem(id) {
    navigate("/updateItem/" + id);
  }

  return (
    <div className="sm:ml-8">
      <div className=" flex align-middle mx-4 sm:mx-11 w-10/12">
        <h2 className="mt-5 w-4/12 sm:w-5/12 font-light text-lg ">List of Items</h2>
        <input
          type="text"
          placeholder="Search item..."
          className="border border-slate-950 rounded-md py-1 w-4/12 sm:w-3/12 mt-auto px-2 font-light text-sm"
          onChange={(e) => { setSearch(e.target.value) }}
        />
        <p
          className="mt-auto justify-end w-4/12 sm:w-3/12 flex gap-1 text-lg cursor-pointer"
          onClick={addItem}
        >
          <IoMdAdd />
          <p className="text-sm">Add Items</p>
        </p>
      </div>
      <div className="mx-4 sm:mx-8 mt-5">
        <div className="flex flex-row py-2 sm:mt-6 bg-slate-950 text-white text-lg font-bold sm:w-10/12">
          <p className="w-3/12 text-center">ID</p>
          <p className="w-3/12">Name</p>
          <p className="w-3/12 ">Quantity</p>
          <p className="w-3/12 ">Price</p>
        </div>
        <div className="sm:w-10/12 border border-black">
          {(item.length === 0) ? <p className="p-5 text-center text-sm">Nothing to display</p>: 
          item.map((items, key) => {
            let regex = new RegExp(search,"i");
            if ((search != "") && !regex.test(items.name)) return <div></div>;
            if (username != items.username) return <div></div>;

            return (
              <div key={key} className={`flex flex-row pt-5 align-middle py-5 ${(items.quantity<=20) && "border border-red-500"}`}>
                <p className="w-3/12 text-center">{items.id}</p>
                <p className="w-3/12 ">{items.name}</p>
                <p className="w-3/12 ">{items.quantity}</p>
                <div className="flex w-3/12">
                  <p className="w-11/12 ">{items.price}</p>
                  <div
                    onClick={() => {
                      options == "" ? setOptions(1) : setOptions("");
                      console.log(options);
                    }}
                    className="flex gap-3 w-10/12"
                  >
                    {options ? (
                      <SlOptions className="cursor-pointer" />
                    ) : (
                      <div className="flex gap-3 cursor-pointer">
                        <IoClose className="mt-1" />
                        <div className="flex gap-2 border border-black p-1 rounded-lg">
                          <MdEdit
                            onClick={() => updateItem(items.id)}
                            className="cursor-pointer border-r border-black pr-2 w-6/12"
                          />
                          <MdDelete
                            onClick={() => {
                              delete_item(items.id);
                              window.location.reload();
                            }}
                            className="cursor-pointer "
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="h-6"> </div>
    </div>
  );
};

export default ListOfItems;
