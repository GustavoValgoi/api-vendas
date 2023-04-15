import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import CreateSessionsService from '../services/CreatesSessionsService';

class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const createSession = new CreateSessionsService();

    const session = await createSession.execute({ email, password });

    return res.status(200).json(instanceToInstance(session));
  }
}

export default SessionsController;
