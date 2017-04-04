var ButtonNumber=0;
var UserNamesPrinted={};
var DropDowns={};

	function phrasefordate(dat)
			{
			var nu=Date.parse(dat);
			//console.log("nu "+nu);
		var n = Date.now();
		
		var newnum=n-nu;
		newnum=newnum/1000;
		if (newnum<60)
		{
		if (newnum<0)
		{newnum=0;}
		phrase=parseInt(newnum)+" seconds ago";
		}
		else
		{
		newnum=newnum/60;
		if (newnum<60)
		{
		phrase=parseInt(newnum)+" minutes ago";
		}
		else
		{
		newnum=newnum/60;
		if (newnum<60)
		{
		phrase=parseInt(newnum)+" hours ago";
		}
		else
		{
		newnum=newnum/24;
		
		phrase=parseInt(newnum)+" days ago";
		
		}
		
		}
		
		}
		return phrase;
	}
	

var gamecategories=[{time:1,extratime:0},
					{time:2,extratime:0},
					{time:3,extratime:0},
					{time:4,extratime:0},
					{time:5,extratime:0},
					{time:6,extratime:0},
					{time:7,extratime:0},
					{time:8,extratime:0},
					{time:9,extratime:0},
					{time:10,extratime:0},
					{time:15,extratime:0},
					{time:20,extratime:0},
					{time:30,extratime:0},
					{time:60,extratime:0},
					{time:2,extratime:1},
					{time:3,extratime:1},
					{time:5,extratime:2},
					{time:10,extratime:5},
					{time:15,extratime:5},
					{time:20,extratime:10},
					{time:30,extratime:10},
					{time:60,extratime:10}];

function CreateDropDown(usracc)
{
	DropDowns[usracc]= $("<div class='userdropdown'></div>");
	DropDowns[usracc]['list']=$("<ul id='droplist"+usracc+"' class='userdropdown-content' ></ul>");
	DropDowns[usracc].append(DropDowns[usracc]['list']);
	DropDowns[usracc]['list'].append("<li><a href='#'>Cumulative Rating "+Accounts[usracc].ELO+"</a></li>");
	DropDowns[usracc]['list'].append("<li><a href='#'>View Game Archive</a></li>");
   	DropDowns[usracc]['list'].append("<li><a href='#'>View Game	</a></li>");
	DropDowns[usracc]['list'].append("<li><a href='#'>Follow	</a></li>");
	DropDowns[usracc]['list'].append("<li><a href='#'>Challenge to a Game</a></li>");
	DropDowns[usracc]['list'].append("<li><div id='PrivateConversation"+usracc+"'></div></li>");
	DropDowns[usracc]['list'].append("<li><a href='#'>Add to Friend List</a></li>");

}

function showUsername(elem,usracc)
{
	if(!UserNamesPrinted[usracc])
	{UserNamesPrinted[usracc]=1;}
	else
	{UserNamesPrinted[usracc]=UserNamesPrinted[usracc]+1;}
	
	var thisuserprinted=UserNamesPrinted[usracc];
	
	if(Accounts[usracc])
	{
		//class ='userdropdown'
		//"+showDropDown(usracc)+"
elem.append("<div class='userdropdown' href='/profile/"+usracc+"' id='usernamedropdown"+usracc+"-"+thisuserprinted+"' ><span  class='redtext'>"+Accounts[usracc].FideTitle+"</span> "+Accounts[usracc].name+" </div>");	
 }
 else
 {
elem.append("<div>Deleted Account</div>");	
 	 
	}
	
		$("#usernamedropdown"+usracc+"-"+thisuserprinted).mouseenter(function()
		{//console.log("MOUSE ENTER");
			//console.log(DropDowns[usracc]);
			$("#usernamedropdown"+usracc+"-"+thisuserprinted).append(DropDowns[usracc]);
			});
		$("#usernamedropdown"+usracc+"-"+thisuserprinted).mouseleave(function()
		{//console.log("MOUSE LEAVE");
			//console.log(DropDowns[usracc]);
			DropDowns[usracc].detach();
			});
	
/*
 * 
 function handlerIn()
 
  {console.log("handler in!");

  function handlerOut()
  {console.log("handler out!");}

$("#usernamedropdown"+usracc).mouseenter(
handlerIn);
$("#usernamedropdown"+usracc).mouseleave(
handlerOut);
//,function(){console.log("out");});
 */
}

