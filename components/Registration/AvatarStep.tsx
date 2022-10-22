import { CameraIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon, ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRouter } from "next/router";
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "../../styles/Auth.module.css";
import Button from "../Button";

interface Props {
  onNext: () => void | {};
}

const AvatarStep = ({ onNext }: Props) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState("/imgs/avatar.jpg");
  const [selectedFile, setSelectedFile] = useState<File>();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onNext();
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  useEffect(() => {
    if (!selectedFile) {
      setImage("/imgs/avatar.jpg");
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setImage(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  return (
    <>
      <h2>Registration</h2>

      <div className={styles.text}>
        <CameraIcon width={20} /> Set your profile picture
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles["avatar-wrapper"]} onClick={handleClick}>
          <div className={styles["avatar-icon"]}>
            <ArrowUpTrayIcon height={20} />
          </div>

          <div className={styles["avatar-wrap"]}>
            <Image src={image} layout={"fill"} objectFit={"cover"} />
          </div>
        </div>

        <input
          onChange={handleChange}
          ref={inputRef}
          type={"file"}
          accept={"image/*"}
        />

        <Button type="submit" color="primary">
          Finish
          <ArrowRightIcon width={16} />
        </Button>
      </form>
    </>
  );
};

export default AvatarStep;
