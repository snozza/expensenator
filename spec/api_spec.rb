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

    xit 'a post request has parameters' do
      post '/', {:category => 'taxi', :amount => '1'}.to_json, "CONTENT_TYPE" => "application/json"
      p last_response
      expect(last_response.body).to eq({"category" => 'taxi', "amount" => '1'})
    end

  end
end
