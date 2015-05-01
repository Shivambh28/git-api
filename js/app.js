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

    $(function() {
        function searchGit() {
            //grab value of search field
            var search = $('#search').val();

            // Validates entered value
            if (search.length > 0) {
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
                            resultingHtml = resultsTemplate({results : results});
                        
                        // place the generated data into the html
                        $("#results-container").html(resultingHtml);
                    }
                });
            } else {
                alert("Please enter repo name");
            }

            return false;
        }

        $('#submit').on('click', searchGit);
    });