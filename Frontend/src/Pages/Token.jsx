import { getAuth, getIdToken, onAuthStateChanged } from "firebase/auth";
import React from "react";

export function GetToken() {
  const getToken = async () => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await getIdToken(user);
        console.log(token);
      } else {
        console.log("sign in");
      }
    });
  };

  return (
    <div>
      <button onClick={getToken}>Get Token</button>
    </div>
  );
}
