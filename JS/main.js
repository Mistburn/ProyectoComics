// Function that prepare the localstorage, paint the comics, and menus according the kind of user
function loadMain(){
	loadComics();
	paintMenus(JSON.parse(localStorage.getItem('CurrentUser')));
}

// Function for paint and hide some menus according the kind of user  (Admin,user, visitor)
function paintMenus(currentUser){
	if(currentUser.Visitor){
		document.getElementById('infoUser').style.visibility='hidden';
		var hideBtns=document.querySelectorAll(".editButton")
		for (var i = hideBtns.length - 1; i >= 0; i--) {
			hideBtns[i].style.visibility='hidden';
		};

		var hideBtns=document.querySelectorAll(".borrow")
		for (var i = hideBtns.length - 1; i >= 0; i--) {
			hideBtns[i].style.visibility='hidden';
		};
	}else{
		document.getElementById('visitorLog').style.visibility='hidden';
		document.getElementById('welcomeUser').innerHTML='Welcome '+ currentUser.FirstName + ' ' + currentUser.LastName;
		if(!currentUser.Admin){
			var hideBtns=document.querySelectorAll(".editButton")
			for (var i = hideBtns.length - 1; i >= 0; i--) {
				hideBtns[i].style.visibility='hidden';
			};
		}
	}
}

// Function for sent the user to the Index page
function goToIndex(control){
	window.location.href = "Index.html";
}

// Function for show the widgets of User and Comic
function showPopUp(widget,control){

	var body = document.body, html = document.documentElement;
	var docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
	var widUser= document.getElementById('widUser');
	widUser.style.display='block';
	widUser.style.height=docHeight;
	if(widget=="formComic"){
		var comics=JSON.parse(localStorage.getItem('Comics'));
		var comic=comics[control.getAttribute("number")];
		document.getElementById('editComic').setAttribute("number",control.getAttribute("number"));
		document.getElementById('widgetComicImage').src="../Images/Comics/"+ comic.Image;
		document.getElementById('comicName').value=comic.Name;
		document.getElementById('comicRate').value=comic.Rate;
		document.getElementById('comicImage').value=comic.Image;
		document.getElementById('comicDescription').value=comic.Description;
	}else{
		if(widget=="formUser"){
			var user=JSON.parse(localStorage.getItem('CurrentUser'));
			
			document.getElementById('widget_first_name').value=user.FirstName;
			document.getElementById('widget_last_name').value=user.LastName;
			document.getElementById('widget_userName').value=user.UserName;
			document.getElementById('widget_email').value=user.Email;
			document.getElementById('widget_password').value=user.Password;
			document.getElementById('widget_password_confirmation').value=user.Password;
			document.getElementById('box').checked=user.Admin;
			var read=getRandomComicTitles(3);
			var stringRead='';
			for (var i = read.length - 1; i >= 0; i--) {
				stringRead+='<li><p>'+read[i]+'</p></li>';
			};
			document.getElementById('info_Comic_Read').innerHTML=stringRead;

			var borrowed=getRandomComicTitles(2);
			var stringBorrowed='';
			for (var i = borrowed.length - 1; i >= 0; i--) {
				stringBorrowed+='<li><p>'+borrowed[i]+'</p></li>';
			};
			document.getElementById('info_Comic_Borrowed').innerHTML=stringBorrowed;

		}else{
			var comics=JSON.parse(localStorage.getItem('Comics'));
			var comic=comics[control.getAttribute("number")];
			document.getElementById('info_widgetComicImage').src="../Images/Comics/"+ comic.Image;
			document.getElementById('info_Comic_Name').innerHTML='<strong>Title: </strong>' +comic.Name;
			document.getElementById('info_Comic_Rate').innerHTML='<strong>Rate: </strong>'+ comic.Rate ;
			document.getElementById('info_Comic_Description').innerHTML='<strong>Description: </strong>' + comic.Description;
			var stringVideo='';
			for (var i = comic.Videos.length - 1; i >= 0; i--) {
				stringVideo+='<li><a href="'+comic.Videos[i]+'">' + comic.Videos[i] + '</a></li>';
			};
			document.getElementById('info_Comic_Videos').innerHTML=stringVideo;
			var stringNews='';
			for (var i = comic.News.length - 1; i >= 0; i--) {
				stringNews+='<li><a href="'+comic.News[i]+'">' + comic.News[i] + '</a></li>';
			};
			document.getElementById('info_Comic_News').innerHTML=stringNews;	
		}
	}
	var formUser=document.getElementById(widget);
	formUser.style.display='block';
	formUser.style.top= $(window).scrollTop() +200 +'px'; 
}

