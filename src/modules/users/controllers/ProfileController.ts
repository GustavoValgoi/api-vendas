import { Request, Response } from 'express';
import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';

class ProfileController {
  public async show(req: Request, res: Response): Promise<Response> {
    const showProfile = new ShowProfileService();

    const user_id = req.user.id;

    const user = await showProfile.execute({ user_id });

    return res.status(200).json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, email, password, old_password } = req.body;
    const user_id = req.user.id;

    const updateProfile = new UpdateProfileService();

    const user = await updateProfile.execute({
      name,
      email,
      password,
      old_password,
      user_id,
    });

    return res.status(201).json(user);
  }
}

export default ProfileController;
