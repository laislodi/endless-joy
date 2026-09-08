import cookiePhoto from '../assets/orange-cookies.png';
import type { Flavor } from '../types';

export const flavors: Flavor[] = [
  { id: 'orange', name: 'Brazilian Orange', note: 'Bright citrus, buttery crumb, soft sugar finish.', price: 3.75, accent: '#F0A15F', photo: cookiePhoto },
  { id: 'lime', name: 'Lime Sugar', note: 'Fresh lime zest with a delicate sweet-tart finish.', price: 3.75, accent: '#BFD870' },
  { id: 'coconut', name: 'Toasted Coconut', note: 'Buttery cookie with golden toasted coconut.', price: 4.00, accent: '#E2C29F' },
  { id: 'choc-orange', name: 'Chocolate Orange', note: 'Deep cocoa with a bright orange lift.', price: 4.25, accent: '#8A5B3E' },
  { id: 'guava', name: 'Guava Glow', note: 'Tropical guava-inspired sweetness with a soft center.', price: 4.25, accent: '#ECA0A8' },
  { id: 'nut', name: 'Brazil Nut Crunch', note: 'Rich nutty flavor, crisp edges, tender center.', price: 4.50, accent: '#C99B6A' },
];
