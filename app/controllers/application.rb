get '/' do
  erb :index
end

post '/' do
  params.to_json
end
