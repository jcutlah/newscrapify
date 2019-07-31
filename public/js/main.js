    console.log('running');
    const scrapify = function() {
        $.ajax({
            url: "/api/scrapify",
            type: "GET"
        }).then(function(response) {
            console.log(response);
        })
    }
    scrapify();
