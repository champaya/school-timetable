/** 定数ファイル */
export namespace CONSTANT {
  /** ルーティング設定 */
  export namespace ROUTE {
    export const DEFAULT = "/";
    export const USER_TIMETABLE = "user-timetable";
    export const LECTURES = "lectures";
  }
  /** APIエンドポイント */
  export namespace API {
    export const BASE = "http://localhost:3000/api/v1/";
    export const USERS = "users/";
    export const TIMETABLES = "timetables/";
  }

  /** 前期/後期 */
  export namespace PERIOD {
    export const EARLY = 1;
    export const LATE = 2;
  }
}
