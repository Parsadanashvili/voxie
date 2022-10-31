import { PlusIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useMemo, useState } from "react";
import { Room } from "../../types";
import Button from "@components/Button";
import Container from "@components/Container";
import RoomCard from "@components/RoomCard";
import styles from "./Dashboard.module.css";
import MainLayout from "@layouts/MainLayout";
import StartARoomModal from "./StartARoomModal";
import axios from "lib/axios";
import { getToken } from "@utils/jwt-token";
import Fade from "@components/Fade";
import useAuth from "@hooks/useAuth";

const skeletonRooms = Array.from(
  Array(Math.floor(Math.random() * 16) + 1).keys()
);

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [showSkeleton, setShowSkeleton] = useState<boolean>(true);
  const [showRooms, setShowRooms] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const token = await getToken();

      if (token) {
        setTimeout(() => {
          axios
            .get("/api/rooms", {
              headers: {
                Authorization: token?.accessToken,
              },
            })
            .then((res) => {
              if (res.data.data.length > 0) {
                setShowSkeleton(false);
                setShowRooms(true);
                setRooms(res.data.data);
              }
            });
        }, 2000);
      }
    })();
  }, []);

  return (
    <MainLayout>
      <Container>
        <div className={styles.rooms_section}>
          <div className={styles.section_heading}>
            <h2>All rooms</h2>

            {!user?.currentRoomId && (
              <Button color="success" onClick={() => setModalIsOpen(true)}>
                <PlusIcon width={15} strokeWidth={2.7} /> Start a room
              </Button>
            )}
          </div>

          {showSkeleton && (
            <Fade
              className={styles.section_list}
              visible={showSkeleton}
              delay={10}
            >
              {skeletonRooms.map((item) => {
                return <RoomCard skeleton key={item} />;
              })}
            </Fade>
          )}
          {showRooms && (
            <Fade className={styles.section_list} visible={showRooms}>
              {rooms.map((room: Room, index: number) => {
                return <RoomCard room={room} key={index} />;
              })}
            </Fade>
          )}
        </div>
      </Container>

      <StartARoomModal
        open={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
      />
    </MainLayout>
  );
};

export default Dashboard;
