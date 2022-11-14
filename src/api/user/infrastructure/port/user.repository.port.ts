import { IBaseRepository } from '@COMMON/interface/base-repository.interface';
import { User } from '@USER/domain';

export type IUserRepository = IBaseRepository<User.Id, User.State>;
