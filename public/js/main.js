    console.log('running');
    const scrapify = function(tag) {
        $.ajax({
            url: `/api/scrapify/${tag}`,
            type: "GET"
        }).then(function(response) {
            console.log(response);
        })
    }
    const displayPosts = (array, target) => {
        $(target).empty();
        array.forEach((article) => {
            console.log(article);
        })
    }
    $('.scraper').on('click',function(e){
        e.preventDefault();
        console.log('clicked');
        const tag = $(this).attr('id');
        scrapify(tag);
    });
    
