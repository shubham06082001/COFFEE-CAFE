import Head from 'next/head';
import Image from 'next/image';
import Banner from '../components/banner';
import Card from '../components/card';
import { fetchProducts } from '../lib/coffee-stores';
import styles from '../styles/Product.module.css';

//FIXME: SERVER SIDE CODE

export async function getStaticProps(context) {
  const products = await fetchProducts();

  return {
    props: {
      products,
    },
  };
}

//TODO: CLIENT SIDE CODE
export default function Home(props) {
  const handleOnBannerBtnClick = () => {
    //FIXME: ADD

    console.log('hi banner button');
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>CLOTHING HUB</title>
        <meta
          name='description'
          content='allows you to discover clothing products..'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText='View Stores nearby'
          handleOnClick={handleOnBannerBtnClick}
        />
        <div className={styles.heroImage}>
          <Image
            src='/static/hero-image.png'
            width={700}
            height={400}
            alt='hero image'
          />
        </div>
        {props.products.length > 0 && (
          <>
            <h2 className={styles.heading2}>CLOTHING PRODUCTS </h2>
            <div className={styles.cardLayout}>
              {props.products.map((CoffeeStore) => {
                return (
                  <Card
                    name={CoffeeStore.title}
                    imgUrl={CoffeeStore.image || '/static/background.jpg'}
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
