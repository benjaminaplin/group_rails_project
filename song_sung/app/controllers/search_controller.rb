class SearchController < ApplicationController
  def search
    @events = Event.find_by_date(params[:date])
    puts @events
    binding.pry
    redirect_to event_path(@events)
  end
end
