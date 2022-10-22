import { CustomNextPage } from "../types/pageProps";
import Welcome from "../components/Welcome";
import Dashboard from "../components/Dashboard";
import { GetServerSideProps } from "next";
import { PrismaClient } from "@prisma/client";
import { Room } from "../types";

const auth = true;

const Home: CustomNextPage<{ rooms: Room[] }> = ({ rooms }) => {
  if (auth) {
    return <Dashboard rooms={rooms} />;
  } else {
    return <Welcome />;
  }
};

if (auth) {
  Home.getPageTitle = "Dashboard";
} else {
  Home.getPageTitle = "Welcome";
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const prisma = new PrismaClient();

  const rooms = JSON.stringify(
    await prisma.room.findMany({
      select: {
        id: true,
        title: true,
        creator: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
        users: {
          select: {
            id: true,
            username: true,
            avatar: true,
          },
        },
        createdAt: true,
      },
    })
  );

  return {
    props: {
      rooms: JSON.parse(rooms),
    },
  };
};

export default Home;
