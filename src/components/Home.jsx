import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const username = useSelector((state) => state.user.username);
  const navigate = useNavigate();
  useEffect(()=>{
    if(username == "")navigate("/login");
  },[username])
  return (
    <div className="ml-5 sm:ml-20">
      <div className="sm:flex overflow-y-auto overflow-x-hidden">
        <div className="sm:w-5/12">
        <p className="mt-20 text-2xl">
            Welcome,{" "}
            <span className="mt-4 opacity-50">
             {username+" "}
            </span>
            <span className="motion-preset-pulse">👋🏼</span>
          </p>
          <p className="mt-5 text-4xl">
            Making Your Business{" "}
            <p className="mt-4">
              Ideas <span className="font-bold">Come True.</span>
            </p>
          </p>
          <p className="mt-5 font-light">
            Streamline inventory management and boost <br className="mt-3" />{" "}
            efficiency with intuitive UI.
          </p>
        </div>
        <img className="sm:w-5/12 sm:h-auto  mt-10  sm:mt-0" src="./work.png" alt="work" />
      </div>
    </div>
  );
};

export default Home;
