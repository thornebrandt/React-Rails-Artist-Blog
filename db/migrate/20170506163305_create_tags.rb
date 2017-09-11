class CreateTags < ActiveRecord::Migration[5.0]
  def change
    create_table :tags do |t|
      t.string :name
      t.text :description
      t.string :color
      t.text :icon

      t.timestamps
    end
  end
end
