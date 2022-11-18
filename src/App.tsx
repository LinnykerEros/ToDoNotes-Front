import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/Header";
import { AuthProvider } from "./context/AuthContext";
import { Router } from "./Router";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Router />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
