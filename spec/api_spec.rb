require 'spec_helper'
require 'rack/test'

describe 'Server Routes' do 

  include Rack::Test::Methods

  def app
    Sinatra::Application
  end

  context 'Routing to the homepage' do

    it 'a get request returns an ok status' do
      get '/'
      expect(last_response).to be_ok
    end

    it 'a post request returns an ok status' do
      post '/'
      expect(last_response).to be_ok
    end

    it 'a post request has parameters' do
      post '/', JSON.parse('{"dataIn": "hello"}')
      expect(JSON.parse(last_response.body)).to include "dataIn"
    end

  end
end