// Function for get an array of random titles of comics
function getRandomComicTitles(top){
	var comics=JSON.parse(localStorage.getItem('Comics'));
	var tempNames=[];
	top=(top<comics.length?top:comics.length);
	var random;
	for (var i = 0; i < top; i++) {
		console.log(comics);

		random=Math.abs(Math.floor(Math.random() * comics.length-1-i));
		tempNames[i]=comics[random].Name;
	};
	return tempNames;
}

// Function for edit comics from the Comic's widget
function editComics(){
	var comics=JSON.parse(localStorage.getItem('Comics'));
	var comic=comics[document.getElementById('editComic').getAttribute("number")];
	comic.Name=document.getElementById('comicName').value;
	comic.Description=document.getElementById('comicDescription').value;
	comic.Rate=document.getElementById('comicRate').value;
	comic.Image=document.getElementById('comicImage').value;
	localStorage.setItem('Comics',JSON.stringify(comics));
	filterBy();
	$('.overlay-bg, .overlay-content').hide();
	alert("The comic has been edited successfully");
}

// Function for edit users from the User's widget
function editUsers(){
	var position=JSON.parse(localStorage.getItem('CurrentUser')).Position;
	var users= JSON.parse(localStorage.getItem('Users'));
	var user =users[position];
	if(document.getElementById('widget_password').value !== document.getElementById('widget_password_confirmation').value){
		alert("The password doesn't match");
		return;
	}
	user.FirstName=document.getElementById('widget_first_name').value;
	user.LastName=document.getElementById('widget_last_name').value;
	user.UserName=document.getElementById('widget_userName').value;
	user.Email=document.getElementById('widget_email').value;
	user.Password=document.getElementById('widget_password').value;
	user.Admin=document.getElementById('box').checked;
	document.getElementById('welcomeUser').innerHTML='Welcome '+ user.FirstName + ' ' + user.LastName;
	localStorage.setItem('Users',JSON.stringify(users));
	localStorage.setItem("CurrentUser",JSON.stringify(user));
	$('.overlay-bg, .overlay-content').hide();
	alert("The user has been edited successfully");
}

// Function for bind the click event of the background and close button (when some widget is currently show)
$(document).ready(function(){
	$('.close-btn, .overlay-bg').click(function(){
		$('.overlay-bg, .overlay-content').hide();
	});
});

