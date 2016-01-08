

//====================================================== 
//		ATO: Funktionalitet gem word-fil: 
//======================================================
    var content = "<h1> HEJ Thomas</h1> <p>Det er faktisk js..Er det ikke smart..!</p>";

    var converted = htmlDocx.asBlob(content);
    console.log(converted);


    $(".saveFile").click(function() {
        saveAs(converted, 'test.docx');
    });

//====================================================== 
//		Test local storage
//======================================================

var testJsonObj = {"A": {"A1": 1, "A2": 2, "A3": 3}, "B": {"B1": 1, "B2": 2, "B3": 3}};
var testArray = [1,2,3,4,5];

function checkForLocalStoargeSupport(){
	var TtestJsonObj; var TtestArray;
	if(typeof(Storage) !== "undefined") {
	    // alert("LocalStorage supported!");
	    console.log("checkForLocalStoargeSupport - LocalStorage supported!");
	} else {
	    // alert("LocalStorage NOT supported!");
	    console.log("checkForLocalStoargeSupport - LocalStorage NOT supported!");
	}

	localStorage.setItem("testJsonObj", JSON.stringify(testJsonObj));  	// This is how to save an object in "LocalStorage"
	TtestJsonObj = JSON.parse(localStorage.getItem("testJsonObj"))		// This is how to get an object in "LocalStorage"
	console.log("checkForLocalStoargeSupport - getItem 1: " + JSON.stringify(TtestJsonObj));

	localStorage.setItem("testArray", JSON.stringify(testArray));  	// This is how to save an array in "LocalStorage"
	TtestArray = JSON.parse(localStorage.getItem("testArray"))		// This is how to get an array in "LocalStorage"
	console.log("checkForLocalStoargeSupport - getItem 1: " + JSON.stringify(TtestArray));
}

$( document ).on('click', "#testLocalStorage", function(event){
	checkForLocalStoargeSupport();
    console.log("testLocalStorage - PRESSED");
});


//====================================================== 
//		Object code
//======================================================

// Audio:
// http://www.w3schools.com/html/tryit.asp?filename=tryhtml5_audio_all

// Bootstrap input fields
// http://getbootstrap.com/components/#input-groups





var jsonData = "<h1>OK</h1>";


function ReturnAjaxData(Type, Url, Async, DataType) {
    $.ajax({
        type: Type,
        url: Url,
        async: Async,
        dataType: DataType,
        success: function(Data) {
            console.log("ReturnAjaxData: " + JSON.stringify(Data));
            jsonData = JSON.parse(JSON.stringify(Data));
            // JsonExternalData = JSON.parse(JSON.stringify(Data));
        }
    }).fail(function() {
        alert("Ajax failed to fetch data - the requested quizdata might not exist...");
    });
}


function getSelected(varType){
	for (var n in jsonData.studentSelectedSubject){
    	if (jsonData.studentSelectedSubject[n].selected){
    		if (jsonData.studentSelectedSubject[n].hasOwnProperty(varType)){
    			return jsonData.studentSelectedSubject[n][varType];
    		} else {
    			alert('getSelected - ERROR: varType: "' + varType + '" does not exist!');
    		}
    	}
    }
    alert('getSelected - ERROR: No subject is selected by the student!');
}


// {name: studentSelectedSubject, val: [], selected: false}
function setSelected(varType, varValue){
	for (var n in jsonData.studentSelectedSubject){
    	if (jsonData.studentSelectedSubject[n].selected){
    		if (jsonData.studentSelectedSubject[n].hasOwnProperty(varType)){
    			jsonData.studentSelectedSubject[n][varType] = varValue;
    			break;
    		} else {
    			alert('setSelected - ERROR: varType: "' + varType + '" does not exist!');
    		}
    	}
    }
}





function returnElementNumInArray(tArray, element){
    for (x in tArray){
        if (tArray[x] == element) return x 
    }
    return false;
}
console.log("returnElementNumInArray - (returns 2): " + returnElementNumInArray([1,2,3,4,5], 3));
console.log("returnElementNumInArray - false: " + returnElementNumInArray([1,2,3,4,5], 6));


