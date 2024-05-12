# frozen_string_literal: true

class RemoveDateFromTimetables < ActiveRecord::Migration[7.1]
  def change
    remove_column :timetables, :created_at, :timestamp
    remove_column :timetables, :updated_at, :timestamp
  end
end
