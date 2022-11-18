import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";
import { Information } from "./pages/information";
import { SignIn } from "./pages/login";
import { Register } from "./pages/register";
import { PATHS } from "./utils/constants";

export function Router() {
  return (
    <Routes>
      <Route path={PATHS.LOGIN} element={<SignIn />} />
      <Route path={PATHS.REGISTER} element={<Register />} />
      <Route path={PATHS.HOME} element={<Home />} />
      <Route path={PATHS.INFORMATION} element={<Information />} />
    </Routes>
  );
}