function returnInputBoxes(numOfBoxex){
	var HTML = '';
	for (var i = 0; i < numOfBoxex; i++) {
		HTML += '<input type="text" class="subjectWordField" placeholder="Skriv ord her..."/>';
	};
	return HTML;
}


function returnAdioControls(audioData){
	var HTML = '';
	HTML += '<audio controls>';
	for (var n in audioData) {
		HTML += '<source src="'+audioData[n].name+'" type="audio/'+audioData[n].type+'">';
	}
	HTML += 	'Your browser does not support the audio element.';
	HTML += '</audio>';
	return HTML;
}
// console.log("returnAdioControls: " + returnAdioControls([{"name": "step_0.mp3", "type": "mpeg"}, {"name": "step_0.ogg", "type": "ogg"}]));



function returnInputBoxes2(numOfBoxex, placeholderText){
	var HTML = '';
	for (var i = 0; i < numOfBoxex; i++) {
		HTML += '<div class="input-group">';
		// HTML += 	'<span class="input-group-addon" id="sizing-addon2">@</span>';
		HTML += 	'<input type="text" class="subjectWordField form-control" placeholder="'+placeholderText+'" aria-describedby="sizing-addon2">';
		HTML += '</div>';
	};
	return HTML;
}

function returnBtns(){
	var subjectWordArray = getSelected('subjectTexts');  // The array of words associated with the subject
	var HTML = '';
	for (var n in subjectWordArray) {
		HTML += '<span class="btn btn-'+((subjectWordArray[n].selected)?'primary':'default')+'">'+subjectWordArray[n].subjectText+'</span>';
	};
	return HTML;
}

function returnStep1(jsonData){
	var HTML = '';
	// HTML += '<h1 id="Header"></h1>';
	HTML += '<h3 id="chooseSubject">Du skal skrive en debatartikel</h3>';
	HTML += '<div id="SubjectContainer" >';
	var JSP = jsonData.subjects.predefined;
	for (var n in JSP){
		HTML += '<span class="Subjects btn btn-default" >'+JSP[n]+'</span>';
	}
	HTML += '</div>';
	HTML += '<br/><span class="helperText">Eller vælg dit eget emne:</span>';
	HTML += '<input id="subjectAddedByStudent" type="text" name="subjectAddedByStudent" placeholder="Skriv dit emne her..."/> <span id="addSubject" class="btn btn-default">Tilføj emne</span>';
	HTML += '<br/><span id="step1_goOn" class="btn btn-primary">Gå videre</span>';
	return HTML;
}


function returnStep2(jsonData){
	var HTML = '';
	HTML += '<h3 id="choosenSubjectText">Skriv ord du forbinder med dit valgte emne: '+getSelected('subjectName')+'</h3>';
	HTML += '<div id="subjectWordContainer">';
	// HTML += returnInputBoxes(3);
	HTML += returnInputBoxes2(3, 'Skriv ord her...');
	HTML += '</div>';
	HTML += '<span id="step2_goOn" class="btn btn-primary">Gå videre</span>';
	return HTML;
}

function returnStep3(){
	var HTML = '';
	HTML += '<h3 id="choosenSubjectText_btn">Udvælg nu tre af dine ord til at skrive videre ud fra</h3>';
	HTML += '<div id="subjectWordContainer_btn">';
	HTML += returnBtns();
	HTML += '</div>';
	HTML += '<span id="step3_goBack" class="btn btn-primary">Gå tilbage</span><span id="step3_goOn" class="btn btn-primary">Gå videre</span>';
	return HTML;
}

$( document ).on('click', "#step2_goOn", function(event){
    console.log("step2_goOn - PRESSED");

    $('#DataInput').html(returnStep3());

});


// $( document ).on('focusout', ".subjectWordField", function(event){

// 	var subjectWord = $(this).val();

// 	if (subjectWord.length > 0){
// 		$(this).after('<span class="subjectWordBtn btn btn-default">'+subjectWord+'</span>');
// 		$(this).remove();

// 		var subjectWordArray = getSelected('subjectTexts');
// 		// subjectWordArray.push(subjectWord);
// 		subjectWordArray.push({subjectText: subjectWord, selected: false});
// 		setSelected('subjectTexts', subjectWordArray);