function showDropDown(usracc)
{
	
	
	return(`  <ul class="userdropdown-content" >
  <li>
    <a href="#">Cumulative Rating `+Accounts[usracc].ELO+`</a>
  </li>
  <li>
    <a href="#">View Game Archive</a>
   </li>
   <li>
    <a href="#">View Game	<%- userid %></a>
   </li>
   <li>
    <a href="#">Follow	</a>
   </li>
   <li>
    <a href="#">Challenge to a Game</a>	
   </li>
   <li>
    <div id="PrivateConversation`+usracc+`">
    </div>
    </li>
    <li>
    <a href="#">Add to Friend List	</a>
  </li>
   <li>
   <div ng-controller="BlockedAccountController" ng-init="setShouldGetBlockedAccounts('<%- Myid %>')">
    <div  ng-show="BlockedAccounts[<%- userid%>]" ng-click="UnBlockUser('<%- Myid %>',<%- userid %>)">UnBlock Member</div>
	  <div  ng-show="!BlockedAccounts[<%- userid%>]" ng-click="BlockUser('<%- Myid %>',<%- userid %>)">Block Member</div>
	
	</div>
  </li>
  </ul>`);
  
	$("#StartPrivateDiv"+usracc).click(function(){
	
	
	io.socket.post('/startprivateconversation',{Talker1:MyID,Talker2:usracc},
			function (resData, jwRes) {
				console.log("resData[0].id "+resData.id);
				PrivateConversations[MyID][usracc]=resData;
			
				});
	
	io.socket.post('/privateconversation',{Talker1:MyID,Talker2:usracc},
			function (resData, jwRes) {
				console.log("resData[0].id "+resData.id);
				PrivateConversations[MyID][usracc]=resData;
			
				});
	});
  
  
}

function showButton(elem,words){
	ButtonNumber=ButtonNumber+1;
	//console.log("ButtonNumber"+ButtonNumber);
	elem.append("<span class='btn btn-lg btn-success' id='button"+ButtonNumber+"'>"+words+"</span>");
	
	//$("#button"+ButtonNumber).click(function() {
 // alert( "Handler for .click() called." );
//});
	
}

function showNavbar(elem,usracc)
{
	elem.append(`
	<nav class="navbar navbar-default navbar-inverse">
	<div class="container-fluid"   >
		<div class="navbar-header" >
			<button type="button" class="navbar-toggle" data-toggle="collapse" ng-init="navCollapsed = true" ng-click="navCollapsed = !navCollapsed">
			   <!-- This controls the number of lines in the image when the nav collapse -->
			   <span class="icon-bar"></span>
			   <span class="icon-bar"></span>
			   <span class="icon-bar"></span>
			</button>

			<!-- This is the brand on the left-hand side. -->
			<span style='display:flex'>
			<img style="background-color:white;max-width:50px;height:50px; "
             src="/knight.png">
             
              <div  style="color:white;" id="InvisibleMessage">
			</div>
			<a class="navbar-brand" href="/#" >Chessbond
			
			</a>
			
			</span>	  
		</div>
              
     		 <ul class="navbar-nav" style="padding:6px;">
			<li  class="nav-item">
			
			</li>
			</ul>
		   <div id="navbarNav" class="collapse navbar-collapse" ng-class="!navCollapsed && 'in'">
	
			<ul class="nav navbar-right">
			
					
				  <ul class="nav navbar-nav navbar-right">
				 <li>
				 
				 <span class="badge" id="NumberofNotificationsSpan" ></span>
				 </li>
				  <li  class="dropdown">
					<a    href="#" class="dropdown-toggle navbar-brand" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"  ><span id="NameDiv"></span><span  class='caret'></span></a>
					<ul class="dropdown-menu">
						<li><a id="profilelink" href="/profile/<%- req.session.passport.user%>" >My Profile</a></li>
						<li><a id="albumlink" href="/albums/<%- req.session.passport.user%>" >My Albums</a></li>
						<li><a id="statslink" href="/stats/<%- req.session.passport.user%>" >My Stats</a></li>
						
						<li><a href="/MyLogout">Logout</a></li>
						<li id="NotificationsList"></li>
							
						<li id="UndeleteAccount"></li>
					<li id="DeleteAccount"></li>
					
					</ul>
				  </li>
				  </ul>
				  
				
			
			</ul>
		</div>
		
   </div>
</nav>
	`).hide().slideDown();
	//<%- include options.ejs %>
	//<li ng-show="Accounts['<%- Myid %>'].Invisible==true"><a href="/UndeleteAccount">Undelete Account</a></li>
					//<li ng-show="!Accounts['<%- Myid %>'].Invisible"><a href="/DeleteAccount">Delete Account</a></li>
					
	//do NumberofNotificationsSpan
	//NotificationsList<li ng-click="DestroyNotifications(n.adr)" ng-repeat="n in Notifications track by $index" value="{{n.msg}}">
						  //<a href="{{n.adr}}">{{n.msg}}</a></li>
	if(Accounts[usracc])
	{
		console.log("Welcome "+Accounts[usracc].name);
		$("#albumlink").attr('href','/albums/'+usracc);
		$("#profilelink").attr('href','/profile/'+usracc);
		$("#statslink").attr('href','/stats/'+usracc);
		
		$("#NameDiv").html("Welcome "+Accounts[usracc].name);
	if(Accounts[usracc].Invisible)
             {
				$("#InvisibleMessage").html("Days Left To Account Deletion:"+Accounts[usracc].DaysToDelete);
			}
	}
}