// Function for load the comics in the local storage
function loadComics(){
	var arrayComics=[];
	arrayComics.push(new Comic("Archie 13", "Lorem ipsum dolor sit amet, consectetuer adipiscing elit,sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.", 4.5,"Archie13.png","Comedy","First",["Archie"], false,['https://www.youtube.com/watch?v=akgVR9uce4U','https://www.youtube.com/watch?v=8YoKvR7J9FY'],['https://www.youtube.com/watch?v=fBK1k9CM26s','https://www.youtube.com/watch?v=7gqQhz7Oi50'],arrayComics.length,true));
	arrayComics.push(new Comic("Archie 20", "Lorem ipsum dolor sit amet, consectetuer adipiscing elit,sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.", 4,"Archie20.jpg","Comedy","Second",["Archie"], false,['https://www.youtube.com/watch?v=akgVR9uce4U','https://www.youtube.com/watch?v=8YoKvR7J9FY'],['https://www.youtube.com/watch?v=fBK1k9CM26s','https://www.youtube.com/watch?v=7gqQhz7Oi50'],arrayComics.length,true));
	arrayComics.push(new Comic("Archie 27", "Lorem ipsum dolor sit amet, consectetuer adipiscing elit,sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.", 5,"Archie27.jpg","Comedy","First",["Archie"], true,['https://www.youtube.com/watch?v=akgVR9uce4U','https://www.youtube.com/watch?v=8YoKvR7J9FY'],['https://www.youtube.com/watch?v=fBK1k9CM26s','https://www.youtube.com/watch?v=7gqQhz7Oi50'],arrayComics.length,true));
	arrayComics.push(new Comic("Archie 55", "Lorem ipsum dolor sit amet, consectetuer adipiscing elit,sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.", 3.5,"Archie55.jpg","Comedy","Third",["Archie"], true,['https://www.youtube.com/watch?v=akgVR9uce4U','https://www.youtube.com/watch?v=8YoKvR7J9FY'],['https://www.youtube.com/watch?v=fBK1k9CM26s','https://www.youtube.com/watch?v=7gqQhz7Oi50'],arrayComics.length,true));
	arrayComics.push(new Comic("Archie 60", "Lorem ipsum dolor sit amet, consectetuer adipiscing elit,sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.", 4.5,"Archie60.jpg","Comedy","First",["Archie"], false,['https://www.youtube.com/watch?v=akgVR9uce4U','https://www.youtube.com/watch?v=8YoKvR7J9FY'],['https://www.youtube.com/watch?v=fBK1k9CM26s','https://www.youtube.com/watch?v=7gqQhz7Oi50'],arrayComics.length,true));
	arrayComics.push(new Comic("Archie 65", "Lorem ipsum dolor sit amet, consectetuer adipiscing elit,sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.", 3,"Archie65.jpg","Comedy","Second",["Archie"], true,['https://www.youtube.com/watch?v=akgVR9uce4U','https://www.youtube.com/watch?v=8YoKvR7J9FY'],['https://www.youtube.com/watch?v=fBK1k9CM26s','https://www.youtube.com/watch?v=7gqQhz7Oi50'],arrayComics.length,true));
	arrayComics.push(new Comic("Archie 144", "Lorem ipsum dolor sit amet, consectetuer adipiscing elit,sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.", 4.5,"Archie144.jpg","Comedy","First",["Archie"], false,['https://www.youtube.com/watch?v=akgVR9uce4U','https://www.youtube.com/watch?v=8YoKvR7J9FY'],['https://www.youtube.com/watch?v=fBK1k9CM26s','https://www.youtube.com/watch?v=7gqQhz7Oi50'],arrayComics.length,true));
	arrayComics.push(new Comic("Avengers 223", "Lorem ipsum dolor sit amet, consectetuer adipiscing elit,sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.", 5,"Avengers181.jpg","Action","Second",["Captain America", "Ironman", "Thor"], false,['https://www.youtube.com/watch?v=JAUoeqvedMo','https://www.youtube.com/watch?v=gMk6g0lQatw'],['https://www.youtube.com/watch?v=raf6x8HESOM','https://www.youtube.com/watch?v=zwZYVmTY-kI'],arrayComics.length,true));
	arrayComics.push(new Comic("Avengers 181", "Lorem ipsum dolor sit amet, consectetuer adipiscing elit,sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.", 4.5,"AvengersGetIt.jpg","Action","First",["Captain America", "Ironman", "Thor"], true,['https://www.youtube.com/watch?v=JAUoeqvedMo','https://www.youtube.com/watch?v=gMk6g0lQatw'],['https://www.youtube.com/watch?v=raf6x8HESOM','https://www.youtube.com/watch?v=zwZYVmTY-kI'],arrayComics.length,true));
	arrayComics.push(new Comic("Batman 1", "Lorem ipsum dolor sit amet, consectetuer adipiscing elit,sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.", 5,"Batman1.png","Superheroes","First",["Batman", "Robin"], false,['https://www.youtube.com/watch?v=EXfrMQjSpz4','https://www.youtube.com/watch?v=PfEXKi83glA'],['https://www.youtube.com/watch?v=swWEhjMKk0w','https://www.youtube.com/watch?v=mT0qXgun3Ks'],arrayComics.length,true));
	arrayComics.push(new Comic("Batman Kill", "Lorem ipsum dolor sit amet, consectetuer adipiscing elit,sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.", 5,"BatmanKill.jpg","Superheroes","Second",["Batman"], true,['https://www.youtube.com/watch?v=EXfrMQjSpz4','https://www.youtube.com/watch?v=PfEXKi83glA'],['https://www.youtube.com/watch?v=swWEhjMKk0w','https://www.youtube.com/watch?v=mT0qXgun3Ks'],arrayComics.length,true));
	arrayComics.push(new Comic("Batman with Robin", "Lorem ipsum dolor sit amet, consectetuer adipiscing elit,sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.", 4.5,"BatmanWithRobin10.jpg","Superheroes","First",["Batman", "Robin"], false,['https://www.youtube.com/watch?v=EXfrMQjSpz4','https://www.youtube.com/watch?v=PfEXKi83glA'],['https://www.youtube.com/watch?v=swWEhjMKk0w','https://www.youtube.com/watch?v=mT0qXgun3Ks'],arrayComics.length,true));
	arrayComics.push(new Comic("Blade 1", "Lorem ipsum dolor sit amet, consectetuer adipiscing elit,sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.", 4,"Blade1.jpg","Vampire","First",["Blade"], false,['https://www.youtube.com/watch?v=W8pZdrPSt4c','https://www.youtube.com/watch?v=yJt2N7LSptg'],['https://www.youtube.com/watch?v=_-9_60oecSI','https://www.youtube.com/watch?v=dV2IWa-QV8M'],arrayComics.length,true));
	arrayComics.push(new Comic("Blade Strange Tales", "Lorem ipsum dolor sit amet, consectetuer adipiscing elit,sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.", 5,"BladeStrangeTales.jpg","Vampire","Second",["Blade"], true,['https://www.youtube.com/watch?v=W8pZdrPSt4c','https://www.youtube.com/watch?v=yJt2N7LSptg'],['https://www.youtube.com/watch?v=_-9_60oecSI','https://www.youtube.com/watch?v=dV2IWa-QV8M'],arrayComics.length,true));
	arrayComics.push(new Comic("Blade Vampire Hunter", "Lorem ipsum dolor sit amet, consectetuer adipiscing elit,sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.", 3,"BladeVampireHunter.jpg","Vampire","Third",["Blade"], false,['https://www.youtube.com/watch?v=W8pZdrPSt4c','https://www.youtube.com/watch?v=yJt2N7LSptg'],['https://www.youtube.com/watch?v=_-9_60oecSI','https://www.youtube.com/watch?v=dV2IWa-QV8M'],arrayComics.length,true));
	arrayComics.push(new Comic("Blade Vampire Slayer", "Lorem ipsum dolor sit amet, consectetuer adipiscing elit,sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.", 4,"BladeVampireSlayer.jpg","Vampire","First",["Blade"], false,['https://www.youtube.com/watch?v=W8pZdrPSt4c','https://www.youtube.com/watch?v=yJt2N7LSptg'],['https://www.youtube.com/watch?v=_-9_60oecSI','https://www.youtube.com/watch?v=dV2IWa-QV8M'],arrayComics.length,true));
	localStorage.setItem('Comics',JSON.stringify(arrayComics));	
}