// 		console.log("subjectWordField - jsonData.studentSelectedSubject 1: " + JSON.stringify(jsonData.studentSelectedSubject)); 
// 	}

// 	if ($( ".subjectWordField" ).length == 0){
// 		// $('#subjectWordContainer').append(returnInputBoxes(1));
// 		$('#subjectWordContainer').append(returnInputBoxes2(1, 'Skriv ord her...'));
// 	}

// 	// $( ".subjectWord" ).each(function( index, element ) {

// 	// });
// });


$( document ).on('click', "#step1_goOn", function(event){
    console.log("step1_goOn - PRESSED");

    if ((typeof(studentSubjectPressed) !== "undefined") && (studentSubjectPressed == true)){
	    // for (var n in jsonData.studentSelectedSubject){
	    // 	if (jsonData.studentSelectedSubject[n].selected){
	    // 		jsonData.studentSelectedSubject[n].selected = true;
	    // 		break;
	    // 	}
	    // }
	    $('#DataInput').html(returnStep2(jsonData));
	} else {
		UserMsgBox("body", "Du skal vælge et emne før du kan gå videre!");
	}
	console.log("step1_goOn - jsonData.studentSelectedSubject 1: " + JSON.stringify(jsonData.studentSelectedSubject));
});

$( document ).on('click', "#addSubject", function(event){
    console.log("addSubject - PRESSED");
    var subjectAddedByStudent = $('#subjectAddedByStudent').val();
    if (subjectAddedByStudent.length > 0){ // If there is one or more chars, do...
	    if (!jsonData.subjects.hasOwnProperty("studentDefined")){
	    	jsonData.subjects.studentDefined = [];
	    } 
		jsonData.subjects.studentDefined.push(subjectAddedByStudent);
		$('#SubjectContainer').append('<span class="Subjects StudentAdded btn btn-default" >'+subjectAddedByStudent+'</span>');
		$('#subjectAddedByStudent').val('');
	    console.log("subjectAddedByStudent - val: " + subjectAddedByStudent);
	    console.log("subjectAddedByStudent - jsonData.subjects.studentDefined: " + jsonData.subjects.studentDefined);
	}

});


//################################################################################################################################
//
//									VERSION 2	-	MAMs med rettelser fra d. 07-01-2016
//
//################################################################################################################################

function returnInputBoxes3(numOfBoxex, Class, placeholderText){
	var HTML = '';
	for (var i = 0; i < numOfBoxex; i++) {
		HTML += '<span class="input-group">';
		// HTML += 	'<span class="input-group-addon" id="sizing-addon2">@</span>';
		HTML += 	'<input type="text" class="'+Class+' form-control" placeholder="'+placeholderText+'" aria-describedby="sizing-addon2">';
		HTML += '</span>';
	};
	return HTML;
}


function hasUniqueElements(Tarray){
	for (var i in Tarray){
		for (var j in Tarray){
			if (i != j){
				if (Tarray[i] === Tarray[j]){
					return false;
				}
			}
		}
	}
	return true;
}

function elementInArray(tArray, element){
    for (x in tArray){
        if (tArray[x] == element) return true 
    }
    return false;
}
console.log("elementInArray - true: " + elementInArray([1,2,3,4,5], 3));
console.log("elementInArray - false: " + elementInArray([1,2,3,4,5], 6));


//////////////////////
//  	STEP 0 		//
//////////////////////

function step_0_template(){
	var HTML = '';
	HTML += '<div id="step_0" class="step">';
	HTML += 	((jsonData.steps[0].hasOwnProperty('header'))?'<h1 id="stepHeader_0" class="stepHeader">'+jsonData.steps[0].header+'</h1>':'');
	HTML += 	((jsonData.steps[0].hasOwnProperty('subHeader'))?'<h3 id="stepSubHeader_0" class="stepSubHeader">'+jsonData.steps[0].subHeader+'</h3>':'');
	HTML += 	((jsonData.steps[0].hasOwnProperty('img'))?'<img id="stepImg_0" class="img-responsive" src="'+jsonData.steps[0].img.src+'" alt="'+jsonData.steps[0].img.alt+'"/>':'');
	HTML += 	'<div class="stepNav">';
	HTML += 		'<span id="step_0_goOn" class="btn btn-lg btn-primary">Gå videre</span>';
	HTML += 		returnAdioControls(jsonData.steps[0].audioFiles);
	HTML += 	'</div>';
	HTML += '</div>';
	return HTML;
}

