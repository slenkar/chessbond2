 angular.module('HomepageModule').service('AccountService', function () {
        var Accounts = new Array;
        var AccountPromises=new Array();
        var AccountsRequested=new Array();
        
        var BlockedAccounts=new Array();
        var BlockedAccountPromises=new Array();
        var BlockedAccountsRequested=false;
		var ShouldGetBlockedAccounts=false;
		
		function setAccount(acc){
			     Accounts[acc.id] = acc;
           
           
            }
		function   setField(accID,fieldName,fieldValue) {
				if(Accounts[accID]) {
				Accounts[accID][fieldName]=fieldValue;
				}
			}
        return {
			setShouldGetBlockedAccounts:function(accID){
				ShouldGetBlockedAccounts=true;
			},
			getShouldGetBlockedAccounts:function(accID){
				return	ShouldGetBlockedAccounts;
			},
		
			getBlockedAccounts:function(accID){
			return BlockedAccounts;
			},
			LabelRequestedAccount:function(accID) {
			for(var i = AccountsRequested.length - 1; i >= 0; i--) {
				
			if(AccountsRequested[i].id === accID) {
			AccountsRequested[i].requested=true;
			}
			
			}
			},
			RemoveRequestedAccount:function(accID) {
				
			for(var i = AccountsRequested.length - 1; i >= 0; i--) {
				
			if(AccountsRequested[i].id === accID) {
			AccountsRequested.splice(i, 1);
			}
			}
				
			},
			getRequestedAccounts:function() {
			return AccountsRequested;
			},
			getRequestedBlockedAccounts:function() {
			return BlockedAccountsRequested;
			},
			setRequestedBlockedAccounts:function() {
			 BlockedAccountsRequested=true;
			},
			clearAccountPromises:function(){
			AccountPromises=[];
			},
			clearBlockedAccountPromises:function(){
			BlockedAccountPromises=[];
			},
			getAccountPromises:function() {
			return AccountPromises;
			},
			getBlockedAccountPromises:function() {
			return BlockedAccountPromises;
			},
			addAccountPromise:function(prom) {
			AccountPromises.push(prom);
			},
			addBlockedAccountPromise:function(prom){
			BlockedAccountPromises.push(prom);
			},
            getAccount: function (id) {
                return Accounts[id];
            },
            getAccounts:function() {
			return Accounts;
			},
            setAccount: function(acc) {
                Accounts[acc.id]=acc;
            },
            setBlockedAccount: function(acc) {
                BlockedAccounts[acc]=true;
            },
            setField:function(accID,fieldName,fieldValue) {
				if(Accounts[accID]) {
				Accounts[accID][fieldName]=fieldValue;
				}
			},
			getField:function(accID,fieldName) {
				if(Accounts[accID]) {
				return Accounts[accID][fieldName];
				}
			},
			addAccount:function(accID) {
				//console.log("website trying to add:"+accID);
			for(var i = Accounts.length - 1; i >= 0; i--) {
				//console.log("found "+Accounts[i].name+" on accounts array in service");
				if(Accounts[i].id === accID) {
				return;
				}
			}
			for(var i = AccountsRequested.length - 1; i >= 0; i--) {
				//console.log("found "+AccountsRequested[i].id+" on requested array in service");
				
				if(AccountsRequested[i].id === accID) {
				return;
				}
			}
			AccountsRequested.push({id:accID,requested:false});
			//console.log(accID+" account added by webpage");
			//console.log("requested array looks like :"+JSON.stringify(AccountsRequested));
			}
            
    };
    });
