import { ChevronRightIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Button from "@components/Button";
import Card from "@components/Card";
import styles from "@styles/Index.module.css";

const Welcome = () => {
  return (
    <main className={styles["wrapper"]}>
      <Card width={400}>
        <div className={styles["welcome-inner"]}>
          <h2 className={styles["welcome-title"]}>Welcome to Voxie!</h2>

          <p className={styles["welcome-text"]}>
            We’re working hard to get Voxie ready for everyone! While we wrap
            the finishing youches, we’re adding people gradually to make sure
            nothing breaks
          </p>

          <Link href={"/auth"} passHref={false}>
            <Button color="primary">
              Get started
              <ChevronRightIcon width={16} />
            </Button>
          </Link>
        </div>
      </Card>
    </main>
  );
};

export default Welcome;
