import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";
import parseJwt from "../utils/parseJwt";
import { api } from "../config/axios";
import { Navigate } from "react-router-dom";
import { getNotes } from "../services/noteService";

interface AuthContextType {
  signIn: ({ email, password }: SignInProps) => void;
  user: any;
  userLogged: any;
  isLoading: any;
  signOutUser: any;
  fetchNotes: any;
  note: any;
}

interface SignInProps {
  email: string;
  password: string;
}
const AuthContext = createContext({} as AuthContextType);

function AuthProvider({ children }: any) {
  const [userLogged, setUserLogged] = useState();
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);

  //   const navigate = useNavigate();
  const singOut = () => {
    Cookies.remove("reactauth.token");
    <Navigate to="/" replace />;
    window.location.reload();
  };
  const [note, setNote] = useState([]);

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
    setUserLogged(undefined);
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
      // console.log(parseJwt(token).id);
      setUser(parseJwt(token));

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      // return navigate("/");
    } catch (err: any) {
      toast.error(err.response.data.error, { autoClose: 2000 });
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        user,
        userLogged,
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
