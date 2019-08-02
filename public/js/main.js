    console.log('running');
    const scrapify = function(tag) {
        $.ajax({
            url: `/api/scrapify/${tag}`,
            type: "GET"
        }).then(function(response) {
            // console.log(response);
            if (response === "No more articles to scrape"){
                // throwModal();
                console.log(response);
            } else {
                displayPosts(response, "#main .articles");
            }
        })
    }
    const displayPosts = (array, target) => {
        // showSpinner();  hide the articles area with a spinner while the posts are loading.
        // $(target).empty();
        array.forEach((article) => {
            console.log(article);
            let card = $('<div>').addClass("card");
            let cardInner = $('<div>').addClass('card-inner');
            let cardBottom = $('<div>').addClass('card-bottom');
            let img = $('<img>').addClass("card-img-top img-thumbnail").attr('src',article.image);
            let h2 = $('<h2>').addClass('text-center lh-title').text(article.title);
            let p = $('<p>').addClass('text-center').text(`Category: ${article.category}`);
            let fav = $('<div>').addClass('favorite').attr('data-id',article._id).attr('title','Add to favorites list');
            let plus = $('<i>').addClass('far fa-plus-square');
            fav.append(plus);
            cardInner.append(img).append(h2);
            cardBottom.append(p);
            card.append(cardInner).append(cardBottom).append(fav);
            $(target).prepend(card);
        })
    }
    $('.scraper').on('click',function(e){
        e.preventDefault();
        console.log('clicked');
        const tag = $(this).attr('id');
        scrapify(tag);
    });
    