// Function for create a new Comic
function Comic(name,description,rate,image,genre,edition,characters,lend,videos, news,position,load){
	this.Name=name;
	this.Description=description;
	this.Rate=rate;
	this.Image=image;
	this.Genre=genre;
	this.Edition=edition;
	this.Characters=characters;
	this.Lend= lend;
	this.Videos= videos;
	this.News=news;
	this.Position= position;
	this.paint= function(){
		paintComic(this);
	};
	if(load){
		this.paint();
	}
	return this;
}

// Function for pain the comics in the DOM
function paintComic(obj) {
	var stringHTML='<div class="item  col-xs-4 col-lg-4">\
	<div class="thumbnail">\
	<a onclick="showPopUp(&quot;infoComic&quot;,this)" number="'+ obj.Position+'"><img class="imageGrid group list-group-image " src="../Images/Comics/'+obj.Image+'" /></a>\
	<div class="caption">\
	<h3 class="group inner list-group-item-heading">'+obj.Name+'</h3>\
	<p class="group inner list-group-item-text">'+obj.Description+'</p>\
	<div class="row">\
	<div class="col-xs-12 col-md-6">\
	<p class="lead">Rate '+obj.Rate+' Stars </p>\
	</div>\
	<div class="col-xs-12 col-md-6">\
	<a '+ (obj.Lend ? "disabled" : "" )+' class="btn btn-success borrow" >Borrow</a>\
	<a class="btn btn-success btn-danger editButton" onclick="showPopUp(&quot;formComic&quot;,this)" number="'+ obj.Position+'">Edit</a>\
	</div>\
	</div>\
	</div>\
	</div>\
	</div>';
	var div=document.getElementById('comicsGrid');
	div.innerHTML+=stringHTML;
	return obj;
}

