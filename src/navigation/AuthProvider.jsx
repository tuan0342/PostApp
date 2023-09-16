import react, {createContext} from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  const signInAccount = async (email, password) => {
    try {
      auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      console.log(e);
    }
  };

  const registerAccount = async (email, password) => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (e) {
      console.log(e);
    }
  };

  const logoutAccount = async (email, password) => {
    try {
      await auth().signOut();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: signInAccount,
        register: registerAccount,
        logout: logoutAccount,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
