class CreateVenue < ActiveRecord::Migration
  def change
    create_table :venues do |t|
      t.string :name
      t.city :string
      t.state :string
      t.family_friendly :boolean, default: false
    end
  end
end
