class EventsController < ApplicationController

  def index
  end

  def new
    @venue = Venue.find(params[:venue_id])
    @band = Band.find(params[:band_id])
    @event = Event.new
  end

  def create
    @venue = Venue.find(params[:venue_id])
    @event = Event.create(event_params)
    redirect_to venue_path(@venue)
  end

end