$( document ).on('click', "#step_0_goOn", function(event){
	$('#DataInput').html(step_1_template());
});


//////////////////////
//  	STEP 1 		//
//////////////////////

function step_1_template(){
	var stepNo = 1;
	var subjectName = null;
	if (jsonData.hasOwnProperty("studentSelectedSubject")){
		subjectName = getSelected('subjectName');
	}
	var HTML = '';
	HTML += '<div id="step_1" class="step">';
	HTML += 	((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_1" class="stepHeader">'+jsonData.steps[stepNo].header+'</h1>':'');
	HTML += 	((jsonData.steps[stepNo].hasOwnProperty('subHeader'))?'<h3 id="stepSubHeader_1" class="stepSubHeader">'+jsonData.steps[stepNo].subHeader+'</h3>':'');
	HTML +=     '<div class="row">';
	HTML += 		'<div id="SubjectContainer" class="col-xs-12 col-md-8">';

	var JS = jsonData.subjects;
	for (var n in JS){
		HTML += 		'<span class="Subjects btn btn-'+((subjectName === JS[n])?'primary':'info')+'" >'+JS[n]+'</span>';
	}
	
	HTML += 		'</div>';
	HTML += 	'</div>';
	HTML += 	'<span class="helperText">Eller vælg dit eget emne:</span>';
	HTML +=		returnInputBoxes3(1, 'studentSubject', 'Skriv dit emne her...');
	HTML += 	'<div class="stepNav">';
	HTML += 		'<span id="step_1_goOn" class="btn btn-lg btn-primary">Gå videre</span>';
	HTML += 		returnAdioControls(jsonData.steps[stepNo].audioFiles);
	HTML += 	'</div>';
	HTML += '</div>';
	return HTML;
}

$( document ).on('click', ".Subjects", function(event){
	window.studentSubjectPressed = true;
    console.log("Subjects - PRESSED");
    $('.Subjects').removeClass('btn-primary');
    $(this).addClass('btn-primary');

    var studentSelectedSubject = $(this).text();

    if (!jsonData.hasOwnProperty("studentSelectedSubject")){
    	jsonData.studentSelectedSubject = [];
    }

    jsonData.studentSelectedSubject.push({subjectName: studentSelectedSubject, selected: false, subjectTexts: [] });

    console.log("Subjects - jsonData.studentSelectedSubject 1: " + JSON.stringify(jsonData.studentSelectedSubject)); 

    for (var n in jsonData.studentSelectedSubject){
    	if (studentSelectedSubject == jsonData.studentSelectedSubject[n].subjectName){
    		jsonData.studentSelectedSubject[n].selected = true;
    	} else {
    		jsonData.studentSelectedSubject[n].selected = false;
    	}
    }

    console.log("Subjects - jsonData.studentSelectedSubject 2: " + JSON.stringify(jsonData.studentSelectedSubject)); 

});

$( document ).on('click', "#step_1_goOn", function(event){
	// $('#DataInput').html(step_1_template());

	window.fallbackStudentSubject = null;

	var studentSubject = $('.studentSubject').val();

	if (studentSubject.length > 0){

		console.log("step_1_goOn - jsonData 1: " + JSON.stringify(jsonData)); 

		if (!jsonData.hasOwnProperty("studentSelectedSubject")){
	    	jsonData.studentSelectedSubject = [];
	    }

		for (var n in jsonData.studentSelectedSubject){
	    		jsonData.studentSelectedSubject[n].selected = false;
	    }

		jsonData.studentSelectedSubject.push({subjectName: studentSubject, selected: true, subjectTexts: [] });
		jsonData.subjects.push(studentSubject);

		if (!hasUniqueElements( jsonData.subjects )) {

			jsonData.studentSelectedSubject.pop();  
			jsonData.subjects.pop();				

			studentSubject = ''; // Reset studentSubject.length to zero, so the studen stays at step 1.
			studentSubjectPressed = false; // Set to false, so the studen stays at step 1.

			if (fallbackStudentSubject !== null) { // Sets the last choosen subjectName as selected.
				if (!elementInArray(jsonData.subjects, fallbackStudentSubject)) {
					jsonData.studentSelectedSubject.push({subjectName: fallbackStudentSubject, selected: true, subjectTexts: [] });
					jsonData.subjects.push(fallbackStudentSubject);
				}
			}

			UserMsgBox("body", "Emnet du har tilføjet eksistere allerede - prøv igen!");
		}
	}

	console.log("step_1_goOn - fallbackStudentSubject: " + fallbackStudentSubject); 
	console.log("step_1_goOn - jsonData.studentSelectedSubject 1: " + JSON.stringify(jsonData.studentSelectedSubject)); 

	if (((typeof(studentSubjectPressed) !== "undefined") && (studentSubjectPressed == true)) || (studentSubject.length > 0)){
		fallbackStudentSubject = studentSubject;
	    $('#DataInput').html(step_2_template());
	} else {
		UserMsgBox("body", "Du skal vælge et emne, eller skrive et valfrit emne, før du kan gå videre!");
	}
});

// $( document ).on('click', ".subjectWordBtn", function(event){
//     console.log("subjectWordBtn - PRESSED");

//     $(this).toggleClass('btn-primary');

//     var subjectWordBtn = $(this).text();

// 	var subjectWordArray = getSelected('subjectTexts');  // The array of words associated with the subject

// 	for (var n in subjectWordArray){
//     	if (subjectWordBtn == subjectWordArray[n].subjectText){
//     		if ($(this).hasClass('btn-primary')) {
// 	    		subjectWordArray[n].selected = true;
// 	    		break;
// 	    	} else {
// 	    		subjectWordArray[n].selected = false;
// 	    		break;
// 	    	}
//     	} 
//     }

// 	setSelected('subjectTexts', subjectWordArray);

// 	console.log("subjectWordBtn - jsonData.studentSelectedSubject 1: " + JSON.stringify(jsonData.studentSelectedSubject)); 
// });



//////////////////////
//  	STEP 2 		//
//////////////////////

function step_2_template(){
	var stepNo = 2;
	var HTML = '';
	HTML += '<div id="step_2" class="step">';
	HTML += 	((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_2" class="stepHeader">'+jsonData.steps[stepNo].header+'</h1>':'');
	HTML += 	((jsonData.steps[stepNo].hasOwnProperty('subHeader'))?'<h3 id="stepSubHeader_2" class="stepSubHeader">'+jsonData.steps[stepNo].subHeader+' '+getSelected('subjectName')+'</h3>':'');
	HTML +=     '<div class="row">';
	HTML += 		'<div id="subjectWordContainer" class="col-xs-12 col-md-8">';
	HTML += 			returnInputBoxes3(3, 'subjectWordField', 'Skriv ord her...');
	HTML += 		'</div>';
	HTML += 	'</div>';
	HTML += 	'<div class="stepNav">';
	HTML += 		'<span id="step_2_goBack" class="btn btn-lg btn-info">Gå tilbage</span>';
	HTML += 		'<span id="step_2_goOn" class="btn btn-lg btn-primary">Gå videre</span>';
	HTML += 		returnAdioControls(jsonData.steps[stepNo].audioFiles);
	HTML += 	'</div>';
	HTML += '</div>';
	return HTML;
}

// $( document ).on('focusout', ".subjectWordField", function(event){  
$( document ).on('focusin', ".subjectWordField", function(event){
	var filledSubjectWordField = 0;
	var numOfSubjectWordField = $('.subjectWordField').length;
	$( ".subjectWordField" ).each(function( index, element ) {
		if ($(element).val().length > 0){
			++filledSubjectWordField;
		}
	});

	if (filledSubjectWordField >= numOfSubjectWordField-1){
		$('#subjectWordContainer').append(returnInputBoxes3(1, 'subjectWordField', 'Skriv ord her...'));
	}
});

$( document ).on('click', "#step_2_goBack", function(event){
	$('#DataInput').html(step_1_template());
});

$( document ).on('click', "#step_2_goOn", function(event){
	
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  							RUN CODE...
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function() {
	// $('#DataInput').html(returnStep1(jsonData));   // GAMMEL VERSION

	$('#DataInput').html(step_0_template());
});



