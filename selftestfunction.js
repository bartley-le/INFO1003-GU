function confirmInput() {
    var sum=0;
    var input = document.getElementsByClassName("radio")
    for(var i=0;i<input.length;i++){
    	if(input[i].checked){
    		sum+=parseInt(input[i].value)
    	}
    }
    if(sum>=18){
    	alert("Your hazard index is "+sum+"! Change your habit immediately!You are very likely to get stroke!");
    }
	else if(sum>=9 &&sum<18){
		alert("Your hazard index is "+sum+"! Careful!You maybe get stroke!")
	}
	else{
		alert("Your hazard index is "+sum+"! You are not likely to get stroke.Keep your lifestyle!")
	}
}