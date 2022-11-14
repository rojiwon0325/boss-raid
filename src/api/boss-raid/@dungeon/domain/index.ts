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
    /**
     * 던전 제한시간
     */
    limit_seconds: number;

    levels: LevelEntity[];
  }
}

export interface Dungeon {
  readonly get: (
    props: Pick<Dungeon.State, 'levels' | 'limit_seconds'>,
  ) => Dungeon.State;
}

export const Dungeon: Dungeon = {
  get(props) {
    const { levels, limit_seconds } = props;
    return {
      limit_seconds,
      levels,
    };
  },
};
