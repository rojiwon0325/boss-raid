# PVE Game Boss Raid server

<div align=center>

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=plastic&logo=nestjs&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=plastic&logo=mysql&logoColor=white)

[![Test Status](https://github.com/rojiwon0325/boss-raid/actions/workflows/push_cov_report.yml/badge.svg)](https://github.com/rojiwon0325/boss-raid/actions/workflows/push_cov_report.yml)
[![Test Coverage](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/rojiwon0325/e9d685dac7c70dfad1305ce9d8174a29/raw/coverage_boss_raid.json)](https://rojiwon0325.github.io/boss-raid)

</div>

## 요구사항 분석

### 유저

- 보스레이드 구현 후 수정

### 보스레이드

- 입장 가능 상태, 현제 진행 유저 정보 등이 있다.
- 한 번에 한 명의 유저만 진행할 수 있다.
- 이전에 시작 기록이 있다면 레이드 종료 혹은 레이드 제한 시간 경과해야 시작할 수 있다.

<details>
<summary>API</summary>

- 보스 레이드 상태 조회
- 보스 레이드 랭킹 조회
  - totalScore 내림차순, score, userid를 포함
- 보스 레이드 시작
  - 시작할 수 있으면 레이드 레코드를 생성한다.
- 보스 레이드 종료
  - 레이드 level에 따른 score를 반영한다.
  - 레이드 중인 사용자가 아니면 예외 처리
  - 제한 시간이 경과한 경우 예외 처리

</details>

## 설계도

### 보스 레이드 상태 조회

| 분류     | 내용                                         |
| -------- | -------------------------------------------- |
| method   | `GET`                                        |
| path     | {BASE_URL}/bossRaid                          |
| response | { canEnter: boolean, enteredUserId: number } |

### 보스 레이드 랭킹 조회

| 분류     | 내용                                                             |
| -------- | ---------------------------------------------------------------- |
| method   | `GET`                                                            |
| path     | {BASE_URL}/bossRaid/topRankerList                                |
| body     | { userId: number }                                               |
| response | { topRankerInfoList: RankingInfo[], myRankingInfo: RankingInfo } |

```typescript
interface RankingInfo {
  ranking: number; // 1 ranking 0 . userId: number;
  totalScore: number;
}
```

### 보스 레이드 시작

| 분류     | 내용                                         |
| -------- | -------------------------------------------- |
| method   | `POST`                                       |
| path     | {BASE_URL}/bossRaid/enter                    |
| body     | { userId: number, level: number }            |
| response | { isEntered: boolean, raidRecordId: number } |

![boss_raid_enter](https://user-images.githubusercontent.com/68629004/201506755-c22e1a19-6a44-4fce-b2f5-97846e63c91c.png)

### 보스 레이드 종료

| 분류     | 내용                                     |
| -------- | ---------------------------------------- |
| method   | `PATCH`                                  |
| path     | {BASE_URL}/bossRaid/end                  |
| body     | { userId: number, raidRecordId: number } |
| response | {}                                       |

![boss_raid_end](https://user-images.githubusercontent.com/68629004/201506965-7b590154-5546-45e8-a2f7-cdb521336836.png)

## API 문서

- [View in the `Swagger Editor`](https://editor.swagger.io/?url=https://raw.githubusercontent.com/rojiwon0325/boss-raid/main/doc/swagger.json)

## 진행상황

- [ ] 보스 레이드 상태 조회 API 구현
- [ ] 보스 레이드 시작 API 구현
- [ ] 보스 레이드 종료 API 구현
