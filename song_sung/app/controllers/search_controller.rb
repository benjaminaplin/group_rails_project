class SearchController < ApplicationController
  def search
    @events = Event.find_by_date(params[:date])
    redirect_to event_path(@events)
  end
end
