$(function(){
    
    //HTML objects
    var $mainContent;
    
    //url
    var vitenUrl = "proxy.php?viten=" + "http://www.nrk.no/viten/toppsaker.rss";
    var sportUrl = "proxy.php?sport=" + "http://www.nrk.no/sport/siste.rss";
    var kulturUrl = "proxy.php?kultur=" + "http://www.nrk.no/kultur/toppsaker.rss";
    
    //init funksjoner
    
    var init = function(){
        
        var setHTMLObjects = function(){
            
            $mainContent = $("#mainContent");
                
        
        }();
        
        var setEvents = function(){
            
                $("#vitenRSS").on("click", function(){
                    makeNRKCall(vitenUrl);
                });
                
                $("#sportRSS").on("click", function(){
                    makeNRKCall();
                });
                
                $("#kulturRSS").on("click", function(){
                    makeNRKCall();
                });
                
            }();
              
    setPage("index");
    
    }();
    
    //Show RSS feed
    
            function makeNRKCall(){
                
                $.ajax(
                    {
                        url: "proxy.php",
                        method: "GET",
                        dataType: "xml"
                        
                        
                    }
                ) //end AJAX
                
                .done(function(feed){
                    
                    $(feed.items).each(function(){
                        var title = $("title", this).text();
                        var description = $("description", this).text();
                        var thumbnail = $("enclosure", this).attr("url");
                        
                        var $newArticle = $("<article>")
                            .addClass("col-md-4")
                        
                            .append(
                                $("<h3>").html(title),
                                $("<p>").html(description),
                                $("<img>", {src: thumbnail}).addClass("img-responsive")
                            );
                        
                        $("#mainContent").append($newArticle);
                    });
                    
                })
                
                .fail(function(a, b, c){
                    $("#testOutput").html("Det gikk ikke bra");
                });
                
            }
    
        function setPage(pageName){
            $mainContent.load("../content-pages/" + pageName + ".html");
          }

});