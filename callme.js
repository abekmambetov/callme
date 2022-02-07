
document.addEventListener('DOMContentLoaded', function(){ 


    sleep(CALL_ME_WIDJET_START_DELAY*1000).then(() => {
    	widjet();
    });

    widjet = () => {
    	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'callme/widjetTemplate.html', true);

	//Send the proper header information along with the request
	xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

	xhr.onload = function() {

	    if(xhr.status == 200) {

	        var newDiv = document.createElement("div");

	        newDiv.innerHTML = xhr.responseText;

	        var t = newDiv.querySelector('#callme__Main');

		// add to document DOM
		var newElem = document.importNode(t.content, true); // where true means deep copy
		    
		item = document.querySelector("body");

		item.insertBefore(newElem, item.children[0]);
			
		widjetOpenEvent();
		widjetSend();
		widjetCloseEvent();
	    }
	}

	xhr.send();
    }	

    widjetSend = () => {
        
        document.querySelector("[data-role='callme__Btn']").addEventListener('click', event => {
	    
	    console.log(CALL_ME_WIDJET_EMAILS);
	    
	    // Send
	    var phone = document.querySelector("[data-role='callme__Phone']").value;
	    var name = document.querySelector("[data-role='callme__Name']").value;
	    var site = CALL_ME_WIDJET_SITE_NAME;

	    if(phone == "" || name == "") {
		document.querySelector("[data-role='error__Msg']").style.display = "block";
		return;
	    } else {
		document.querySelector("[data-role='error__Msg']").style.display = "none";
	    }

	    var xhr = new XMLHttpRequest();
	    var params = 'phone='+phone+'&name='+name+'&site='+site;
	    xhr.open('POST', 'http://callme.com/api/sendEmail', true);

	    //Send the proper header information along with the request
	    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

	    xhr.onload = function() {
	        if(xhr.status == 200) {
		    var response = JSON.parse(xhr.responseText);  
		    console.log(response);
		}
	    }

	    xhr.send(params);

	    document.querySelector("[data-role='success__Msg']").style.display = "block";

	    sleep(4000).then(() => {
  
		let timerId = setInterval(() => hide(), 1);
  
    	        window.callWidjetPos = 340;

		setTimeout(() => { clearInterval(timerId); console.log('stop'); }, 10000);
	    
	    });


	});
    };

    widjetCloseEvent = () => {

	document.querySelector("[data-role='widjet__Close']").addEventListener('click', event => {
	    sleep(500).then(() => {
    	        let timerId = setInterval(() => hideOpacity(), 100);
    	        window.callWidjetOpacity = 1;
		setTimeout(() => { clearInterval(timerId); console.log('stop'); }, 10000);
	    });
	});
	    
    };

    widjetOpenEvent = () => {
        let timerId = setInterval(() => show(), 10);
        window.callWidjetPos = -0;
	setTimeout(() => { clearInterval(timerId); console.log('stop'); }, 10000);
    };

    hideOpacity = () => {
	window.callWidjetOpacity -=0.1;

	if(window.callWidjetOpacity < 0) return;

	let o = window.callWidjetOpacity;
	//console.log(mgn);
	document.querySelector("[data-role='callme__Widjet']").style.opacity = o;
    };

    show = () => {

	if(window.callWidjetPos > 335) return;

	window.callWidjetPos +=5;

	let mgn = window.callWidjetPos + 'px';

	document.querySelector("[data-role='callme__Widjet']").style.marginRight = mgn;
    };

    hide = () => {
	window.callWidjetPos -=5;

	//if(window.callWidjetPos < -340) return;

	let mgn = window.callWidjetPos + 'px';
	//console.log(mgn);
	document.querySelector("[data-role='callme__Widjet']").style.marginRight = mgn;
    };
		
    function sleep (time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    }

});	

