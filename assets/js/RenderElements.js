function showUsername(elem,usracc)
{
elem.html("<span class='redtext'>"+Accounts[usracc].FideTitle+"</span> "+Accounts[usracc].name);	
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
					<a    href="#" class="dropdown-toggle navbar-brand" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"  id="NameDiv"></a>
					<ul class="dropdown-menu">
						<li><a href="/profile/<%- req.session.passport.user%>" >My Profile</a></li>
						<li><a href="/albums/<%- req.session.passport.user%>" >My Albums</a></li>
						<li><a href="/stats/<%- req.session.passport.user%>" >My Stats</a></li>
						
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
		$("#NameDiv").html("<span  class='caret'></span>Welcome "+Accounts[usracc].name);
	if(Accounts[usracc].Invisible)
             {
				$("#InvisibleMessage").html("Days Left To Account Deletion:"+Accounts[usracc].DaysToDelete);
			}
	}
}
function showOpenGameList(elem,games)
{
	
	
		 elem.append(`<h2 class='sub-header'>Open Games</h2>
          <div class="table-responsive" style="overflow:visible;">
            <table class="table table-striped">
              
		
			<thead id="OpenGameListDiv">
                <tr>
	              <th>Player</th>
                  <th>Date</th>
                  <th>Join</th>
				<!--HEADERS OF TABLE-->
                </tr>
           </thead>
           <tbody>
           
           
           
           `).hide().slideDown();
				var myelem=$("#OpenGameListDiv");
				for (iter in games)
				{
					
					var thisTr=myelem.append("<tr><td>");
					 showUsername(thisTr,games[iter].Player1);
				 var thisTr=elem.append("</td></tr>");
				}
            /*
            <tr ng-repeat="opengame in opg track by $index">
			<td><%- include('partials/username', {userid: "opengame.Player1",Myid:Myid}); %></td>
			<td>{{opengame.phrase}}</td>
		
			<% if (req.session.passport) { %>
    		
			<td>		
				<button ng-click="joingame(opengame.id,opengame.Player1,opengame.Player1Name,opengame.Player1Color,'<%- req.session.passport.user%>',User.name,opengame.GameType,opengame.GameCategory,opengame.TimeLimit)">Join Game</button>
					<%- include('partials/avatar', {userid: "opengame.Player1",Myid:Myid}); %>
    		
				<button ng-click="deleteopengame(opengame.id)">Delete Game</button>
				
			</td>
			
			<% } %>
			</tr>
            </tbody>
            </table>
          </div>	
		*/
}
