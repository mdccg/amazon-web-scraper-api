import { isAxiosError } from 'axios';
import { Router } from 'express';
import Status from '../enum/Status';
import ProductService from '../services/ProductService';

export const router = Router();
const productService = new ProductService();

router.get('/api/scrape', async (req, res) => {
  const { keyword } = req.query;

  if (!keyword || typeof keyword !== 'string') {
    return res.status(400).json({ error: Status.MALFORMATTED_REQUEST });
  }

  try {
    const scrapeResponse = await productService.getProducts(keyword);
    const { products, total, isFake } = scrapeResponse;
    res.send({ products, total, isFake });

  } catch (error) {
    if (isAxiosError(error) && error.response.status === 503) {
      return res.status(error.response.status).json({ error: Status.BLOCKED_REQUEST });
    }

    res.status(500).json({ error: Status.GENERIC_ERROR });
  }
});