class SearchController < ApplicationController
  def search
    @events = Event.find_by date: params[:query]
    redirect_to event_path(@events)
    binding.pry
  end
end
