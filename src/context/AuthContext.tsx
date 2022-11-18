import Cookies from "js-cookie";
import { createContext, useEffect, useState, ReactNode } from "react";
import parseJwt from "../utils/parseJwt";
import { api } from "../config/axios";
import { Navigate } from "react-router-dom";
import { getNotes } from "../services/noteService";

interface AuthContextType {
  signIn: ({ email, password }: SignInProps) => void;
  user: any;
  isLoading: boolean;
  signOutUser: () => void;
  fetchNotes: () => void;
  note: Array<[]>;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface SignInProps {
  email: string;
  password: string;
}
const AuthContext = createContext({} as AuthContextType);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [note, setNote] = useState([]);

  //   const navigate = useNavigate();
  const singOut = () => {
    Cookies.remove("reactauth.token");
    <Navigate to="/" replace />;
    window.location.reload();
  };

  async function fetchNotes() {
    const data = await getNotes();
    setNote(data);
  }

  useEffect(() => {
    const token = Cookies.get("reactauth.token");
    (async () => {
      if (token) {
        setIsLoading(true);
        const id = parseJwt(token).id;

        await api
          .get(`/user/${id}`)
          .then((res) => {
            setUser(res.data);
            setIsLoading(false);
          })
          .catch((error) => {
            setIsLoading(false);
          });
      } else {
        setUser(undefined);
      }
    })();
  }, []);

  console.log(user);
  console.log(note);

  const signOutUser = () => {
    setIsLoading(false);
    setUser(undefined);
    singOut();
  };

  async function signIn({ email, password }: SignInProps) {
    try {
      const res = await api.post("/token", {
        email,
        password,
      });
      const { token } = res.data;

      Cookies.set("reactauth.token", token, {
        expires: 60 * 60 * 24 * 30,
        path: "/",
      });

      setUser(parseJwt(token));

      api.defaults.headers["Authorization"] = `Bearer ${token}`;
    } catch (err: any) {
      console.log(err.response.data.error);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        user,
        isLoading,
        signOutUser,
        fetchNotes,
        note,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
