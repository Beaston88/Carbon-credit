import React, { useState, useRef, useEffect } from "react";
import { FiBell, FiMessageSquare, FiUser, FiX } from "react-icons/fi";
import { useAppContext } from "../Components/AppContext";

const Header = () => {
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [showMessagePopup, setShowMessagePopup] = useState(false);
  const { currentUser, userDetails } = useAppContext();

  const userPopupRef = useRef();
  const messagePopupRef = useRef();

  // Close popups on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userPopupRef.current &&
        !userPopupRef.current.contains(event.target)
      ) {
        setShowUserPopup(false);
      }
      if (
        messagePopupRef.current &&
        !messagePopupRef.current.contains(event.target)
      ) {
        setShowMessagePopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex items-center w-full px-4 py-2 relative">
      <div className="flex-1 flex justify-center sm:justify-start">
        <input
          type="text"
          placeholder="Search for Carbon Credits"
          className="w-2/3 p-1 sm:p-3 border rounded-xl"
        />
      </div>

      <div className="flex items-center gap-4 ml-2 relative">
        <button className="text-lg cursor-pointer">
          <FiBell />
        </button>

        <button
          className="text-lg cursor-pointer relative"
          onClick={() => setShowMessagePopup((prev) => !prev)}
        >
          <FiMessageSquare />
        </button>

        {showMessagePopup && (
          <div
            ref={messagePopupRef}
            className="absolute top-10 right-16 bg-white shadow-xl rounded-xl py-4 pr-4 w-64 z-50 border"
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={() => setShowMessagePopup(false)}
            >
              <FiX size={18} />
            </button>
            <p className="text-sm text-center font-medium mt-1">
              🧑‍💻 Minor Project made under
            </p>
            <p className="text-sm text-center font-medium">Mr. Vikas Hassija</p>
          </div>
        )}

        <button
          className="text-lg cursor-pointer relative"
          onClick={() => setShowUserPopup((prev) => !prev)}
        >
          <FiUser />
        </button>

        {showUserPopup && userDetails && (
          <div
            ref={userPopupRef}
            className="absolute top-12 right-0 bg-white shadow-xl rounded-xl p-4 w-72 z-50 border"
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={() => setShowUserPopup(false)}
            >
              <FiX size={18} />
            </button>

            <p className="font-semibold mb-2">👤 User Details</p>
            <div className="text-sm space-y-1 mt-4">
              <p>
                <span className="font-medium">Name:</span>{" "}
                {userDetails.owner_name}
              </p>
              <p>
                <span className="font-medium">Email:</span> {currentUser?.email}
              </p>
              <p>
                <span className="font-medium">Company:</span>{" "}
                {userDetails.address}
              </p>
              <p>
                <span className="font-medium">GST:</span> {userDetails.gst}
              </p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
