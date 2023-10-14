import { IPersonLoginRequestModel } from '../models';

export interface IPersonLogin {
  execute(request: IPersonLoginRequestModel): Promise<{ token: string }>;
}
