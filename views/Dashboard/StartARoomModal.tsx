import Button from "@components/Button";
import Input from "@components/Input";
import Modal from "@components/Modal";
import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import React from "react";
import styles from "./StartARoomModal.module.css";

interface Props {
  open: boolean;
  onClose: Function;
}

const StartARoomModal: React.FC<Props> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose} title={"Start a room"}>
      <form className={styles.form}>
        <Input placeholder="Room discuss topic" />

        <Button className={styles.button}>
          Let's Go <ArrowUpRightIcon width={15} strokeWidth={2.7} />
        </Button>
      </form>
    </Modal>
  );
};

export default StartARoomModal;
