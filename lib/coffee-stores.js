import { createApi } from 'unsplash-js';

const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeeStores = (latlong, query, limit) => {
  // return process.env.NEXT_PUBLIC_FAKE_URL

  return `https://api.foursquare.com/v2/venues/search?client_id=${process.env.NEXT_PUBLIC_FOURSQUARE_CLIENT_ID}&client_secret=${process.env.NEXT_PUBLIC_FOURSQUARE_CLIENT_SECRET}&v=20210511&ll=${latlong}&query=${query}&limit=${limit}`;
};

const getImagesForCoffeeStores = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: 'coffee-stores',
    page: 1,
    perPage: 10,
  });

  console.log('photos', photos);

  const unsplashResults = photos.response.results;

  console.log('Unsplash Results', unsplashResults);

  const photosResponse = unsplashResults.map((result) => result.urls['small']);

  console.log('photosResponse', photosResponse);
  return photosResponse;
};

export const fetchCoffeeStores = async () => {
  const latLong = '43.65267326999575,-79.39545615725015';
  const limit = 6;

  // const photos = await getImagesForCoffeeStores();

  // const response = await fetch(
  //   getUrlForCoffeeStores(latLong, 'coffee-stores', limit)
  // );

  const response = await fetch(
    `https://api.foursquare.com/v2/venues/search?4c4192d5d7fad13a8cb807da?client_id=AAA&client_secret=BBB&v=20170101&query=coffee-store&ll=43.65267326999575,-79.39545615725015&limit=20`
  );

  const data = await response.json();

  console.log('COFFEE STORES: ', data);

  return response.venues;

  // return data.response.venues.map((venue, index) => {
  //   return {
  //     ...venue,
  //     imgUrl: photos[index],
  //   };
  // });
};

export const fetchProducts = async () => {
  const URL = 'https://fakestoreapi.com/products';

  const response = await fetch(URL);
  const data = await response.json();

  // console.log(data);

  return data;
};
