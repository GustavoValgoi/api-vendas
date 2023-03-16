import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

class ListCustomerService {
  public async execute(): Promise<Customer[]> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customers = customersRepository.find();

    if (!customers) {
      throw new AppError('Customers not found.', 404);
    }

    return customers;
  }
}

export default ListCustomerService;
