get '/' do
  erb :index
end

post '/' do
  fields = Rack::Utils.parse_nested_query(params[:fields])
  data = params[:data]
  filename = params[:filename]
 
  ## Decode the image
  data_index = data.index('base64') + 7
  filedata = data.slice(data_index, data.length)
  decoded_image = Base64.decode64(filedata)
   
  ## Write the file to the system
  file = File.new("public/uploads/#{filename}", "w+")
  file.write(decoded_image)
  params[:path] = "/uploads/#{filename}"
  params[:fields] = fields
  params.to_json
end  

