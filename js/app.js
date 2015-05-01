$(function() {
    if($('body').hasClass('js')) {

        // ANIMATIONS
        $('.logo object').addClass('scaleInOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).animate({
                left: 0,
                marginLeft: 0},
                400, function() {
                 $(this).next().addClass('fadeInDown').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
                    $(this).css({
                        opacity : 1
                    });
                      $('form').addClass('fadeInUp').css({opacity : 1});
                 });
            });
        });
        // $('.logo object').addClass('bounceIn animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        //     $(this).animate({
        //         left: 0,
        //         marginLeft: 0},
        //         400, function() {
        //          $(this).next().addClass('fadeInDown animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        //             $('form').addClass('flipInX animated').css({opacity : 1});
        //          });
        //     });
        // });

        $('#search').focus();

        function searchGit() {
            //grab value of search field
            var search = $('#search').val();

            // Validates entered value
            if (search.length > 0) {
                $(this).find('.error').hide();
                $('html, body').animate({
                    scrollTop: 0
                }, 'fast');

                //pull json data from url
                $.ajax({
                    url: 'https://api.github.com/legacy/repos/search/' + search,
                    dataType: 'json',
                    cache: true,
                    success: function(data) {
                        $('body').removeClass('pre').addClass('post');
                        // use the results to template the html using _
                        var results = data.repositories,
                            resultsTemplate = _.template($("#results-template").html()),
                            resultingHtml = resultsTemplate({
                                results : results,
                                searchVal : search,
                                amount: results.length
                            });

                        var overlayTemplate = _.template($("#overlay-template").html()),
                            overlayHtml = overlayTemplate({
                                results : results
                            });
                        
                        // place the generated data into the html
                        $("#overlay-container").html(overlayHtml);



                        $('.viewDeatails').on('click', function(e) {
                            var id = $(this).attr('href');

                            for(var i = 0; i < results.length; i++) {
                                if(results[i].created == id) {
                                    console.log(results[i]);
                                }
                            }
                            e.preventDefault();
                        });
                    }
                });
            } else {
                $(this).find('.error').fadeIn();
            }

            return false;
        }

        $('#searchForm').on('submit', searchGit);
        
        
    }
    
});

/*
    # Endpoint URL #
    
    https://api.github.com/legacy/repos/search/{query}
    
    Note: Github imposes a rate limit of 60 request per minute. Documentation can be found at http://developer.github.com/v3/.
    
    # Example Response JSON #
    
    {
      "meta": {...},
      "data": {
        "repositories": [
          {
            "type": string,
            "watchers": number,
            "followers": number,
            "username": string,
            "owner": string,
            "created": string,
            "created_at": string,
            "pushed_at": string,
            "description": string,
            "forks": number,
            "pushed": string,
            "fork": boolean,
            "size": number,
            "name": string,
            "private": boolean,
            "language": number
          },
          {...},
          {.    ..}
        ]
      }
    }
*/
