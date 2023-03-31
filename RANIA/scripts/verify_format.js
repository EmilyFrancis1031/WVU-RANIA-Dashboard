//This function verifies that the data_packet is in a valid format and returns an error code based on certain conditions
//Called by 01: receive_data
export function verify_format(data_packet) {
    errorcode = 200

    //if data_packet['meta_data'] exists then:
    if(data_packet['meta_data']!=null){
        //if data_packet['meta_data']['instruction'] exists then:
        if(data_packet['meta_data']['instruction']!=null){
            //if data_packet['meta_data']['instruction'] is valid then:
            if(data_packet['meta_data']['instruction']!=null){
                //if data_packet['meta_data']['auth_token'] exists then:
                if(data_packet['meta_data']['auth_token']!=null){
                    //if data_packet['meta_data]['sender'] exists then:
                    if(data_packet['meta_data']['sender']!=null){
                        //if data_packet['data'] exists then:
                        if(data_packet['data']!=null){
                           errorcode = 1; //set errorcode to success
                        }
                        else{
                            errorcode = 207; //else no data
                        }
                    }
                    else{
                        errorcode = 206; //else sender is missing
                    }
                }
                else{
                    errorcode = 205; // else auth_token is missing
                }    
            }
            else{
                errorcode = 203; //else instruction is not valid
            }
        }
        else{
            errorcode = 202; //else no instruction in metadata
        }
    }
    else{
        errorcode = 201; //else meta_data does not exist
    }  
    return errorcode //return to 01
}