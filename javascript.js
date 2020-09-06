$(function(){
	$("#slider").slider({
		min: 3,
		max: 30,
		slide: function(event,ui){
			$("#inksizecircle").height(ui.value);
			$("#inksizecircle").width(ui.value);
			ctx.lineWidth=ui.value;
		}
	});
	
	//getting the image on load if saved earlier
	if(localStorage.getItem("image") != null){
        var img = new Image();
        img.onload = function(){
            ctx.drawImage(img, 0, 0);   
        }
        img.src = localStorage.getItem("image");
    };
	//variables needed
	var mode=false;
	var paintm="paint";
	var container=$("#canvas1");
	var canvas=document.getElementById("canvas");
	var ctx=canvas.getContext("2d");
	var mouse={x:0,y:0};
	
	
	//mousedown function
	container.mousedown(function(e){
		mode=true;
	  mouse.x=e.pageX-this.offsetLeft;
	  mouse.y=e.pageY-this.offsetTop;
	  ctx.beginPath();
	  ctx.lineCap="round";
      ctx.lineJoin="round";
	  ctx.moveTo(mouse.x,mouse.y);
	  
});
	//mousemove function
	container.mousemove(function(e){
	  mouse.x=e.pageX-this.offsetLeft;
	  mouse.y=e.pageY-this.offsetTop;
		if(mode == true){
		if(paintm == "paint"){
			//draw input color line
			ctx.strokeStyle=$("#paintcolor").val();
			
		}
			else{
				ctx.strokeStyle="white";
			}
			ctx.lineTo(mouse.x,mouse.y);
			ctx.stroke();
	   }
	});
	
	//mouseleave function
	container.mouseleave(function(){
		mode=false;
	});
	
	//mouseup function
	container.mouseup(function(){
		mode=false;
	});
	
	
	//onclicking erase button
    $("#erasebtn").click(function(){
		if(paintm == "paint"){
		paintm="erase";
		}
		else{
			paintm = "paint";
		}
		$(this).toggleClass("erasemode");
	});
	
	
	
	//on clicking save button we are going tpo store our work in local storage
	$("#savebtn").click(function(){
		if(typeof(localStorage)!= null){
			localStorage.setItem("image",canvas.toDataURL());
		}
		else{
			window.alert("Your browser doesn't support local saving ");
		}
	});
	
	
	//onclicking reset button
	$("#resetbtn").click(function(){
		ctx.clearRect(0,0,canvas.width,canvas.height);
		$("#erasebtn").removeClass("erasemode");
	});
	
	//change ink circle color
	$("#paintcolor").change(function(){
		$("#inksizecircle").css("background-color",$(this).val());
	});
	
	
});