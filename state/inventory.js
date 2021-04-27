import Observable from 'https://sean-cdn.netlify.app/js/observable/@0.0.1/observable.min.js';

const inventory = new Observable({
  head: [],
  body: [
    {
      name: 'blue_robe',
      value: 20,
      weight: 2,
      type: 'body'
    }
  ],
  hands: [
    {
      name: 'blue_robe_staff',
      value: 5,
      weight: 3,
      type: 'hand'
    }
  ]
});

export default inventory;