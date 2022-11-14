import { Controller, Get, Inject, Post } from '@nestjs/common';
import { UserUsecase } from '@USER/application/adapter/user.usecase';
import { IUserUsecase } from '@USER/application/port/user.usecase.port';
import helper from 'nestia-helper';

@Controller('users')
export class UserController {
  constructor(
    @Inject(UserUsecase)
    private readonly usecase: IUserUsecase,
  ) {}

  /**
   * 사용자 생성 API
   * @tag user
   * @returns 생성된 사용자 id
   */
  @Post()
  create() {
    return this.usecase.create();
  }

  /**
   * 사용자 기록 조회 API
   * @tag user
   * @param id 사용자 id
   * @returns 사용자 레이드 기록
   */
  @Get(':user_id')
  findOne(@helper.TypedParam('user_id', 'number') id: number) {
    return this.usecase.findOne({ id });
  }
}
