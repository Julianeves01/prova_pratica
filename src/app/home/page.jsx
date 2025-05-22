import styles from '../home/Home.module.css';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
    return (
        <div className={styles.container}>
            <h1>Julia Simões Neves</h1>
            <h2>Turma:</h2>
            <p> 2TDS1 </p>
            <h3>Instrutores:</h3>
            <p>Marcelo Carboni</p>
            <p>Thiago Ferreira</p>
            <h3>Matéria: Front End</h3>
            <Image src="/perfil.jpg" alt='Minha Foto' width={150} height={50} className={styles.image} />
            <Link href="/livros" className={styles.button}>Ver Livros</Link>
        </div>

    );
}