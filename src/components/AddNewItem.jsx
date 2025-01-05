import React, { useEffect, useState } from "react";
import { add_new_item, get_new_item, update_item } from "../services/ItemService";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const AddNewItem = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState({
    name: "",
    quantity: "",
    price: "",
  });
  const { id } = useParams();

  const navigator = useNavigate();
  const username = useSelector((store) => store.user.username);

  useEffect(() => {
    if(id){
        get_new_item(id).then((response) => {
            setName(response.data.name);
            setQuantity(response.data.quantity);
            setPrice(response.data.price);
        })
        
    }
  }, [id])

  const collectData = () => {

    if (validator()) {
      const item = { name, quantity, price, username };
      if(id){
        console.log("HI"+id);
        update_item(id, item).then((response) => {console.log(response)})
      }
      else{
        add_new_item(item).then((response) => console.log(response));
      }
      navigator("/items");
    }
  };

  const validator = () => {
    let result = true;
    let errors = {};
    console.log(errors);

    if (!name.trim()) {
      result = false;
      errors.name = "Enter item name! ";
    }
    if (isNaN(quantity) || quantity == "") {
      result = false;
      errors.quantity = "Enter valid quantity!";
    }
    if (isNaN(price) || price == "") {
      result = false;
      errors.price = "Enter valid price!";
    }
    setError(errors);
    console.log(error);
    return result;
  };

  return (
    <div className="pl-10 sm:pl-20">
      <h2 className="mt-5 w-8/12 font-light text-lg pb-6">{(id) ? "Update Item" : "Add new item"}</h2>
      <div className="w-8/12">
        <p className="text-sm mt-3">Item name: </p>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className={`border ${
            error.name && "border-red-500"
          } px-2 text-sm font-light border-gray-300 h-8 w-10/12 mt-3 rounded-md`}
        />
        {error.name && (
          <p className="text-red-500 text-sm">Enter a valid name!</p>
        )}
        <p className="text-sm mt-3">Item price: </p>
        <input
          type="text "
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          className={`border ${
            error.price && "border-red-500"
          } px-2 text-sm font-light border-gray-300 h-8 w-10/12 mt-3 rounded-md`}
        />
        {(error.price) && (
          <p className="text-red-500 text-sm">Enter a valid price!</p>
        )}
        <p className="text-sm mt-3">Item quantity: </p>
        <input
          type="text"
          value={quantity}
          onChange={(e) => {
            setQuantity(e.target.value);
          }}
          className={`border ${
            error.quantity && "border-red-500"
          } px-2 text-sm font-light border-gray-300 h-8 w-10/12 mt-3 rounded-md`}
        />
        {(error.quantity) && (
          <p className="text-red-500 text-sm">Enter a valid quantity!</p>
        )}
      </div>
      <button
        onClick={collectData}
        className="mt-6 bg-black text-white font-medium py-2 px-3 rounded-md"
      >
        Submit
      </button>
    </div>
  );
};

export default AddNewItem;
