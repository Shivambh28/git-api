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

(function($) {
    // Use _ to template the resultsTemplating details
    function resultsTemplating(data, inputValue) {
        var results = data,
            resultsTemplate = _.template($("#results-template").html()),
            resultingHtml = resultsTemplate({
                results : results,
                searchVal : inputValue,
                amount: results.length
            });
        
        // place the generated data into the html
        $("#results-container").html(resultingHtml);
    }
    // Use _ to template the overlay details
    function overlayTemplating(data, id) {
         // loop through JSON and match clicked element, then template   
         for(var i = 0; i < data.length; i++) {
            if(data[i].created == id) {
                var overlayTemplate = _.template($("#overlay-template").html()),
                    overlayHtml = overlayTemplate({
                        name : data[i].name,
                        username : data[i].username,
                        language: data[i].language,
                        url: data[i].url,
                        description: data[i].description
                    }); 
                    

            }
        }
        // place the generated data into the html
        $("#overlay-container").html(overlayHtml);
    }
    // Grab Deatils of clicked node, and template it
    function repoDetails(data, id) {
        var container = $('#overlay-container');
        container.fadeIn('fast');

        overlayTemplating(data, id);

        // Closes the overlay
        container.find('.close').on('click', function() {
            container.fadeOut('fast');
            return false;
        });
                   
    }
    // Scroll Back to the top of the page
    function backToTop() {
        $('html, body').animate({
            scrollTop: 0
        }, 'fast');
    }
    function searchGit() {
        //grab value of search field
        var search = $('#search').val();

        // Validates entered value
        if (search.length) {
            $(this).find('.error').hide();
            backToTop();

            //pull json data from url
            $.ajax({
                url: 'https://api.github.com/legacy/repos/search/' + search,
                dataType: 'json',
                cache: true,
                success: function(data) {

                    var results = data.repositories;

                    $('body').addClass('post');
                    $('#results-container').show();

                    // use the results to template the results html using _
                    resultsTemplating(results, search);

                    $('.viewDeatails').on('click', function(e) {
                        var id = $(this).attr('href');

                        // use the results to template the repo details html using _
                        repoDetails(results, id);

                        e.preventDefault();
                    });
                }
            });

            // Back to Home
            $('.logo').on('click', function() {
               $('body').removeClass('post'); 
               $('#results-container').hide();
            });
        } else {
            // Show error if search field is empty
            $(this).find('.error').fadeIn();
        }

        return false;
    }

   $(function() {
    if($('body').hasClass('js')) { 

        // ANIMATIONS
        $('#search').focus();

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
                      setTimeout(function() { $('.footer').fadeIn(); }, 400);
                 });
            });
        });  

        // Search Event
        $('#searchForm').on('submit', searchGit);
    }
   });
})(jQuery);