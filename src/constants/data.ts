import { Mood, Place, Fact } from '../types';

export const moods: Mood[] = [
  { id: 'sad', emoji: '😔', label: 'Sad' },
  { id: 'happy', emoji: '😊', label: 'Happy' },
  { id: 'calm', emoji: '😴', label: 'Calm' },
];

export const places: Place[] = [
  {
    id: '1',
    name: 'Durdle Door, Dorset',
    coordinates: {
      latitude: 50.6205,
      longitude: -2.2760,
    },
    image: require('../img/data/1.png'), // Укажите путь к фото
    description:
      'On the Dorset coast, where the cliffs drop straight into the sea, stands a natural arch called Durdle Door. This place is unlike any other beach in Britain: there are no noisy cafes or crowds of tourists, just the sound of the waves and a sense of peace. The stone arch, created by the sea over millions of years, looks as if nature itself opened a door to another world. Chloe loves to come here in the evening - she says that when the sun goes down below the horizon, the sea turns into a mirror. It\'s the perfect place to just sit down with a friend and talk about what really matters.',
  },
  {
    id: '2',
    name: 'Glenfinnan Viaduct, Scotland',
    coordinates: {
      latitude: 56.8755,
      longitude: -5.4310,
    },
    image: require('../img/data/2.png'), // Укажите путь к фото
    description:
      'A bridge you may have seen in the movies, but in reality it\'s even more magical. Glenfinnan Viaduct is not only an engineering marvel, but also a place where mountains meet mist. When an old train passes over it, it seems as if time slows down. Tourists are few here, mostly photographers and travelers who know that real magic is not always in the cities. Chloe advises to come in the morning, when the air is cool and the scent of pine trees mixes with the smell of rain - at such moments even silence has meaning.',
  },
  {
    id: '3',
    name: 'Whitby Abbey, North Yorkshire',
    coordinates: {
      latitude: 54.4880,
      longitude: -0.6097,
    },
    image: require('../img/data/3.png'), // Укажите путь к фото
    description:
      'On a cliff above the sea stand the ruins of the abbey that once inspired Bram Stoker to write "Dracula". But Whitby Abbey is not about fear, but about peace and the scale of time. Stone arches look out to sea, and when the sun breaks through the clouds, shadows fall so that it seems that the abbey comes to life. People come here to feel how small we are in comparison to history. If you sit on the grass with a friend and just look out at the sea, you\'ll understand why the British love their old ruins so much – they\'re not sad, they\'re wise.',
  },
  {
    id: '4',
    name: 'Fairy Pools, Isle of Skye',
    coordinates: {
      latitude: 57.2503,
      longitude: -6.2726,
    },
    image: require('../img/data/4.png'), // Укажите путь к фото
    description:
      'These crystal pools in the mountains of Skye are like a moving picture. The water is so clear that you can see every pebble at the bottom. Some swim, some just watch, and Chloe says that this place reminds you of the balance: between cold and light, mountains and sky, solitude and friendship. If you walk further up, you can find a small waterfall, where all you can hear is the wind and water. Sometimes the best conversations happen right where the phone signal disappears.',
  },
  {
    id: '5',
    name: 'St. Nectan\'s Glen, Cornwall',
    coordinates: {
      latitude: 50.6673,
      longitude: -4.7138,
    },
    image: require('../img/data/5.png'), // Укажите путь к фото
    description:
      'This is not just a waterfall - it is a place where silence sounds louder than any music. St. Nectan\'s Glen is hidden in dense forests, and the road to it is part of the journey. The thin bridge, moss on the stones, drops of water sparkling in the sun - everything looks like you have fallen into an ancient legend. People here leave ribbons on the branches and notes with wishes. Some come with friends to make a wish together - and keep this moment in their memory.',
  },
  {
    id: '6',
    name: 'Portmeirion, Wales',
    coordinates: {
      latitude: 52.9138,
      longitude: -4.0853,
    },
    image: require('../img/data/6.png'), // Укажите путь к фото
    description:
      'A town that no one expects in Britain: colorful facades, terraces, arches reminiscent of Italy. Portmeirion looks like a movie, but it\'s a real place, created by a romantic architect. All the buildings are different shades — pink, mint, sand — and each has its own character. Chloe says that this place is like the British soul after a few days of sun: open, smiling, a little strange, but sincere.',
  },
  {
    id: '7',
    name: 'Lindisfarne Island, Northumberland',
    coordinates: {
      latitude: 55.6761,
      longitude: -1.7920,
    },
    image: require('../img/data/7.png'), // Укажите путь к фото
    description:
      'An island that can only be reached at low tide. The road to it opens for a few hours, and then hides under the water again. Lindisfarne is a place for those who love solitude, nature and conversations about the senses. A castle on a hill, the smell of the sea, silence, broken only by seagulls. If you come here with a friend when the sun goes down, you will both remember this evening as one of the most peaceful in your lives.',
  },
  {
    id: '8',
    name: 'The Dark Hedges, Northern Ireland',
    coordinates: {
      latitude: 55.1184,
      longitude: -6.3794,
    },
    image: require('../img/data/8.png'), // Укажите путь к фото
    description:
      'An alley of old beech trees that looks like the entrance to a fairy tale. The branches intertwine above the road, creating a natural tunnel. In the mornings there is often fog, and everything around seems surreal. Chloe says that this place is about friendship that withstands time: the trees have been here for over 200 years, but they look alive.',
  },
  {
    id: '9',
    name: 'St. Dunstan-in-the-East, London',
    coordinates: {
      latitude: 51.5097,
      longitude: -0.0814,
    },
    image: require('../img/data/9.png'), // Укажите путь к фото
    description:
      'Almost no one knows about this place. These are the ruins of an old church, converted into a garden right in the center of London. Stone arches, ivy on the walls, benches in the shade - everything looks like a mini oasis among glass and concrete. There are often two people sitting here - with a coffee or a book. It\'s the perfect place to rest, think, or just sit quietly.',
  },
];

export const facts: Fact[] = [
  {
    id: '1',
    text: 'Schools have "buddy systems" so that newcomers can make friends faster.',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400',
  },
  {
    id: '2',
    text: 'British people value personal space and prefer one-on-one conversations.',
  },
  {
    id: '3',
    text: 'Tea time is a traditional way to bond with friends in Britain.',
  },
];