// Function for filter the comics by different params an categories
function filterBy(category,param){
	var comics=JSON.parse(localStorage.getItem('Comics'));
	var div=document.getElementById('comicsGrid');
	div.innerHTML="";
	var tempComics=[];

	switch(category)
	{
		case 'Character':
			for (var i = comics.length - 1; i >= 0; i--) {
				if(comics[i].Characters.indexOf(param)>-1){
					tempComics.push(comics[i]);
				}
			};
		break;
		case 'Genre':
			for (var i = comics.length - 1; i >= 0; i--) {
				if(comics[i].Genre==param){
					tempComics.push(comics[i]);
				}
			};

		break;
		case 'Edition':
			for (var i = comics.length - 1; i >= 0; i--) {
				if(comics[i].Edition==param){
					tempComics.push(comics[i]);
				}
			};

		break;

		case 'Rated':
			for (var i = comics.length - 1; i >= 0; i--) {
				if(comics[i].Rate>=4){
					tempComics.push(comics[i]);
				}
			};

		break;

		case 'Popular':
			for (var i = comics.length - 1; i >= 0; i--) {
				if(comics[i].Lend){
					tempComics.push(comics[i]);
				}
			};

		break;

		case 'Recommended':
			var length=Math.floor(Math.random() * comics.length-1);
			for (var i = 0; i <= length; i++) {
					tempComics.push(comics.pop(Math.floor(Math.random() * comics.length-1)));
			};

		break;

		case 'Borrowing':
			for (var i = comics.length - 1; i >= 0; i--) {
					if(!comics[i].Lend){
						tempComics.push(comics[i]);
					}
			};
		break;
		default:
			tempComics=comics.reverse();
		break;
	}
	for (var i = tempComics.length - 1; i >= 0; i--) {
		tempComics[i].__proto__=Comic();
		tempComics[i].paint();
	};
	paintMenus(JSON.parse(localStorage.getItem('CurrentUser')));
}

// Function for log out of the system
function logOut(){
	window.location.href = "Index.html";
	localStorage.removeItem("CurrentUser");
}