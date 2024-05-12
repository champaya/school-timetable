# frozen_string_literal: true

class AddIndexTimetables < ActiveRecord::Migration[7.1]
  def change
    add_index :timetables, %i[day_of_week time period user_id], unique: true
  end
end
