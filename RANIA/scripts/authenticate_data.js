//This function verifies the requestor is in the access control list on the hub
//Called by 01: receive_data
//update this function as you see fit
//THIS NEEDS TO CHANGE FOR CONNECTING THE DEVICE
function authenticate_data(data_packet) {
    var errorcode = 100
    //query ACL
    //results = query access list with auth_token

    //if the auth_code exists in the ACL
    //if results equals success then:
    //set errorcode to success
    //else:
    //set errorcode
    //end

    return errorcode  //return to 01

}

