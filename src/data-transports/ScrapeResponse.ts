import IProduct from '../interfaces/IProduct';

type ScrapeResponse = {
  products: IProduct[];
  total: number;
  isFake: boolean;
}

export default ScrapeResponse;