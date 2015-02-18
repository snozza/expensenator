require 'sinatra'
require 'sinatra/partial'
require 'json'

require_relative './controllers/application'

set :partial_template_engine, :erb
set :public_folder, Proc.new { File.join(root, '..', 'public') }