function showJoinedGameList(elem,games)
{
	elem.append(`
<h2 class='sub-header'>Your Games</h2>
          <div class='table-responsive' style='overflow:visible;'>
            <table class='table table-striped'>
              
		
			<thead>
                <tr>
	              <th>Player1</th>
                  <th>Player2</th>
                  
				<!--HEADERS OF TABLE-->
                </tr>
           </thead>
           <tbody id='JoinedGameListDiv'>
				  
            </tbody>
            </table>
          </div>`).hide().slideDown();;
          
          var myelem=$("#JoinedGameListDiv");
				for (iter in games)
				{
				myelem.append("<tr id='joinedgamerow"+games[iter].id+"'></tr>");
				$("#joinedgamerow"+games[iter].id).append("<td id='joinedgamep1td"+iter+"'></td>");
				console.log("show user name in join div "+games[iter].Player1);
				showUsername($("#joinedgamep1td"+iter),games[iter].Player1);
				$("#joinedgamerow"+games[iter].id).append("<td id='joinedgamep2td"+iter+"'></td>");
				showUsername($("#joinedgamep2td"+iter),games[iter].Player2);
				$("#joinedgamerow"+games[iter].id).append("<td id='joinedgameButtd"+iter+"'></td>");
				
				showButton($("#joinedgameButtd"+iter),"Go to Game");
				
				}
          /*
            <tr ng-repeat="game in joinedgames track by $index">
			<td><%- include('partials/username', {userid: "game.Player1",Myid:Myid}); %></td>
			<td><%- include('partials/username', {userid: "game.Player2",Myid:Myid}); %></td>
			
			<td>
				<button ng-click="PlayGame(game.id,game.Player2)" class="btn btn-lg btn-success" >Play Game</a>
				<button ng-click="deletegame(game.id,'<%-  req.session.passport.user %>')">Delete Game</button>
			</td>
			
			</tr>
          */
}
function showNewGameControls(elem){
	elem.append(`
		<div id="newgamecontrols">
			
		
				<h2>Choose a Time Limit:</h2>
				<select id="addGameCategories" class="form-control bg-success" >
		
		</select>
		<h2>Which Color would you like to be?:</h2>
		<select  id="colorpicker" class="form-control bg-success" data-style="btn-success">
		  <option value='White'>White</option>
		  <option value='Black'>Black</option>
		</select>
		<button id="gobutton" type="submit" class="btn btn-success">Go</button>
		
			
			</div>
	`);
	
	for (giter in gamecategories)
	{
	$("#addGameCategories").append("<option value='"+giter+"'>"+gamecategories[giter].time+" | "+gamecategories[giter].extratime+"</option>");
	}
	
	
elem.append(`	 <div class="row">
			 <div class="col-md-2 ">  
			</div>
			<div class="text-center col-md-3">
			<a  id="playAgainstAIButton" href="/playvsai" class="btn btn-lg btn-success">Play Chess against the AI!</a>
			</div>
		 <div class="col-md-2 ">  
			</div>
		 <div class="text-center col-md-3">
		 
			<button  id="playAgainstPersonButton" type="submit" class="btn btn-lg btn-success">Create a New vs Human Game</button>
			</div>
		<div class="col-md-2 ">  
			</div>
		</div>`);
		
		$("#newgamecontrols").hide();
		
		$("#playAgainstPersonButton").click(function()
		{
			$("#newgamecontrols").slideDown();
		});
	
		$("#gobutton").click(function()
		{
		var type='Timed';
		var id=MyID;
		var Username=Accounts[MyID].Name;
		var timecat=$("#addGameCategories").val();
		var chosencolor=$("#colorpicker").val();
		console.log("GameForm1"+gamecategories[timecat].time);
		console.log("GameForm2"+gamecategories[timecat].extratime);
		console.log("chosen color "+chosencolor);
		var gamecat=gamecategories[timecat].time+"|"+gamecategories[timecat].extratime;
			
	io.socket.put('/newopengame', { GameType:type,GameCategory:gamecat,TimeLimit:gamecategories[timecat].time,ExtraTimeLimit:gamecategories[timecat].extratime,Player1Color:chosencolor,Player1:id,Player1Name:Username },
    function (resData, jwr) {

      // Refresh the page now that we've been logged in.
      //window.location.reload(true); 
		toastr.success('Created New Game');
    });
	
	
	});
		
}

