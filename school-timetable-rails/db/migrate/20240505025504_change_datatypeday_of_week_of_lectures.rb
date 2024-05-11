# frozen_string_literal: true

class ChangeDatatypedayOfWeekOfLectures < ActiveRecord::Migration[7.1]
  def change
    change_column :lectures, :day_of_week, :integer, limit: 2
  end
end
