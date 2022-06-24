import Link from 'next/link';
import Image from 'next/image';
import styles from './navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className='logo'>
        <Image
          alt='LOgo'
          src='/static/coffee.png'
          width={64}
          height={64}
          styles={styles.logo}
        />
      </div>
      <div styles={styles.link}>
        <Link href='/'>
          <a>HOME</a>
        </Link>
      </div>
      <Link href='/products'>
        <a>PRODUCTS</a>
      </Link>
      <Link href='/isro'>
        <a>ISRO</a>
      </Link>
      <Link href='/jokes'>
        <a>JOKES</a>
      </Link>
    </nav>
  );
};

export default Navbar;
