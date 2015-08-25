class CreateEvent < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :date
      t.boolean :alcohol_served, default: true
      t.integer :venue_id
      t.integer :band_id
    end
  end
end

