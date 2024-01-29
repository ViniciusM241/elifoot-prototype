import "./style.css";
import { Suspense } from "react";

import RemoveToken from "./removeToken";

export default async function Sair() {
  return (
    <Suspense>
      <RemoveToken />
    </Suspense>
  );
}
