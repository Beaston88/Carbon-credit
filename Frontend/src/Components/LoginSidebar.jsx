import { useState } from "react";

const LoginSidebar = ({ onFillCredentials }) => {
  const [isOpen, setIsOpen] = useState(false);

  const testCredentials = [
    {
      role: "BUYER",
      email: "buyer@email.com",
      password: "123456",
    },
    {
      role: "SELLER",
      email: "seller@email.com",
      password: "123456",
    },
    {
      role: "GOVT",
      email: "govt@email.com",
      password: "123456",
    },
  ];

  const fillForm = (email, password) => {
    if (onFillCredentials) {
      onFillCredentials(email, password);
    }
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-screen bg-gradient-to-b from-green-50 to-green-100 border-l border-green-200 shadow-lg transition-all duration-300 ease-in-out ${
          isOpen ? "w-80" : "w-0"
        } overflow-hidden z-40`}
      >
        <div className="p-6 h-full overflow-y-auto">
          <h3 className="text-lg font-bold text-green-800 mb-6">
            Test Credentials
          </h3>
          <div className="space-y-4">
            {testCredentials.map((cred, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg p-4 border border-green-200 hover:shadow-md transition-shadow"
              >
                <p className="text-sm font-semibold text-green-700 uppercase mb-3">
                  {cred.role}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-600">
                        Email:
                      </p>
                      <code className="text-xs text-gray-800 break-words">
                        {cred.email}
                      </code>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-600">
                        Password:
                      </p>
                      <code className="text-xs text-gray-800">
                        {cred.password}
                      </code>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => fillForm(cred.email, cred.password)}
                  className="mt-3 w-full text-xs bg-green-500 hover:bg-green-600 text-white py-2 rounded transition font-medium"
                >
                  Fill Form
                </button>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-xs text-gray-600">
              <span className="font-semibold text-green-700">💡 Tip:</span> Use
              these test credentials to explore different user roles.
            </p>
          </div>
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-xs text-gray-600">
              <span className="font-semibold text-green-700">🗒️ NOTE:</span> The backend goes to sleep after 15mins of inactivity. And, can require upto 1min to wake. Please wait.
            </p>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed right-0 top-1/2 -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white px-2 py-6 rounded-l-lg transition-all duration-300 z-50 shadow-lg cursor-pointer ${
          isOpen ? "rounded-r-none" : ""
        }`}
        title={isOpen ? "Close sidebar" : "Open test credentials"}
      >
        <span className="text-sm font-bold">{isOpen ? "✕" : "💳"}</span>
      </button>

      {/* Overlay when sidebar is open (on mobile/smaller screens) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default LoginSidebar;
