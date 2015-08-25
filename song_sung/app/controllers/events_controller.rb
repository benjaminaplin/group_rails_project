class EventsController < ApplicationController
  def new
    @venue = Venue.find(params[:venue_id])
end
