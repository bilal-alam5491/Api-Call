export interface IProduct {
  title: string;
  category: number;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
}
