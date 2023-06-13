async function insertData(url = "") {
    title = document.getElementById("eventTitle").value;
    date = document.getElementById("eventDate").value;
    time = document.getElementById("eventTime").value;

    data = '{title: ' + title + ', date: ' + date + ', time: ' + time +'}';

    console.log(url);
    console.log(data);

    // const response = fetch('/data/upsert_data',{
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({meta_data:{
    //               auth_token: "01",
    //               sender: "Localhost",
    //             },
    //            data:{
    //             device_name: "acl",
    //             db_name: "pending_connections",
    //             k: deviceName,
    //             v: data
    //            }})
    // })

    // const response = await fetch(url, {
    //   method: "POST",
    //   mode: "cors",
    //   cache: "no-cache",
    //   credentials: "same-origin",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   redirect: "follow",
    //   referrerPolicy: "no-referrer",
    //   body: JSON.stringify(data),
    // });
    // return response.json();
}
