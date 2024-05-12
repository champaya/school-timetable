# frozen_string_literal: true

class DropUsers < ActiveRecord::Migration[7.1]
  def change
    drop_table :users
  end
end
