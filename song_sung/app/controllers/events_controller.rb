class EventsController < ApplicationController

  def index
    @venue = Venue.find(params[:venue_id])
    @events = @venue.events
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

  def show
    @event = Event.find(params[:id])
  end

  private
  def event_params
    params
      .require(:event)
      .permit(:date, :alcohol_served, :venue_id, :band_id)
      .merge({venue_id: params[:venue_id]})
  end

end
