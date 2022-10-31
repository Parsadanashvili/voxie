import React from "react";
import styles from "@styles/Room.module.css";
import MainLayout from "@layouts/MainLayout";
import Container from "@components/Container";
import axios from "lib/axios";
import { getToken } from "@utils/jwt-token";
import { GetServerSideProps } from "next";
import { User } from "../../../types/user";
import RoomUser from "@components/RoomUser";
import Fade from "@components/Fade";

const Room = ({ room }: { room: any }) => {
  return (
    <MainLayout>
      <Container>
        <div className={styles.section}>
          <div className={styles.heading}>
            <h2>Let’s discuss the stigma of mental health in entertainment</h2>
          </div>

          <Fade delay={10}>
            <div className={styles.users}>
              {room.users.map((user: User) => {
                return <RoomUser user={user} key={user.id} />;
              })}
            </div>
          </Fade>
        </div>
      </Container>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
}) => {
  const token = await getToken("session", req);

  if (params) {
    const { id: roomId } = params;

    if (roomId) {
      const { data: res } = await axios.get(`/api/rooms/${roomId}`, {
        headers: {
          Authorization: token?.accessToken,
        },
      });

      if (res?.data) {
        return {
          props: {
            room: res.data,
          },
        };
      }
    }
  }

  return {
    notFound: true,
  };
};

export default Room;
