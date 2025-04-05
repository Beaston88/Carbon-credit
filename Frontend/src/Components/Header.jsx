import React, { useState, useRef, useEffect } from "react";
import { FiBell, FiMessageSquare, FiUser, FiX } from "react-icons/fi";
import { useAppContext } from "../Components/AppContext";

const Header = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { currentUser, userDetails } = useAppContext();
  const popupRef = useRef();

  const togglePopup = () => setShowPopup((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    if (showPopup) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showPopup]);

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
        <button className="text-lg cursor-pointer">
          <FiMessageSquare />
        </button>
        <button
          className="text-lg cursor-pointer relative"
          onClick={togglePopup}
        >
          <FiUser />
        </button>

        {showPopup && userDetails && (
          <div
            ref={popupRef}
            className="absolute top-12 right-0 bg-white shadow-xl rounded-xl p-4 w-72 z-50 border"
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={() => setShowPopup(false)}
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
