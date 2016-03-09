class CreatePictures < ActiveRecord::Migration
  def change
    create_table :pictures do |t|
    	t.string :title, null: false
    	t.integer :user_id, null: false
    	t.integer :size, null: false
    	t.string :base, null: false
    	t.json :grid, null: false
      t.timestamps null: false
    end
    add_index(:pictures, :user_id)
  end
end
