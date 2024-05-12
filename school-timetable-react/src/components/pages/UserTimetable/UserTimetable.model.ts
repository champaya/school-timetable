export interface GetTimeTable {
  day_of_week?: number;
  time?: number;
  period?: number;
  lecture_id?: number;
  lecture_name?: string;
  credit_count?: number;
  teacher_name?: string;
}

export interface DisplayTimeTable {
  monday: GetTimeTable;
  tuesday: GetTimeTable;
  wednesday: GetTimeTable;
  thursday: GetTimeTable;
  friday: GetTimeTable;
}
