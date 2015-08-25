class SearchController < ApplicationController
  def search
    @events = Event.find_by_date(params[:date])
    binding.pry
    redirect_to event_path(@events.id)
  end
end
