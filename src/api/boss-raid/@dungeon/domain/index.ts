export namespace Dungeon {
  export type Id = number;

  export interface LevelEntity {
    /**
     * 가장 낮은 레벨은 0
     */
    level: number;
    /**
     * 가장 낮은 점수는 0
     */
    score: number;
  }

  export interface State {
    id: Id;
    /**
     * 던전 제한시간
     */
    limit_seconds: number;

    levels: LevelEntity[];
  }
}

// type Required = keyof Pick<Dungeon.State, 'levels' | 'limit_seconds'>;

export interface Dungeon {
  readonly get: () => Dungeon.State;
}

export const Dungeon: Dungeon = {
  get() {
    return {
      id: 1,
      limit_seconds: 100,
      levels: [
        { level: 0, score: 20 },
        { level: 1, score: 47 },
        { level: 2, score: 85 },
      ],
    };
  },
};
