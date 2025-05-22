import Image from "next/image";
import styles from "../styles/Loader.module.css";

export default function Loader() {
    return (
        <div className={styles.container}>
            <Image src="/book-7.gif" alt="Carregando.." width={700} height={700} priority unoptimized className={styles.image} />
            <h1 className={styles.message}>Carregando...</h1>
        </div>
    );
}