import { TypeOrmBaseRepository } from '@COMMON/base/base-repository.typeorm';
import { IEntityMapper } from '@COMMON/interface/mapper.interface';
import { if_not_null } from '@COMMON/util';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@USER/domain';
import { Repository } from 'typeorm';
import { IUserRepository } from '../port/user.repository.port';
import { UserEntity } from './user.entity';
import { UserEntityMapper } from './user.mapper';

@Injectable()
export class UserRepository
  extends TypeOrmBaseRepository<User.State, UserEntity>
  implements IUserRepository
{
  constructor(
    @Inject(UserEntityMapper)
    mapper: IEntityMapper<User.State, UserEntity>,
    @InjectRepository(UserEntity)
    repository: Repository<UserEntity>,
  ) {
    super(mapper, repository);
  }

  async findOne({ id }: Pick<User.State, 'id'>): Promise<User.State | null> {
    const entity = await this.getRepository().findOne({
      where: { id },
      relations: { ranks: { record: true } },
    });
    return if_not_null(entity, this.getMapper().toAggregate);
  }
}
