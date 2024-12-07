"use client";

import { App as SendbirdApp } from "@sendbird/uikit-react";
import "@sendbird/uikit-react/dist/index.css";

function App() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <SendbirdApp
        appId={"E4BA8B13-E95A-4601-95D8-69BBC7A0797F"}
        userId={"admin1"}
        accessToken={"98230e0070444000777d3143ed33fe9934abcefe"}
      />
    </div>
  );
}

export default App;
