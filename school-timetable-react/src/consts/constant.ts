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
    export const USERS = "users";
    export const TIMETABLES = "timetables";
    export const LECTURES = "lectures";
    export const SIGN_IN = "auth/sign_in";
    export const SIGN_OUT = "auth/sign_out";
    export const PASSWORD = "auth/password";
  }

  /** エラーメッセージ */
  export namespace ERROR_MESSAGE {
    export const AUTH_PASSWORD_POST =
      "パスワード変更用のメールの送付ができませんでした。";
    export const AUTH_PASSWORD_PUT = "パスワード変更に失敗しました。";
    export const AUTH_SIGN_IN_POST =
      "ログインに失敗しました。emailとパスワードをお確かめください。";
    export const AUTH_SIGN_OUT_DELETE = "ログアウトに失敗しました。";
    export const LECTURES_GET = "授業データの取得に失敗しました。";
    export const TIMETABLES_GET = "時間割データの取得に失敗しました。";
    export const TIMETABLES_POST =
      "授業の登録に失敗しました。同じ時間・曜日にすでに授業が登録されていないかご確認ください。";
    export const TIMETABLES_DELETE =
      "授業の削除に失敗しました。授業が登録されていることをご確認ください。";
    export const CUSTOME_ERROR_450 =
      "他の人の時間割を閲覧・登録・削除しようとしています。ログインしなおしてください。";
  }

  /** エラーコード */
  export namespace ERROR_CODE {
    export const OPERATION_OTHERS = 450;
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
