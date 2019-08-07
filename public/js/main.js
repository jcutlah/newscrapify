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
            let card = $('<div>').addClass("card").attr('data-category',article.category);
            let cardInner = $('<div>').addClass('card-inner');
            let cardBottom = $('<div>').addClass('card-bottom');
            let img = $('<img>').addClass("card-img-top img-thumbnail").attr('src',article.image);
            let h2 = $('<h2>').addClass('text-center lh-title').text(article.title);
            let p = $('<p>').addClass('text-center').text(`Category: ${article.category}`);
            let fav = $('<div>').addClass('favorite').attr('data-id',article._id).attr('title','Add to favorites list');
            let plus = $('<i>').addClass('far fa-plus-square');
            let comment = $("<div>").addClass("add-comment").attr('data-id',article._id).attr('title',"Comment on this post").attr('data-target','#comments').attr('data-toggle','modal');
            let quote = $('<i>').addClass('fas fa-quote-right');
            comment.append(quote);
            fav.append(plus);
            cardInner.append(img).append(h2);
            cardBottom.append(p);
            card.append(cardInner).append(cardBottom).append(fav).append(comment);
            $(target).prepend(card);
        })
    }
    const displayFavorites = () => {
        console.log("running displayFavorites()");
        $('#favorites').empty();
        $.ajax({
            url: "/api/favorites",
            type: "GET"
        }).then(function(response){
            console.log(response);
            displayPosts(response,"#favorites");
        })
    }
    const displayComments = (post) => {
        let comments = $('#comment-wrapper');
        console.log(post.notes);
        $('#post-title').text(post.title);
        post.notes.length > 0 ?
        post.notes.forEach(note => {
            console.log(note);
            let comment = $(`<li>`).attr('class','comment').text(note.comment);
            let timestamp = $('<div>').attr('class','timestamp').html(`<small>${note.createdAt}</small>`);
            $('#comments-list').append(comment.append(timestamp));
        }) :
        $('#comments-list').append($('<li>').text("No comments to show for this post"));
    }
    const getPostComments = (id) => {
        console.log(`running getPostComments() for post with id ${id}`);
        $.ajax({
            url: `/api/comments/${id}`,
            type: "GET"
        }).then(function(response){
            let commentsList = $('#comments-list');
            commentsList.empty();
            console.log(response);
            displayComments(response[0]);
        })
    }
    const submitComment = (comment) => {
        console.log('submittin comment');
        $.ajax({
            type: "POST",
            url: `api/comments/${comment.id}`,
            data: {message: comment.comment}
        }).then(function(response){
            console.log(response);
            $('#add-comment').val('');
            getPostComments(comment.id);
        })
    }
    $('.scraper').on('click',function(e){
        e.preventDefault();
        console.log('clicked');
        const tag = $(this).attr('id');
        scrapify(tag);
    });
    $(document).on('click','.favorite',function(e){
        console.log('favorite clicked');
        const id = $(this).attr('data-id');
        $.ajax({
            type: "PUT",
            url: `/api/favorite/${id}`,
            data: {}
        }).then(function(response){
            console.log(response);
            displayFavorites();
        })
    });
    $(document).on('click','.add-comment',function(e){
        console.log('add comment clicked');
        let id = $(this).attr('data-id');
        $('#comments').attr('data-id',id);
        getPostComments(id);

    });
    $('#comments form').on('submit',function(e){
        e.preventDefault();
        let id = $('#comments').attr('data-id');
        let message = $('#add-comment').val();
        console.log(message);
        console.log(id);
        submitComment({id,comment:message});
    });
    
    // ####### ON PAGE LOAD ####### //

    displayFavorites();
