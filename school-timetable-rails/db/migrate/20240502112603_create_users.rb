# frozen_string_literal: true

class CreateUsers < ActiveRecord::Migration[7.1]
  def change
    create_table :users, id: false do |t|
      t.integer :user_id, limit: 8, null: false, primary_key: true
      t.string :user_name, limit: 40
      t.string :password, limit: 40

      t.timestamps
    end
  end
end
