import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setPassword, setRole, setUserName } from "./userSlice";
import { login_user, register_user } from "../services/UserService";
import { useDispatch } from "react-redux";

const Login = () => {
  const [isNewUser, setIsNewUser] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const toggle = () => {
    setIsNewUser(!isNewUser);
  };

  const email = useRef();
  const password = useRef();
  const username = useRef();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    console.log(username.current.value);

    console.log(password.current.value);

    setError("");
    let mail_test;
    if (isNewUser) {
      const mail_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      mail_test = mail_regex.test(email.current.value);
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{};':"\\|,.<>\/?]).{8,}$/;
    const password_test = passwordRegex.test(password.current.value);

    const userNameRegex = /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/;
    const userName_test = !isNewUser
      ? userNameRegex.test(username.current.value)
      : true;

    if (isNewUser) !mail_test && setError("Enter an valid e-mail");
    if (!password_test)
      setError(
        "Password must contain uppercase, lowercase, symbols and should contain atleast 4 characters"
      );
    if (!userName_test)
      setError(
        "Username must contain uppercase, lowercase, symbols and should contain atleast 4 characters"
      );

    if (error === "") {
      const response = isNewUser
        ? register_user({
            username: username.current.value,
            password: password.current.value,
            roles: ["ADMIN"],
          })
        : login_user({
            username: username.current.value,
            password: password.current.value,
          });
      response
        .then(() => {
          dispatch(setUserName(username.current.value))
          navigate("/");
        })
        .catch((err) => {
          setError("Enter valid username and password");
          console.log(error);
          console.log("Enter valid username and password");
        });
    }
  };

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            {isNewUser ? "Create a new account" : "Sign in to your account"}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            action="#"
            method="POST"
            onSubmit={(e) => e.preventDefault()}
            className="space-y-6"
          >
            <div>
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  ref={username}
                  type="text"
                  required
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            {isNewUser && (
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    ref={email}
                    type="mail"
                    required
                    className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  ref={password}
                  required
                  className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
              {error && (
                <p className="text-red-500 text-sm font-medium">{error}</p>
              )}
            </div>
            <div>
              <button
                type="submit"
                onClick={handleSubmit}
                className="flex w-full justify-center rounded-md bg-slate-950 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isNewUser ? "Sign up" : "Sign in"}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            {isNewUser ? "Already a member? " : "Not a member? "}
            <a
              href="#"
              className="font-semibold text-black opacity-90 hover:opacity-70"
              onClick={toggle}
            >
              {isNewUser ? "Sign in" : "Create a new account"}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
