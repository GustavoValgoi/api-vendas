import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import { instanceToInstance } from 'class-transformer';

class UserAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const updateAvatar = new UpdateUserAvatarService();

    const user = await updateAvatar.execute({
      userId: req.user.id,
      avatarFileName: req.file.filename,
    });

    return res.status(200).json(instanceToInstance(user));
  }
}

export default UserAvatarController;
