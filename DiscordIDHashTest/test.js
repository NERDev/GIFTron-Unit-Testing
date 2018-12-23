function get(url) {
    // Set up our HTTP request
    var xhr = new XMLHttpRequest();

    // Setup our listener to process completed requests
    xhr.onload = function () {

        // Process our return data
        if (xhr.status >= 200 && xhr.status < 300) {
            // What do when the request is successful
            record(xhr.responseText);
        } else {
            // What do when the request fails
            console.log('The request failed!');
        }

        // Code that should run regardless of the request status
        //console.log('This always runs...', xhr);
    };

    // Create and send a GET request
    // The first argument is the post type (GET, POST, PUT, DELETE, etc.)
    // The second argument is the endpoint URL
    xhr.open('GET', url);
    xhr.send();
    return xhr.onload;
}

function record(data) {
    let x = alphabet.indexOf(data[0]);
    let y = alphabet.indexOf(data[1]);
    output.push({ x: x, y: y });

    if (output.length == times) {
        console.log(output);
        scatterChart.data.datasets[0].data = output;
        scatterChart.update();
    }
}

let times = 1300;

function startTest() {
    output = [];

    scatterChart.reset();

    for (let i = 0; i < times; i += 1) {
        setTimeout(() => {
            let query = Math.floor(Math.random() * 1000000);
            get('http://test.dev.nerdev.io/DiscordIDHashTest/sharder.php?id=' + query);
        }, 5);
    }
}