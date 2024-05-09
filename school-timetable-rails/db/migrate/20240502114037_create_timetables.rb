# frozen_string_literal: true

class CreateTimetables < ActiveRecord::Migration[7.1]
  def change
    create_table :timetables, id: false, primary_key: %i[user_id day_of_week time period] do |t|
      t.integer :user_id, limit: 8, null: false
      t.string :day_of_week, limit: 20
      t.integer :time, limit: 2
      t.integer :period, limit: 1
      t.integer :lecture_id, limit: 8

      t.timestamps
    end
  end
end
