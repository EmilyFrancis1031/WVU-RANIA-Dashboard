async function insertData(url = "") {
    title = document.getElementById("eventTitle").value;
    date = document.getElementById("eventDate").value;
    time = document.getElementById("eventTime").value;

    data = '{title: ' + title + ', date: ' + date + ', time: ' + time +'}';

    console.log(url);
    console.log(data);

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
