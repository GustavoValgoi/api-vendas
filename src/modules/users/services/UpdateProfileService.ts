import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { compare, hash } from 'bcryptjs';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UserRepository';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

class UpdateProfileService {
  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    const userUpdateEmail = await usersRepository.findByEmail(email);

    if (userUpdateEmail && userUpdateEmail.id !== user_id) {
      throw new AppError('There is already one user with this email.', 401);
    }

    if (password && !old_password) {
      throw new AppError('Old password is required.', 422);
    }

    if (password && old_password) {
      const checkOldPass = await compare(old_password, user.password);

      if (!checkOldPass) {
        throw new AppError('Old password does not match.', 401);
      }

      user.password = await hash(password, 12);
    }

    user.name = name;
    user.email = email;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
