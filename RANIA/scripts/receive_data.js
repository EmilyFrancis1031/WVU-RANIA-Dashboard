//This function is called by the route that receives all requests from devices
//It verifies the data is in a correct format, authenticates that the request is from a valid source, and executes the request command
//A status code and message is returned to sender

/*include messsage_list.json // box 10
auth = 0
format = 0

format = verify_format(data_packet) //box 02
if format equals 1 then:
  auth = authenticate_data(data_packet) //box 03
    if auth equals 1 then:
      //if validated and authenticated, call                instruction in data_packet
      //see boxes 20-29
      data_packet['instruction'](data_packet)
    else
      set errorcode
    end
else
  set errorcode
end

send status code and message to requestor*/