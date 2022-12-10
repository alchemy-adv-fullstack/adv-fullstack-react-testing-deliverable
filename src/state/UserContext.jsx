import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  getLocalUser,
  signInUser,
  signOutUser,
  signUpUser,
  storeLocalUser,
  verifyUser,
} from '../services/auth.js';

const UserContext = createContext();

export default function UserProvider({ children }) {
  const localUser = getLocalUser();
  const [user, setUserState] = useState(localUser);

  const verify = async () => {
    const response = await verifyUser();
    setUser(response.session.user || null);
  };

  useEffect(() => {
    verify();
  }, []);

  const setUser = (user) => {
    console.log('storing user', user)
    storeLocalUser(user);
    setUserState(user);
  };

  const value = {
    user,
    setUser,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const { user } = useContext(UserContext);
  return user;
}

export function useAuth() {
  const [error, setError] = useState(null);
  const { setUser } = useContext(UserContext);

  const handleResponse = ({ user, error }) => {
    if (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      setError(error.message);
    } else {
      console.log('Setting user to ', user )
      setUser(user);
      setError(null);
    }
  };

  const signUp = async (credentials) => {
    const response = await signUpUser(credentials);
    handleResponse(response);
  };

  const signIn = async (credentials) => {
    const response = await signInUser(credentials);
    console.log('signIn response', response)
    handleResponse(response);
  };

  const signOut = async () => {
    const response = await signOutUser();
    response.user = null;
    handleResponse(response);
  };

  return { signUp, signIn, signOut, error };
}
