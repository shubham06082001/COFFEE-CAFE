import Head from 'next/head';
import Image from 'next/image';
import Banner from '../components/banner';
import Card from '../components/card';
import { fetchCoffeeStores } from '../lib/coffee-stores';
import styles from '../styles/Home.module.css';
import coffeeStoresData from '../data/coffee-stores.json';
import Navbar from '../components/Navbar';

//FIXME: SERVER SIDE CODE

export async function getStaticProps(context) {
  const coffeeStores = coffeeStoresData;

  console.log('coffeeStoresData: ', coffeeStores);

  return {
    props: {
      coffeeStores,
    },
  };
}

//TODO: CLIENT SIDE CODE
export default function Home(props) {
  const handleOnBannerBtnClick = () => {
    //FIXME: ADD

    console.log('hi banner button');
  };
  const { id, name, description, neighborhood, rating } = props.coffeeStores;

  return (
    <div className={styles.container}>
      <Head>
        <title>COFFEE CONNOISSEUR</title>
        <meta
          name='description'
          content='allows you to discover coffee stores near you..'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText='View Stores nearby'
          handleOnClick={handleOnBannerBtnClick}
        />
        {/* {locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>} */}

        {/* {coffeeStoresError && <p>Something went wrong: {coffeeStoresError}</p>} */}

        <div className={styles.heroImage}>
          <Image
            src='/static/hero-image.png'
            width={700}
            height={400}
            alt='hero image'
          />
        </div>
        {props.coffeeStores.length > 0 && (
          <>
            <h2 className={styles.heading2}>MUMBAI STORES 🇮🇳 </h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map((CoffeeStore) => {
                return (
                  <Card
                    name={CoffeeStore.name}
                    imgUrl={CoffeeStore.imgUrl || '/static/background.jpg'}
                    href={`/coffee-store/${CoffeeStore.id}`}
                    key={CoffeeStore.id}
                  />
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
