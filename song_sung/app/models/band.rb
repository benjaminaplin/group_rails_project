class Band < ActiveRecord::Base
 has_many :events
 has_many :bands, :through => :events
<<<<<<< HEAD
end
=======

end
>>>>>>> 33e7cd86cc6b94e1d0712b1baa382dcd61a362d0
