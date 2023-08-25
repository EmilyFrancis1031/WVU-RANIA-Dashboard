function delete_key_from_json(json_data, data_packet){
  var response_code = 31;
  if (json_data.hasOwnProperty(data_packet["data"]["k"])) {

    delete json_data[data_packet["data"]["k"]];

    response_code = 30
  } else {
    response_code = 31
  }
  return response_code
}

module.exports = delete_key_from_json