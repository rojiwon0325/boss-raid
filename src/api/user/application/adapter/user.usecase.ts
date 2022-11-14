import { Inject, Injectable } from '@nestjs/common';
import { User } from '@USER/domain';
import { UserRepository } from '@USER/infrastructure/adapter/user.repository';
import { IUserRepository } from '@USER/infrastructure/port/user.repository.port';
import { IUserService } from '../port/user.service.port';
import { IUserUsecase } from '../port/user.usecase.port';
import { UserService } from './user.service';

@Injectable()
export class UserUsecase implements IUserUsecase {
  constructor(
    @Inject(UserService)
    private readonly userService: IUserService,
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async findOne({
    id,
  }: IUserUsecase.FindOne): Promise<IUserUsecase.FindOneResponse> {
    const { total_score, boss_raid_history } = await this.userService.findOne({
      id,
    });
    return {
      totalScore: total_score,
      bossRaidHistory: boss_raid_history.map(
        ({ score, id: raidRecordId, enter_time, end_time }) => ({
          raidRecordId,
          score,
          enterTime: enter_time.toLocaleString(),
          endTime: end_time.toLocaleString(),
        }),
      ),
    };
  }

  async create(): Promise<IUserUsecase.CreateResponse> {
    const user = User.get({ boss_raid_history: [] });
    const { id } = await this.userRepository.save(user);
    return { userId: id };
  }
}
