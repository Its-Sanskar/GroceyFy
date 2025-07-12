import { useState } from "react";
import Navigationprovider from "./Navigation.provider";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <Navigationprovider></Navigationprovider>
    </RecoilRoot>
  );
}

export default App;
