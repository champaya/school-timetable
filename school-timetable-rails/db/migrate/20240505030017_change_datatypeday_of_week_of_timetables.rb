class ChangeDatatypedayOfWeekOfTimetables < ActiveRecord::Migration[7.1]
  def change
    change_column :timetables, :day_of_week, :integer, limit: 2
  end
end
