import { CustomNextPage } from "../types/page";
import Welcome from "views/Welcome";
import Dashboard from "views/Dashboard";
import useAuth from "@hooks/useAuth";

const Home: CustomNextPage = () => {
  const { status } = useAuth();

  if (status == "authenticated") {
    return <Dashboard />;
  } else if (status == "unauthenticated") {
    return <Welcome />;
  } else {
    return <div></div>;
  }
};

export default Home;
