import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import InformationBox from "./InformationBox";

interface IProps {
  children?: React.ReactNode;
}

const AuthRoute = (props: IProps) => {
  const { children } = props;
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const AuthCheck = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
      } else {
        console.log("Unauthorized");
        navigate("/login");
      }
    });

    return () => AuthCheck();
  }, [auth]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) return <InformationBox message="loading" />;

  return <>{children}</>;
};

export default AuthRoute;
