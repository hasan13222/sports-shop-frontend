export interface TProduct {
  _id?: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  stock: number;
  rating: number;
  price: number;
  image?: string;
}

export interface TProductInput extends TProduct {
  picture: any;
}

export interface TProductManage {
  _id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  stock: number;
}
