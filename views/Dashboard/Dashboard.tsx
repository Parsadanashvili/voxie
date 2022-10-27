import { PlusIcon } from "@heroicons/react/24/outline";
import React from "react";
import { MainLayout } from "../../layouts";
import { Room } from "../../types";
import Button from "@components/Button";
import Container from "@components/Container";
import RoomCard from "@components/RoomCard";
import styles from "./Dashboard.module.css";

interface Dashboard {
  rooms: Room[];
}

const Dashboard: React.FC<Dashboard> = ({ rooms }) => {
  return (
    <MainLayout>
      <Container>
        <div className={styles.rooms_section}>
          <div className={styles.section_heading}>
            <h2>All rooms</h2>

            <Button color="success">
              <PlusIcon width={15} strokeWidth={2.7} /> Start a room
            </Button>
          </div>

          <div className={styles.section_list}>
            {rooms.map((room: Room, index: number) => {
              return <RoomCard room={room} key={index} />;
            })}
          </div>
        </div>
      </Container>
    </MainLayout>
  );
};

export default Dashboard;
