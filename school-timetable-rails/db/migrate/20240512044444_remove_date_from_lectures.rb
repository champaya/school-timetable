# frozen_string_literal: true

class RemoveDateFromLectures < ActiveRecord::Migration[7.1]
  def change
    remove_column :lectures, :created_at, :timestamp
    remove_column :lectures, :updated_at, :timestamp
  end
end