function showOpenGameList(elem,games)
{
			
		var roomname='openchessgameroom';
		
			io.socket.get("/subscribeToRoom",{roomName:roomname},function (resData,jwres){
			console.log(JSON.stringify(resData));
			});
			
			io.socket.on('deleteopengameevent', function (data)
			{
				$("#opengameiter"+data.gameid).detach();
			});
			
			io.socket.on('newopengameevent', function (data)
			{
			console.log('newopengameevent'+data);
			data.phrase=phrasefordate(data.createdAt);
			
			games.push(data);
			
				var myelem=$("#OpenGameListDiv");
				addOpenGame(myelem,games,games.length-1);
			
			});
			//console.log("games "+JSON.stringify(games));
			
	
		 elem.append(`<h2 class='sub-header'>Open Games</h2>
          <div class='table-responsive' style='overflow:visible;'>
            <table class='table table-striped'>
              
		
			<thead >
                <tr>
	              <th>Player</th>
                  <th>Date</th>
                  <th>Join</th>
				<!--HEADERS OF TABLE-->
                </tr>
           </thead>
           <tbody id='OpenGameListDiv'>
           
           </tbody>
           </table>
           </div>
           
           `).hide().slideDown();
           
				var myelem=$("#OpenGameListDiv");
				
				
				for (iter in games)
				{
				addOpenGame(myelem,games,iter);

				}
            /*
            <tr ng-repeat="opengame in opg track by $index">
			<td><%- include('partials/username', {userid: "opengame.Player1",Myid:Myid}); %></td>
			<td>{{opengame.phrase}}</td>
		
			<% if (req.session.passport) { %>
    		
			<td>		
				<button ng-click="">Join Game</button>
					<%- include('partials/avatar', {userid: "opengame.Player1",Myid:Myid}); %>
    		
				<button ng-click="deleteopengame(opengame.id)">Delete Game</button>
				
			</td>
			
			<% } %>
			</tr>
            	
		*/
}

	
				
				function addOpenGame(myelem,games,iter)
				{
					myelem.append("<tr id='opengameiter"+games[iter].id+"'></tr>");
					$("#opengameiter"+games[iter].id).append("<td id='opengametdnameiter"+iter+"'></td>");
					 showUsername($("#opengametdnameiter"+iter),games[iter].Player1);
					$("#opengameiter"+games[iter].id).append("<td id='opengametdbuttoniter"+iter+"'></td>");
					showButton($("#opengametdbuttoniter"+iter),"Join Game");
					$("#button"+ButtonNumber).click(function() {
				//	joingame(games[iter].id,games[iter].Player1,games[iter].Player1Name,games[iter].Player1Color,MyID,Account[MyID].name,games[iter].GameType,games[iter].GameCategory,games[iter].TimeLimit);
				
					
					io.socket.put('/joingame',{
				
			GameID:games[iter].id,
			PlayerID:games[iter].Player1,
			//PlayerName:PlayerName,
			PlayerColor:games[iter].Player1Color,
			MyID:MyID,
			//MyName:MyName,
			GameType:games[iter].GameType,
			GameCategory:games[iter].GameCategory,
			Player1TimeLimit:games[iter].TimeLimit*60,
			Player2TimeLimit:games[iter].TimeLimit*60
					  }  
				  
				,function(resData,jwres)
			{
				
			 io.socket.put('/deleteopengame', { gameid:games[iter].id},function  (data,jwres){
				});
			
				}
			);
					
				
			
			
					
					});
		}
