function loadMain(){
	console.log(getCurrentUser());
	paintMenus(getCurrentUser());
}

function getCurrentUser(){
	return JSON.parse(localStorage.getItem('CurrentUser'));
}

function paintMenus(currentUser){
	if(currentUser.Visitor){
		
	}else{
		document.getElementById('visitorLog').style.visibility='hidden';
		if(currentUser.Admin){

		}else{

		}
	}
}

function goToIndex(control){
	window.location.href = "Index.html";
}

    function showPopUser(widget,control){
    	
        var body = document.body, html = document.documentElement;
    	var docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
		var widUser= document.getElementById('widUser');
		widUser.style.display='block';
		widUser.style.height=docHeight;
		var formUser=document.getElementById(widget);
		formUser.style.display='block';
		formUser.style.top= $(window).scrollTop() +200 +'px'; 
    }

$(document).ready(function(){
    $('.close-btn, .overlay-bg').click(function(){
    	$('.overlay-bg, .overlay-content').hide();
    });

});
 
