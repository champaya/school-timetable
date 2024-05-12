# frozen_string_literal: true

class ChangeDatatypeuserIdTimetables < ActiveRecord::Migration[7.1]
  def change
    change_column :timetables, :user_id, :string, limit: 255
  end
end
