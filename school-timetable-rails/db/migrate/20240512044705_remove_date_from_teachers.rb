# frozen_string_literal: true

class RemoveDateFromTeachers < ActiveRecord::Migration[7.1]
  def change
    remove_column :teachers, :created_at, :timestamp
    remove_column :teachers, :updated_at, :timestamp
  end
end
