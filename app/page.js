import Image from 'next/image';
import styles from './page.module.css';

// components
import Calculator from './_components/calculator';

export default function Home() {
  return (
    <main className={styles.main}>
      <Calculator />
    </main>
  );
}
