/** 定数ファイル */
export namespace CONSTANT {
  /** ルーティング設定 */
  export namespace ROUTE {
    export const DEFAULT = "/";
    export const USER_TIMETABLE = "/user-timetable";
    export const LECTURES = "/lectures";
  }
  /** APIエンドポイント */
  export namespace API {
    export const BASE = "http://localhost:3000/api/v1/";
    export const USERS = "users/";
    export const TIMETABLES = "timetables/";
    export const LECTURES = "lectures/";
  }

  /** 前期/後期 */
  export namespace PERIOD {
    export const EARLY = { label: "前期", value: 1 };
    export const LATE = { label: "後期", value: 2 };
  }

  /** 曜日 */
  export namespace DAY_OF_WEEk {
    export const MONDAY = { label: "月", value: 1 };
    export const TUESDAY = { label: "火", value: 2 };
    export const WEDNESDAY = { label: "水", value: 3 };
    export const THURSDAY = { label: "木", value: 4 };
    export const FRIDAY = { label: "金", value: 5 };
  }

  /** 時間 */
  export namespace TIME {
    export const FIRST_CLASS = { label: "1時限目", value: 1 };
    export const SECOND_CLASS = { label: "2時限目", value: 2 };
    export const THIRD_CLASS = { label: "3時限目", value: 3 };
    export const FOURTH_CLASS = { label: "4時限目", value: 4 };
    export const FIFTH_CLASS = { label: "5時限目", value: 5 };
  }
}
