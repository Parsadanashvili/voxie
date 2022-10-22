import { PlusIcon } from "@heroicons/react/24/outline";
import React from "react";
import { MainLayout } from "../../layouts";
import Button from "../Button";
import Container from "../Container";
import RoomCard from "../RoomCard";
import styles from "./Dashboard.module.css";

const Rooms = [
  {
    title: "Let’s discuss the stigma of mental health in entertainment",
  },
  {
    title: "Why CI & CD is important when working with a team",
  },
  {
    title: "Senior Dev / Manager @ GoDaddy (TS/React/GQL) - Ask me whate...",
  },
  {
    title: "The developer’s hangout",
  },
  {
    title: "Japanese vs European cars (w/ ChrisFix) 🏎",
  },
  {
    title: "Why people use stack overflow",
  },
  {
    title: "What’s new in machine learning",
  },
  {
    title: "Which framework best for frontend ?",
  },
];

const Dashboard = () => {
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
            {Rooms.map((room, index) => {
              return <RoomCard room={room} key={index} />;
            })}
          </div>
        </div>
      </Container>
    </MainLayout>
  );
};

export default Dashboard;
