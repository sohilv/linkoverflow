<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>LinkOverflow</title>


    <!-- Le HTML5 shim, for IE6-8 support of HTML elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->


    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js" type="text/javascript"></script>
	
    <script type="text/javascript">
        $(function(){
		
            api = {
                get: function(url) {
                    var URL = "http://api.stackoverflow.com/1.1/";
                    $.ajax({
                        dataType: 'jsonp',
                        jsonp: 'jsonp',
                        jsonpCallback: 'onJsonp',
                        url: URL + url,
                        success: function(data) {
					
							pagesize = data.pagesize;	
							total = data.total;
							total_pages = (total / pagesize );
							
							if(data.answers[0]!=null)
							$("#question_title").text(data.answers[0].title); 
							
							if(total_pages>=count){
								var t = setTimeout("callNextPage()",1000);
							}else{
								$('#progress').hide();
							}
							 
                        },
                        error: function(data) {
                            console.log('error', url);
                        }
                    });
                },
                onJsonp: function(data) {
															
					$.each(data.answers, function (key, val) {

						var anchors, i, end;

						anchors = $(val.body).find('a');

						populateAnchors(anchors,false);
						
					 });

                }
            }						

        });

	var pagesize=1,count=1;total_pages=1,total=1;
	var api_key='pg-WJQXUnkOzQARuJGx2ug';
	var q_id=0;var mapcnt = 0;
	var link_map = [];

	function callNextPage(){		
		if(total_pages>=count){			
			api.get('questions/'+q_id+'/answers?key='+api_key+'&body=true&page='+count++);
			}	else{
		$('#progress').hide();
		}
	}

    function onJsonp(data) {
           api.onJsonp(data);
    }
	
	
	function populateAnchors(anchors , search){
	
		var i, end;
		// grab all your href values from each anchor element.
		end = anchors.length;
		if(end >0 && search ){
			$("#result_table").html("");
		}
				
		for (i = 0; i < end; i++) {
			
				var results = "";
				var str = anchors[ i ].text;  
				
				if( anchors[ i ].href != '' &&  !endsWith(anchors[ i ].href ,".jpg") && !endsWith(anchors[ i ].href ,".jpeg") && !endsWith(anchors[ i ] .href,".png") ){
					if(str.indexOf('http://')!=0 && str.indexOf('https://')!=0){
						str=  str.replace(/[^\w\s]/gi, '');
						str=  str.replace(/\bThe\b|\bthe\b|\bof\b|\bOf\b|\band\b|\bAnd\b|\ba\b|\bA\b|\bAn\b|\ban\b|\bLike\b|\blike\b|\bto\b|\bTo\b|\binto\b|\bInto\b|\byour\b|\bYour\b|\bwith\b|\bWith\b|\bOwn\b|\bown\b|\bIn\b|\bn\b|\bto\b|\bTo\b|\bOn\b|\bon\b|\this\b|\This\b|\in\b|\In\b|\how\b|\How\b/g,'');
						results = str.match(/("[^"]+"|[^"\s]+)/g);
						results = (results!= null && results != '') ?results.toString():"";
						results = results.replace(/\,/g,', ');
					}

					var idname="term_"+i;
					var href_row = "<tr>"+
							   "<td><a href='"+anchors[ i ]+"'>"+anchors[ i ].text+"</a></td>"+
							   "<td id="+idname+">"+results.toLowerCase() +"</td>"+
							   "</tr>";	
					
					if(!search){
						var temp = new Array(2);
						temp[0]=results.toLowerCase();
						temp[1]=anchors[i];
						link_map.push(  temp);
					}
					$("#result_table").append(href_row);
				}
			}
	}

	$(document).ready(function() {
		$('#progress').hide();
		$("#getlinks").click( function() {
			var link = ($("#so_link").val());		
			
			if (link .indexOf('stackoverflow') >= 0){
				var matches = link.match(/\/([0-9]+)\//);			 
				q_id = matches[1];
				pagesize=1,count=1; total_pages =1;
				$('#progress').show();
				$("#result_table").html("");
				var t = setTimeout("callNextPage()",1000);
			}else{
				
				$('#so_link').addClass('error');
				alert("not a valid link !!");
				
			}	
		});
	
		$('#search_input').focus(function() {  
				$(this).removeClass("span4").addClass("span6");  
			});  
			$('#search_input').blur(function() {  
				$(this).removeClass("span6").addClass("span4");  				
			});  		
		$("#search_input").keyup(
		
			function(){
			
				var search_val = $(this).val(); 
				if(search_val.length >= 3){
					var search_arry=[];					
						for (var i=0;i < link_map.length ; i++){
							var temp = link_map[i];
							if(temp[0].indexOf(search_val.toLowerCase())!=-1){
								search_arry.push (temp[1]);						
							}
						}
					if(search_arry != '')					 
					populateAnchors(search_arry,true);
				}else if(search_val == ''){
					var search_arry=[];
					
					for (var i=0;i < link_map.length ; i++){	
							var temp = link_map[i];					
							search_arry.push (temp[1]);												
					}
					populateAnchors(search_arry,true);
				}
			}
		);

	});
	
	function endsWith(str, suffix) {
		return str.indexOf(suffix, str.length - suffix.length) !== -1;
	}
	
	function printPage(){
		if(link_map.length > 0){
		var w=window.open();
		w.document.write($('#result_div').html());
		w.print();
		w.close();
		}else{
			alert('Nothing to print !!');
		}
	}

	
    function setUrl(anchor){        	
    	$('#so_link').val(anchor);
    	
    }
    </script>

    <!-- Le styles -->
    <link href="/resources/bootstrap.css" rel="stylesheet">
	<link href="/resources/print.css" rel="print">
    <style type="text/css">
      /* Override some defaults */
      html, body {
        background-color: #eee;
      }
      body {
        padding-top: 40px; /* 40px to make the container go all the way to the bottom of the topbar */
      }
      .container > footer p {
        text-align: center; /* center align it with the container */
      }
      .container {
        width: 820px; /* downsize our container to make the content feel a bit tighter and more cohesive. NOTE: this removes two full columns from the grid, meaning you only go to 14 columns and not 16. */
      }

      /* The white background content wrapper */
      .container > .content {
        background-color: #fff;
        padding: 20px;
        margin: 0 -20px; /* negative indent the amount of the padding to maintain the grid system */
        -webkit-border-radius: 0 0 6px 6px;
           -moz-border-radius: 0 0 6px 6px;
                border-radius: 0 0 6px 6px;
        -webkit-box-shadow: 0 1px 2px rgba(0,0,0,.15);
           -moz-box-shadow: 0 1px 2px rgba(0,0,0,.15);
                box-shadow: 0 1px 2px rgba(0,0,0,.15);
      }

      /* Page header tweaks */
      .page-header {
        background-color: #f5f5f5;
        padding: 20px 20px 10px;
        margin: -20px -20px 20px;
      }

      /* Styles you shouldn't keep as they are for displaying this base example only */
      .content .span10,
      .content .span4 {
        min-height: 500px;
      }
      /* Give a quick and non-cross-browser friendly divider */
      .content .span4 {
        margin-left: 0;
        padding-left: 19px;
        border-left: 1px solid #eee;
      }

      .topbar .btn {
        border: 0;
      }

    </style>

    <!-- Le fav and touch icons -->
    <link rel="shortcut icon" href="images/favicon.ico">
    <link rel="apple-touch-icon" href="images/apple-touch-icon.png">
    <link rel="apple-touch-icon" sizes="72x72" href="images/apple-touch-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="114x114" href="images/apple-touch-icon-114x114.png">
  </head>

  <body>

    <div class="topbar">
      <div class="fill">
        <div class="container">
          <a class="brand" href="#">LinkOverflow</a>
          <ul class="nav">
            <li class="active"><a href="#">Home</a></li>
            <li><a href="#about">About</a></li>            
          </ul>
          <form class="pull-right">
            <input id="search_input"  class="span4" type="text" placeholder="Search">
          </form>
        </div>
      </div>
    </div>

	
    <div class="container">

      <div class="content">
        <div class="page-header">
          <div id="qbox" class="input-prepend">
                <span class="add-on">StackOverflow Question</span>

                <input class="span8" id="so_link" name="prependedInput" size="10" type="text" />				
				<button class="btn primary" id="getlinks">Get Links! </button>				
				<button class="btn info" onclick="javascript:printPage();" id="print">Print</button>				
           </div>
	     

        </div>
		
	  
        
          <div id="result_div" class="span14">
			<div id="progress" align="center" >Search in progress ...</div>
            <h2 id="question_title"></h2>
			<div id="results"><table id="result_table"></table></div>
          </div>
        
        
        <section id="about">
        <div  class="hero-unit">
        <h3>Find links extracted from stackoverflow's post.</h3>
        <p>1. Enter the stackoverflow question url in box above</p>        
        <p>2. Press get links! button</p>
        <p>3. Wait for the search to be complete and your links list is ready</p>
        <p>4. Filter out links using tags / Print the list</p>
        
        <h2>try some links:</h2>
        <a href="#" onclick="javascript:setUrl('http://stackoverflow.com/questions/194812/list-of-freely-available-programming-books');" >List of freeely available programming books</a>
        <br> 
        <a href="#" onclick="javascript:setUrl('http://stackoverflow.com/questions/1711/what-is-the-single-most-influential-book-every-programmer-should-read');" >List of influential books</a>
        

      </div>
      <p><g:plusone annotation="inline"></g:plusone> </p>
      </section>
      
      </div>

      <footer>
        <p>developed by <a href="http://twitter.com/sohilv">@sohilv</a> &copy; 2011</p>         
        <p>Built with Stackoverflow API + JQuery + Bootstrap. Powered by Google App Engine</p>
        
      </footer>

    </div> <!-- /container -->
<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-27046016-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>
<!-- Place this render call where appropriate -->
<script type="text/javascript">
  (function() {
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/plusone.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
  })();
</script>
  </body>
</html>
