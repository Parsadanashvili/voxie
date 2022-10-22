import { CustomNextPage } from "../types/pageProps";
import Welcome from "../components/Welcome";
import Dashboard from "../components/Dashboard";

const auth = true;

const Home: CustomNextPage = () => {
  if (auth) {
    return <Dashboard />;
  } else {
    return <Welcome />;
  }
};

if (auth) {
  Home.getPageTitle = "Dashboard";
} else {
  Home.getPageTitle = "Welcome";
}

export default Home;
