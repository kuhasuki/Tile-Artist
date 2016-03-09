class Picture < ActiveRecord::Base
	validates :title, :user_id, :size, :grid, presence: true
	validates :size, numericality: { only_integer: true, greater_than: 0, less_than: 26 }
	belongs_to :user
end
