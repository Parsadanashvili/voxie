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
import styles from "@styles/Auth.module.css";
import Button from "@components/Button";
import axios from "lib/axios";
import { getToken } from "@utils/jwt-token";

interface Props {
  onNext: (data?: any) => void | {};
  stepData: { [key: string]: string };
}

const AvatarStep = ({ onNext }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState("/imgs/avatar.jpg");
  const [selectedFile, setSelectedFile] = useState<File>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (selectedFile) {
      setIsLoading(true);

      const token = await getToken();

      const filename = encodeURIComponent(selectedFile.name);
      const fileType = encodeURIComponent(selectedFile.type);

      try {
        let res = await axios.post(
          `/api/user/avatar`,
          {
            name: filename,
            type: fileType,
          },
          {
            headers: {
              Authorization: token?.accessToken,
            },
          }
        );

        const formData = new FormData();

        Object.entries({
          ...res.data.fields,
          ...{ file: selectedFile },
        }).forEach(([key, value]) => {
          formData.append(key, value as string);
        });

        await axios.post(res.data.url, formData).catch(console.log);

        onNext({
          avatar: `${res.data.url}/${res.data.fields.Key}`,
        });
      } catch {
        setIsLoading(false);
      }
    } else {
      onNext();
    }
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

        <Button type="submit" color="primary" loading={isLoading}>
          Finish
          <ArrowRightIcon width={16} />
        </Button>
      </form>
    </>
  );
};

export default AvatarStep;
