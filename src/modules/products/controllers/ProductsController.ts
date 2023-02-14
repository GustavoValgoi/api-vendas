import { Request, Response } from 'express';
import CreateProductService from '../services/CreateProductService';
import DeleteProductService from '../services/DeleteProductService';
import ListProductService from '../services/ListProductService';
import ShowProductService from '../services/ShowProductService';
import UpdateProductService from '../services/UpdateProductService';
import Product from '../typeorm/entities/Product';

class ProductsController {
  public async index(
    req: Request,
    res: Response,
  ): Promise<Response<Product[]>> {
    const listProducts = new ListProductService();

    const products = await listProducts.execute();

    return res.status(200).json(products);
  }

  public async show(
    req: Request,
    res: Response,
  ): Promise<Response<Product | undefined>> {
    const { id } = req.params;

    const showProduct = new ShowProductService();

    const product = await showProduct.execute({ id });

    return res.status(200).json(product);
  }

  public async create(
    req: Request,
    res: Response,
  ): Promise<Response<Product | undefined>> {
    const { name, price, quantity } = req.body;

    const createProduct = new CreateProductService();

    const product = await createProduct.execute({ name, price, quantity });

    return res.status(201).json(product);
  }

  public async update(
    req: Request,
    res: Response,
  ): Promise<Response<Product | undefined>> {
    const { name, price, quantity } = req.body;
    const { id } = req.params;

    const updateProduct = new UpdateProductService();

    const product = await updateProduct.execute({ id, name, price, quantity });

    return res.status(200).json(product);
  }

  public async delete(req: Request, res: Response): Promise<Response<void>> {
    const { id } = req.params;

    const deleteProduct = new DeleteProductService();

    await deleteProduct.execute({ id });

    return res.status(200).json({ message: 'Product deleted with success.' });
  }
}

export default ProductsController;
