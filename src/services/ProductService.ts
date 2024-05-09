import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, isAxiosError } from 'axios';
import dotenv from 'dotenv';
import { JSDOM } from 'jsdom';
import ScrapeResponse from '../data-transports/ScrapeResponse';
import predefinedProducts from '../data/sample.json';
import IProduct from '../interfaces/IProduct';
import { parseNumber } from '../utils';

dotenv.config();

class ProductService {
  private _http: AxiosInstance;

  constructor() {
    this._http = axios.create({ baseURL: process.env.AMAZON_API_BASE_URL });
  }

  async getProducts(search: string): Promise<ScrapeResponse> {
    const config: AxiosRequestConfig = {
      params: {
        [process.env.AMAZON_API_QUERY_PARAMETER]: search
      }
    };

    try {
      const response: AxiosResponse<string> = await this._http.get(process.env.AMAZON_API_PATH_NAME, config);
      const dom = new JSDOM(response.data);
      const nodeList = dom.window.document.querySelectorAll('[data-component-type="s-search-result"]');
      const products: IProduct[] = [];

      for (const productDiv of nodeList) {
        const title = productDiv.querySelector('.a-size-base-plus.a-color-base.a-text-normal').innerHTML as string;
        const imageURL = productDiv.querySelector('img').src as string;
        const spanGroup = productDiv.querySelectorAll('.a-row.a-size-small span');

        let rating: number | undefined;
        let numberOfReviews: number | undefined;

        if (spanGroup.length === 5) {
          const rawRating = spanGroup[0].ariaLabel as string;          // "4,7 de 5 estrelas"
          const rawNumberOfReviews = spanGroup[3].ariaLabel as string; // "1.024 avaliações"

          rating = parseNumber(rawRating.split(' ')[0]);                   // "4,7" -> 4.7
          numberOfReviews = parseNumber(rawNumberOfReviews.split(' ')[0]); // "1.024" -> 1024
        }

        const product: IProduct = { title, imageURL, rating, numberOfReviews };
        products.push(product);
      }

      const scrapeResponse: ScrapeResponse = {
        products,
        total: products.length,
        isFake: false
      };

      return scrapeResponse;

    } catch (error) {
      if (isAxiosError(error) && error.response.status === 503 && process.env.BYPASS_SERVER_ERROR_STATUS_CODE === 'true') {
        const scrapeResponse: ScrapeResponse = {
          products: predefinedProducts,
          total: predefinedProducts.length,
          isFake: true
        };

        return scrapeResponse;
      }

      throw error;
    }
  }
}

export default ProductService;