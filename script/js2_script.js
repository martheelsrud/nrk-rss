$(function(){
    
    //generere bootstrap ut ifra linkene//

    
    //HTML Objects
    var $mainContent;
    var menu;
    var $feedTitle;
    
    //XML object
    var nrkXMLobject = null;
    
    //init
    var init = function(){
        
        var setHTMLObjects = function(){
            
                $mainContent = $("#mainContent");
                $menu = $("#menu");
                $feedTitle = $("#feedTitle");
            
        }(); //end setHTMLObjects
        
        var setEvents = function(){
            
        }(); //end setEvents
        
        var initPage = function(){
            
            hentNRKRSS();

        }(); //end initPage
        
        
    }();//end init
    
  //hente inn RSS fra nrk-funksjon 
  function hentNRKRSS(){
                
                $.ajax(
                    {
                        url: "./xml/nrkLink.xml",
                        method: "GET",
                        dataType: "xml",
                        
                    success: function(result){
                        nrkXMLobject = result;
                        
                        //generate bootstrap dropdown button-menu
                        $(nrkXMLobject).find("link").each(function(){
                            var title = $("title", this).text();
                            var url = $("url", this).text();

                            var $newMenu = $("<li>")
                                .append(
                                    $("<a id=" + title + ">").html(title)
                            );
                            
                            $("#menu").append($newMenu);
                            
                            //onclick-function to get out nrk rss informasjon
                            $newMenu.on("click", function(){
                                
                                var nrkRSS = "proxy.php?nrkUrl=" + url;
                                
                                $("#feedTitle").html("NRK RSS " + title);
                                
                                $("#mainContent").load(nrkRSS, function(){
                                    $("item").each(function(){
                                        var title = $("title", this).text();
                                        var description = $("description", this).text();
                                        var thumbnail = $("enclosure", this).attr("url");
                                        var date = $("pubDate", this).text();
                        
                                        var $newArticle = $("<article>")
                                            .addClass("col-md-4")
                                        
                                        //prøve å ta vekk dette, appender to ganger
                                        .append(
                                        $("<h4>").html(title),
                                        $("<p>").html(date),
                                        $("<img>", {src: thumbnail}).addClass("img-responsive"),
                                        $("<p>").html(description)
                                        );
                        
                                        $("#mainContent").append($newArticle);
                
                                    }); //end each function
                                    
                                }); //end maincontent load function
                                
                            }); //end newmenu onclick function
                            
                        }); //end nrkxmlobject find each function
                        
                    }
                            
                    }
                    
                ) //end AJAX
                
                    .done(function(result){
                    $("#testOutput").html("Det gikk bra");
                    
                })
                
                .fail(function(a, b, c){
                    $("#testOutput").html("Det gikk ikke bra");
                });
                
                

    } //end hentNRKRSS
    
    
    
});