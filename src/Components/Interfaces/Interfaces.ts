export interface FormValues {
  email: string;
  password: string;
  cPassword: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  DOB: string; 
  gender: string;
  address: string;
  file: File;
}

export type RegisterRole = "user" | "crafter";
export interface FormConfirmation {
  email: string;
  otp: string;
}
export interface ConfirmFormProps {
  email: string;
}

export interface FormConfirmation {
  email: string;
  otp: string;
}

export interface FormikValues {
  email: string;
  otp: string;
}
export interface CategoryType {
  _id: string;
  name: string;
  image: {
    secure_url:string
  };
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  rate: number;
  imageCover: {
    secure_url: string;
  };
  userId: string;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  category: string;
  price: number;
  imageCover: {
    secure_url: string;
  };
  describtion: string;
}

export interface CartItem {
  productId: {
    _id: string;
    name: string;
    price: number;
    imageCover: {
      secure_url: string;
    };
  };
  quantity: number;
  finalPrice: number;
  desc?: string;
}

export interface ProductDetailsProps {
  _id: string;
  name: string;
  describtion: string;
  price: number;
  subPrice: number;
  images: { secure_url: string }[];
  imageCover: { secure_url: string };
  material: string;
  size: string;
  isAvailable: boolean;
  category: { name: string };
  brand: { name: string };
  stock: number;
  avgRating?: number; // Add
}

export interface ResetPasswordValues {
    email: string;
    code: string;
    password: string;
    cPassword: string;
}

export interface User {
  name: string;
  lastName: string;
  email: string;
  role?: string;
  address?: string;
  image?: { secure_url: string };
}