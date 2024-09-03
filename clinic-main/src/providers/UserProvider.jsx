import { useState, useEffect, useContext, createContext } from "react";
import { getUser, getUserData } from "../utils/user";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { LoadingPage } from "../pages/LoadingPage";
import OnboardingPage from "../pages/OnboardingPage";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export function UserProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchUserData = async (user) => {
      try {
        const data = await getUserData(user.id, user.data.role);
        setUserData(data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    const fetchUser = async (uid) => {
      try {
        const user = await getUser(uid);
        setUser(user);
        if (user) {
          await fetchUserData(user); // Pass the user object to fetchUserData
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false); // Set loading to false after user data is fetched
      }
    };

    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        navigate("/login");
      } else {
        fetchUser(authUser.uid);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Render loading indicator or null check
  if (loading) {
    return <LoadingPage />; // Replace with your loading indicator
  }

  if (!user?.data?.onboarded) {
    return <OnboardingPage user={user} />;
  }

  return (
    <UserContext.Provider value={{ user, userData }}>
      {children}
    </UserContext.Provider>
  );
}
