# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Band.create(name: 'queen', genre: 'rockin jazz', explicit_lyrics: true)
Venue.create(name: 'barn', city: 'st louis', state: 'MO', family_friendly: false)
Event.create(date: '4/5/6', alcohol_served: true, venue_id: 1, band_id: 1)