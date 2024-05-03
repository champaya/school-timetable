# frozen_string_literal: true

class CreateLectures < ActiveRecord::Migration[7.1]
  def change
    create_table :lectures, id: false do |t|
      t.integer :lecture_id, limit: 8, null: false, primary_key: true
      t.string :lecture_name, limit: 60
      t.text :lecture_overview
      t.integer :credit_count, limit: 2
      t.string :day_of_week, limit: 20
      t.integer :time, limit: 2
      t.integer :period, limit: 1
      t.integer :teacher_id, limit: 8

      t.timestamps
    end

    # @todo uniqueの制約を持たせたい
    # add_index :keywords, %i[day_of_week time period teacher_id], unique: true
  end
end
