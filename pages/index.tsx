import { CustomNextPage } from "../types/page";
import Welcome from "../components/Welcome";
import Dashboard from "../components/Dashboard";
import { GetServerSideProps } from "next";
import { PrismaClient } from "@prisma/client";
import { Room } from "../types";
import useSession from "../hooks/useSession";

const Home: CustomNextPage<{ rooms: Room[] }> = ({ rooms }) => {
  const status = "authenticated";

  if (status == "authenticated") {
    return <Dashboard rooms={rooms} />;
  } else if (status == "unauthenticated") {
    return <Welcome />;
  } else {
    return <div></div>;
  }
};

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
