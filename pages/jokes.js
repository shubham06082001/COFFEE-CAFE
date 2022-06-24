import React from 'react';
import Head from 'next/head';

export async function getStaticProps(context) {
  const response = await fetch('http://api.icndb.com/jokes/random/20');

  const jokes = await response.json();

  // console.log('jokes: ', jokes);

  return {
    props: {
      jokes: jokes.value,
    },
  };
}

export default function JOKES(props) {
  console.log(props);
  return (
    <div
      style={{ background: '/static/mesh-gradient.png', overflow: 'hidden' }}
    >
      <Head>
        <title>Jokes</title>
      </Head>
      <main style={{ margin: 20, justifyContent: 'start' }}>
        {props.jokes.length > 0 &&
          props.jokes.map((joke) => (
            <li
              style={{ color: 'white', fontSize: 16, padding: 20 }}
              key={joke.id}
            >
              {joke.joke}
            </li>
          ))}
      </main>
    </div>
  );
}
