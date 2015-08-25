class VenuesController < ApplicationController
  before_action :set_venue, only: [:show, :edit, :update, :destroy]

  def index
    @venues = Venue.all
  end

  def show
    @venue = Venue.find(params[:id])
    @events = Event.all
  end

  def new
    @venue = Venue.new
  end

end
