checkbox = document.getElementById("hamburger");
lab = document.getElementsByTagName("label");

function checker(){
	if(checkbox.checked == false){
  	lab[0].innerHTML = '☰';
  }else{
  	lab[0].innerHTML = '✖';
  }
}

checkbox.onclick = function(){
	checker();
}
