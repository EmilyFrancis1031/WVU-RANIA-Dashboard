function delete_key_from_json(json_data){
  if (json_data.hasOwnProperty(data_packet["data"]["k"])) {

    delete json_data[data_packet["data"]["k"]];

    console.log(`Key "${data_packet["data"]["k"]}" deleted successfully from ${db_path}.`);
    response_code = 301
  } else {
    console.log(`Key "${data_packet["data"]["k"]}" not found in ${db_path}. No changes made.`);
  }
  return json_data
}

module.exports = delete_key_from_json