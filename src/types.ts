export type Flavor = {
  id: string;
  name: string;
  note: string;
  price: number;
  accent: string;
  photo?: string;
};

export type Cart = Record<string, number>;
