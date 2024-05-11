/** 定数ファイル */
export namespace CONSTANT {
  /** ルーティング設定 */
  export namespace ROUTE {
    export const DOMAIN = import.meta.env.VITE_ROUTE_BASE;
    export const DEFAULT = "/";
    export const USER_TIMETABLE = "/user-timetable";
    export const LECTURES = "/lectures";
    export const RESET_PASSWORD = "/reset-password";
    export const CHANGE_PASSWORD = "/change-password";
  }
  /** APIエンドポイント */
  export namespace API {
    export const BASE = import.meta.env.VITE_API_BASE;
    export const USERS = "users/";
    export const TIMETABLES = "timetables/";
    export const LECTURES = "lectures/";
    export const Auth = "auth/";
    export const SIGN_IN = "sign_in/";
    export const SIGN_OUT = "sign_out/";
    export const PASSWORD = "password/";
  }

  /** cookie */
  export namespace COOKIES {
    export const UID = "_uid";
    export const CLIENT = "_client";
    export const ACCESS_TOKEN = "_access-token";
    export const ID = "_id";
  }

  /** 授業ID */
  export namespace LECTURE_ID {
    export const ALL = { label: "", value: -1 };
  }

  /** 前期/後期 */
  export namespace PERIOD {
    export const ALL = { label: "すべて", value: -1 };
    export const EARLY = { label: "前期", value: 1 };
    export const LATE = { label: "後期", value: 2 };
  }

  /** 曜日 */
  export namespace DAY_OF_WEEk {
    export const ALL = { label: "すべて", value: -1 };
    export const MONDAY = { label: "月", value: 1 };
    export const TUESDAY = { label: "火", value: 2 };
    export const WEDNESDAY = { label: "水", value: 3 };
    export const THURSDAY = { label: "木", value: 4 };
    export const FRIDAY = { label: "金", value: 5 };
  }

  /** 時間 */
  export namespace TIME {
    export const ALL = { label: "すべて", value: -1 };
    export const FIRST_CLASS = { label: "1時限目", value: 1 };
    export const SECOND_CLASS = { label: "2時限目", value: 2 };
    export const THIRD_CLASS = { label: "3時限目", value: 3 };
    export const FOURTH_CLASS = { label: "4時限目", value: 4 };
    export const FIFTH_CLASS = { label: "5時限目", value: 5 };
  }
}
