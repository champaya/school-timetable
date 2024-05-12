# frozen_string_literal: true

class AddIndexLectures < ActiveRecord::Migration[7.1]
  def change
    add_index :lectures, %i[day_of_week time period teacher_id], unique: true
  end
end
