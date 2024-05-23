// convert image to base64
export const convertToBase64 = (file: File) : Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

//response type
export interface IResponse {
  success : boolean,
  message : string,
  data : any,
  token : string,
}

export interface IProductModel {
  _id : string,
  image : string,
  title: string,
  description: string,
  price: string,
  category: string,
  createdAt: string,
  updatedAt: string,
}

export interface IProductInCartModel {
  productId : string,
  title: string,
  description: string,
  price: number,
  image: string,
  quantity: number,
  productPrice: number,
  some?: any,
  reduce?: any,
  findIndex?: any,
  filter?: any,
  map? : any,
  length?: any,
}

export interface ICartDetailsModel {
  userId: string ,
  products : IProductInCartModel,
  totalItems : number ,
  totalPrice : number ,
}
