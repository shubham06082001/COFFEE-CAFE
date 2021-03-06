import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { fetchCoffeeStores, fetchProducts } from '../../lib/coffee-stores';
import cls from 'classnames';

import styles from '../../styles/coffee-store.module.css';

export async function getStaticProps(staticProps) {
  const params = staticProps.params;

  const products = await fetchProducts();

  const product = products.find((product) => {
    return product.id.toString() === params.id; //dynamic id
  });
  return {
    props: {
      products: product ? product : {},
    },
  };
}

export async function getStaticPaths() {
  const products = await fetchProducts();
  const paths = products.map((product) => {
    return {
      params: {
        id: product.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
}

const ProductStore = (props) => {
  const router = useRouter();

  //FIXME: FOR ROUTES THAT ARE NOT INCLUDED IN GETSTATICPATHS...

  if (router.isFallback) {
    return <div>LOADINNG....</div>;
  }

  const handleUpvoteButton = () => {
    console.log('Upvote button clicked');
  };

  const { title, price, description, category, image } = props.products;

  const { rate, count } = props.products.rating;

  return (
    <div className={styles.layout}>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description}></meta>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href='/'>
              <a>← Back to home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{title}</h1>
          </div>
          <Image
            alt='banner image'
            src={
              image ||
              'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
            }
            width={600}
            height={360}
            className={styles.storeImg}
          />
        </div>

        <div className={cls('glass', styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image
              src='/static/icons/places.svg'
              width='24'
              height='24'
              alt='places icon'
            />
            <p className={styles.text}>{category}</p>
          </div>
          {description && (
            <div className={styles.iconWrapper}>
              <Image
                src='/static/icons/nearMe.svg'
                width='24'
                height='24'
                alt='near me icon'
              />
              <p className={styles.text}>{description}</p>
            </div>
          )}
          <div className={styles.iconWrapper}>
            <Image
              src='/static/icons/star.svg'
              width='24'
              height='24'
              alt='star icon'
            />
            <p className={styles.text}>{rate}</p>
            <p className={styles.text}>COUNT : {count}</p>
          </div>

          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductStore;
