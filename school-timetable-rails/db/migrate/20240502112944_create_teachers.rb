# frozen_string_literal: true

class CreateTeachers < ActiveRecord::Migration[7.1]
  def change
    create_table :teachers, id: false do |t|
      t.integer :teacher_id, limit: 8, null: false, primary_key: true
      t.string :teacher_name, limit: 40

      t.timestamps
    end
  end
end
