

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
//		Test local storage
//======================================================

function instruction(instructionText) {
	HTML =  '<h4 class="instruktion">';
	HTML += 	'<div class="left glyphicon glyphicon-arrow-right"></div>';
	HTML += 	'<div class="left instructionText">'+instructionText+'</div>';
	HTML += '</h4>';
	HTML += '<div class="Clear"></div>';
	return HTML;
}

function explanation(explanationText) {
	HTML =  '<div class="explanation">';
	HTML += 	'<div class="left glyphicon glyphicon-bookmark"></div>';
	HTML += 	'<div class="left explanationText">'+explanationText+'</div>';
	HTML += 	'<div class="Clear"></div>';
	HTML += '</div>';
	return HTML;
}


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

 	// if ($('#step_3').length == 0) $('#DataInput').append(returnStep3());
 	// $('.step').hide();
	// $('#step_3').show();
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

		// if ($('#step_2').length == 0) $('#DataInput').append(returnStep2(jsonData));
		// $('.step').hide();
		// $('#step_2').show();
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


function returnInputBoxes3(numOfBoxes, Class, placeholderText){
	var HTML = '';
	for (var i = 0; i < numOfBoxes; i++) {
		HTML += '<span class="input-group">';
		// HTML += 	'<span class="input-group-addon" id="sizing-addon2">@</span>';
		if (typeof(placeholderText) == 'string')
			HTML += 	'<input type="text" class="'+Class+' form-control" placeholder="'+placeholderText+'" aria-describedby="sizing-addon2">';
		if ((Array.isArray(placeholderText)) && (placeholderText.length == numOfBoxes))
			HTML += 	'<input type="text" class="'+Class+' form-control" value="'+placeholderText[i]+'" placeholder="'+placeholderText[i]+'" aria-describedby="sizing-addon2">';
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


function returnStudentSubjectArray(){
	var StudentSubjectArray = [];
	for (var n in jsonData.studentSelectedSubject){
		StudentSubjectArray.push(jsonData.studentSelectedSubject[n].subjectName);
	}
	return StudentSubjectArray;
}


function removeEmptyElements(Tarray){
	for (var i in Tarray){
		if (Tarray[i] === '') {
			Tarray.splice(i, 1);
		}
	}
	return Tarray;
}


function returnElementNumInArray(tArray, element){
    for (x in tArray){
        if (tArray[x] == element) return x 
    }
    return false;
}
console.log("returnElementNumInArray - (returns 2): " + returnElementNumInArray([1,2,3,4,5], 3));
console.log("returnElementNumInArray - false: " + returnElementNumInArray([1,2,3,4,5], 6));


function isSimilar(array1, array2){
	if (array1.length != array1.length) return false;
	for (var n in array1){
		if (array1[n] !== array2[n]) return false;
	}
	return true;
}


function hasNonEmptyStrElm(Tarray) {
	console.log("hasNonEmptyStrElm - Tarray: " + Tarray);
	for (var n in Tarray) {
		if (Tarray[n] === '') return true;
		if (Tarray[n] === null) return true;
	}
	return false;
}


function replaceWildcard(strToReplace, num){
	var numArray = ['nul','en','to','tre','fire','fem','seks','syv','otte','ni','ti','elleve','tolv','tretten','fjorten','femten','seksten','sytten','atten','nitten','tyve'];
	var strArray = strToReplace.split(" ??? ");
	if (num > numArray.length-1) {
		return strArray.join(' '+String(num)+' ');
	} else {
		return strArray.join(' '+numArray[num]+' ');
	}
	return strToReplace;
}
console.log('replaceWildcard: ' + replaceWildcard('Dun har ??? gode cykler tilrådighed, eller ??? dårlige?', 20)); 


function returnDropdownMarkup(DropdownObj){
    var Selected = -1;
    var DO = DropdownObj;
    console.log("DO: " + DO);
    var HTML = '<select'+((DO.hasOwnProperty("id"))?' id="'+DO.id+'"':"")+((DO.hasOwnProperty("class"))?' class="'+DO.class+'"':"")+'>';
    if (DO.hasOwnProperty("selected"))
            Selected = parseInt( DO.selected );
            console.log("returnDropdownMarkup - Selected: " + Selected);
    var DOO = DropdownObj.options;
    for (n in DOO){
        HTML += '<option'+((DOO[n].hasOwnProperty("id"))?' id="'+DOO[n].id+'"':"")+((DOO[n].hasOwnProperty("class"))?' class="'+DOO[n].class+'"':"")+((n == Selected)?' disabled selected':"")+' value="'+((n == Selected)?'':DOO[n].value)+'">'+DOO[n].value+'</option>';
        // HTML += '<option'+((DOO[n].hasOwnProperty("id"))?' id="'+DOO[n].id+'"':"")+((DOO[n].hasOwnProperty("class"))?' class="'+DOO[n].class+'"':"")+' value="'+((n == Selected)?'':DOO[n].value)+'">'+DOO[n].value+'</option>';
        
        // HTML += '<option'+((DOO[n].hasOwnProperty("id"))?' id="'+DOO[n].id+'"':"")+((DOO[n].hasOwnProperty("class"))?' class="'+DOO[n].class+'"':"")+' value="'+DOO[n].value+'">'+DOO[n].value+'</option>';
    };
    HTML += "</select>";
    return HTML;
}

var TDropdown = {id:"Dropdown1", class:"Dropdown", selected: "1",
                    options:[
                        {id:"id1", class:"class1", value:"val 1"},
                        {id:"id2", class:"class2", value:"val 2"},
                        {id:"id3", class:"class3", value:"val 2"}
                    ]
                };
var TDropdown2 = {options:[
                    {value:"val 1"},
                    {value:"val 2"},
                    {value:"val 2"}]
                };
// console.log("returnDropdownMarkup: " + returnDropdownMarkup(TDropdown));
// console.log("returnDropdownMarkup: " + returnDropdownMarkup(TDropdown2));



function getJsonDataArrayIndex(stepNo){
	console.log('getJsonDataArrayIndex - jsonData.steps: ' + JSON.stringify(jsonData.steps));
	for (var n in jsonData.steps){
		console.log('getJsonDataArrayIndex - jsonData.steps['+n+'].step: ' + jsonData.steps[n].step);
		if (jsonData.steps[n].step == stepNo){
			return n;
		}
	}
	alert("getJsonDataArrayIndex ERROR: stepNo not found!");
	return null;
}


function htmlEntities(str) {
    return String(str).replace(/\$/g, '&#36;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}



//////////////////////
//  	STEP 0 		//
//////////////////////

function step_0_template(){
	console.log("step_0_template - jsonData 1: " + JSON.stringify(jsonData)); 
	var stepNo = 0;
	var HTML = '';
	HTML += '<div id="step_0" class="step">';
	HTML +=     '<div class="row">';
	HTML += 		'<div class="col-xs-12 col-md-8">';
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_0" class="stepHeader">'+jsonData.steps[stepNo].header+'</h1>':'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?instruction(jsonData.steps[stepNo].instruction):'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('img'))?'<img id="stepImg_0" class="img-responsive" src="'+jsonData.steps[stepNo].img.src+'" alt="'+jsonData.steps[stepNo].img.alt+'"/>':'');
	HTML += 			'<div class="stepNav">';
	HTML += 				'<span id="step_0_goOn" class="btn btn-lg btn-primary">Gå videre</span>';
	HTML += 				returnAdioControls(jsonData.steps[stepNo].audioFiles);
	HTML +=					'<div class="Clear"></div>';
	HTML += 			'</div>';
	HTML += 		'</div>';
	HTML += 	'</div>';
	HTML += '</div>';
	HTML = replaceWildcard(HTML, jsonData.numOfChoosenWords);
	return HTML;
}

$( document ).on('click', "#step_0_goOn", function(event){
	$('#DataInput').html(step_1_template());

	// if ($('#step_1').length == 0) $('#DataInput').append(step_1_template());
	// $('.step').hide();
	// $('#step_1').show();
});


//////////////////////
//  	STEP 1 		//
//////////////////////

function step_1_template(){
	console.log("step_1_template - jsonData 1: " + JSON.stringify(jsonData)); 
	var stepNo = 1;
	var subjectName = null;
	if (jsonData.hasOwnProperty("studentSelectedSubject")){
		subjectName = getSelected('subjectName');
	}
	var HTML = '';
	HTML += '<div id="step_1" class="step">';
	HTML +=     '<div class="row">';
	HTML += 		'<div class="col-xs-12 col-md-8">';
	
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_1" class="stepHeader">'+jsonData.steps[stepNo].header+'</h1>':'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?instruction(jsonData.steps[stepNo].instruction):'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');
	HTML += 			'<div id="SubjectContainer" class="btnActions">';
			var JS = jsonData.subjects;
			for (var n in JS){
				HTML += 	'<span class="Subjects btn btn-'+((subjectName === JS[n])?'primary':'info')+'" >'+JS[n]+'</span>';
			}
	HTML += 			'</div>';
	HTML += 			'<div class="stepInput">';
	HTML += 				'<span class="helperText">Eller vælg dit eget emne:</span>';
	HTML +=					returnInputBoxes3(1, 'studentSubject', 'Skriv dit emne her...');
	HTML += 			'</div>';
	HTML += 			'<div class="stepNav">';
	HTML += 				'<span id="step_1_goOn" class="btn btn-lg btn-primary">Gå videre</span>';
	HTML += 				returnAdioControls(jsonData.steps[stepNo].audioFiles);
	HTML +=					'<div class="Clear"></div>';
	HTML += 			'</div>';
	HTML += 		'</div>';
	HTML += 	'</div>';
	HTML += '</div>';
	HTML = replaceWildcard(HTML, jsonData.numOfChoosenWords);
	return HTML;
}

$( document ).on('click', ".Subjects", function(event){
	window.studentSubjectPressed = true;
    console.log("Subjects - PRESSED");
    $('.Subjects').removeClass('btn-primary').addClass('btn-info');
    $(this).addClass('btn-primary');

    var studentSelectedSubject = $(this).text();

    if (!jsonData.hasOwnProperty("studentSelectedSubject")){
    	jsonData.studentSelectedSubject = [];
    }

    if (!elementInArray(returnStudentSubjectArray(), studentSelectedSubject)) {  // If studentSelectedSubject is not allready in studentSelectedSubject.subjectName, then add it: 
    	jsonData.studentSelectedSubject.push({subjectName: studentSelectedSubject, selected: false, subjectTexts: [] });
	}

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

	var studentSubject = htmlEntities($('.studentSubject').val());

	if (studentSubject.length > 0){

		console.log("step_1_goOn - jsonData 1: " + JSON.stringify(jsonData)); 

		if (!jsonData.hasOwnProperty("studentSelectedSubject")){
	    	jsonData.studentSelectedSubject = [];
	    }

		for (var n in jsonData.studentSelectedSubject){
	    	jsonData.studentSelectedSubject[n].selected = false;
	    }

		jsonData.studentSelectedSubject.push({subjectName: studentSubject, selected: true, subjectTexts: [] });
		// jsonData.subjects.push(studentSubject);  // Commented out 08-01-2016: We desided against saveing all subjects.

		if (!hasUniqueElements( jsonData.subjects )) {

			jsonData.studentSelectedSubject.pop();  
			jsonData.subjects.pop();				

			studentSubject = ''; // Reset studentSubject.length to zero, so the studen stays at step 1.
			studentSubjectPressed = false; // Set to false, so the studen stays at step 1.

			if (fallbackStudentSubject !== null) { // Sets the last choosen subjectName as selected.
				if (!elementInArray(jsonData.subjects, fallbackStudentSubject)) {
					jsonData.studentSelectedSubject.push({subjectName: fallbackStudentSubject, selected: true, subjectTexts: [] });
					// jsonData.subjects.push(fallbackStudentSubject);  // Commented out 08-01-2016: We desided against saveing all subjects.
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

		// if ($('#step_2').length == 0) $('#DataInput').append(step_2_template());
		// $('.step').hide();
		// $('#step_2').show();
	} else {
		UserMsgBox("body", "Du skal vælge et emne, eller skrive et valfrit emne, før du kan gå videre!");
	}
});



//////////////////////
//  	STEP 2 		//
//////////////////////

function step_2_template(){
	console.log("step_2_template - jsonData 1: " + JSON.stringify(jsonData)); 
	var studentSubjectArray = returnStudentSubjectArray();
	var subjectName = getSelected('subjectName');
	jsonData.selectedSubjectElementNum = returnElementNumInArray(studentSubjectArray, subjectName);  // Save selectedSubjectElementNum in jsonData
	var stepNo = 2;
	var HTML = '';
	HTML += '<div id="step_2" class="step">';
	HTML +=     '<div class="row">';
	HTML += 		'<div class="col-xs-12 col-md-8">';
	
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_2" class="stepHeader">'+jsonData.steps[stepNo].header+'</h1>':'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?instruction(jsonData.steps[stepNo].instruction + subjectName):'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');

	HTML += 			'<div id="subjectWordContainer" class="btnActions">';
				console.log("step_2_template - jsonData.studentSelectedSubject 1: " + JSON.stringify(jsonData.studentSelectedSubject)); 
				
				if (jsonData.studentSelectedSubject[jsonData.selectedSubjectElementNum].subjectTexts.length > 0){
					var subjectTexts = getSelected('subjectTexts');
					HTML += returnInputBoxes3(subjectTexts.length, 'subjectWordField', subjectTexts);
					HTML += returnInputBoxes3(1, 'subjectWordField', 'Skriv ord her...');
					console.log('step_2_template - 1');
				} else {
					HTML += returnInputBoxes3(3, 'subjectWordField', 'Skriv ord her...');
					console.log('step_2_template - 2');
				}
	HTML += 			'</div>';
	HTML += 			'<div class="stepNav">';
	HTML += 				'<span id="step_2_goBack" class="btn btn-lg btn-info">Gå tilbage</span>';
	HTML += 				'<span id="step_2_goOn" class="btn btn-lg btn-primary">Gå videre</span>';
	HTML += 				returnAdioControls(jsonData.steps[stepNo].audioFiles);
	HTML += 			'</div>';
	HTML += 		'</div>';
	HTML += 	'</div>';
	HTML += '</div>';
	HTML = replaceWildcard(HTML, jsonData.numOfChoosenWords);
	return HTML;
}


$( document ).on('focusout', ".subjectWordField", function(event){ 
	// Save the choosen words 1:
	var subjectTextsArray = [];
	$( ".subjectWordField" ).each(function( index, element ) {
		subjectTextsArray.push(htmlEntities($(element).val()));
	});
	subjectTextsArray = removeEmptyElements(subjectTextsArray); // Remove the empty elements
	setSelected('subjectTexts', subjectTextsArray);
	console.log("step_2_goOn - jsonData.studentSelectedSubject 1: " + JSON.stringify(jsonData.studentSelectedSubject)); 
});

// $( document ).on('focusout', ".subjectWordField", function(event){  
$( document ).on('focusin', ".subjectWordField", function(event){

	// var subjectTextsArray = [];
	var filledSubjectWordField = 0;
	var numOfSubjectWordField = $('.subjectWordField').length;
	$( ".subjectWordField" ).each(function( index, element ) {
		if ($(element).val().length > 0){
			++filledSubjectWordField;

			// subjectTextsArray.push($(element).val());
			// setSelected('subjectTexts', subjectTextsArray);
		}
	});
	console.log("focusin - numOfSubjectWordField: " + numOfSubjectWordField + ", filledSubjectWordField: " + filledSubjectWordField); 
	console.log("focusin - jsonData.studentSelectedSubject 1: " + JSON.stringify(jsonData.studentSelectedSubject)); 

	var Ajust = 0;
	if ($(this).val().length > 0) {  // This prevents an extra field of being added if an old field with text inside is being edited.
		Ajust = 1;
	}

	if (filledSubjectWordField == numOfSubjectWordField-1+Ajust){
		$('#subjectWordContainer').append(returnInputBoxes3(1, 'subjectWordField', 'Skriv ord her...'));
	}
});

$( document ).on('click', "#step_2_goBack", function(event){
	$('#DataInput').html(step_1_template());

	// $('.step').hide();
	// $('#step_1').show();

	var subjectNameSelected = getSelected('subjectName');
	if (!elementInArray(jsonData.subjects, subjectNameSelected)) {  // If subjectNameSelected is NOT in jsonData.subjects, then subjectNameSelected is written in the input-text-field... 
		$('.studentSubject').val(subjectNameSelected); 
	}
});

$( document ).on('click', "#step_2_goOn", function(event){

	var subjectTextsArray = getSelected('subjectTexts');
	subjectTextsArray = removeEmptyElements(subjectTextsArray); // Remove the empty elements
	setSelected('subjectTexts', subjectTextsArray);

	if (subjectTextsArray.length >= jsonData.numOfChoosenWords){
		$('#DataInput').html(step_3_template());
	} else {
		UserMsgBox("body", 'Du skal skrive mindst '+jsonData.numOfChoosenWords+' ord før du kan gå videre. Du har kun skrevet '+subjectTextsArray.length+' ord.');
	}

});


//////////////////////
//  	STEP 3 		//
//////////////////////


function step_3_template(){
	console.log("step_3_template - jsonData 1: " + JSON.stringify(jsonData)); 
	var stepNo = 3;
	var HTML = '';
	HTML += '<div id="step_3" class="step">';
	HTML +=     '<div class="row">';
	HTML += 		'<div class="col-xs-12 col-md-8">';

	// var subjectTexts = getSelected('subjectTexts');
	// for (var n in subjectTexts){
	// 	HTML += 		'<span class="subjectWordField_btn btn btn-info">'+subjectTexts[n]+'</span>';
	// }
	
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_3" class="stepHeader">'+jsonData.steps[stepNo].header+'</h1>':'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?instruction(jsonData.steps[stepNo].instruction):'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');

	HTML += 			'<div id="subjectWordField_btn_Container" class="btnActions">';
			var subjectTexts = getSelected('subjectTexts');
			if (jsonData.studentSelectedSubject[jsonData.selectedSubjectElementNum].hasOwnProperty('subjectTexts_selected')){
				var subjectTexts_selected = getSelected('subjectTexts_selected');
				for (var i = 0; i < subjectTexts.length; i++) {
					HTML += '<span class="subjectWordField_btn btn btn-'+((elementInArray(subjectTexts_selected, i))?'primary':'info')+'">'+subjectTexts[i]+'</span>';
				}
			} else {
				for (var n in subjectTexts){
					HTML += '<span class="subjectWordField_btn btn btn-info">'+subjectTexts[n]+'</span>';
				}
			}
	HTML += 			'</div>';
	HTML += 			'<div class="stepNav">';
	HTML += 				'<span id="step_3_goBack" class="btn btn-lg btn-info">Gå tilbage</span>';
	HTML += 				'<span id="step_3_goOn" class="btn btn-lg btn-primary">Gå videre</span>';
	HTML += 				returnAdioControls(jsonData.steps[stepNo].audioFiles);
	HTML += 			'</div>';
	HTML += 		'</div>';
	HTML += 	'</div>';
	HTML += '</div>';
	HTML = replaceWildcard(HTML, jsonData.numOfChoosenWords);
	return HTML;
}

$( document ).on('click', ".subjectWordField_btn", function(event){
	$(this).toggleClass('btn-primary btn-info');

	if (!jsonData.studentSelectedSubject[jsonData.selectedSubjectElementNum].hasOwnProperty('subjectTexts_selected')){
		jsonData.studentSelectedSubject[jsonData.selectedSubjectElementNum].subjectTexts_selected = [];
	}

	var Tarray = []
	$( ".subjectWordField_btn" ).each(function( index, element ) {
		if ($(element).hasClass('btn-primary')){
			Tarray.push($(element).index());
		}
	});
	jsonData.studentSelectedSubject[jsonData.selectedSubjectElementNum].subjectTexts_selected = Tarray;
	console.log("subjectWordField_btn - jsonData.studentSelectedSubject 1: " + JSON.stringify(jsonData.studentSelectedSubject)); 
	console.log('subjectWordField_btn - index: ' + $(this).index());
});

$( document ).on('click', "#step_3_goBack", function(event){
	// $('#DataInput').html('<div id="step_2" class="step">'+jsonData.htmlSteps.step_2+'</div>');
	// $('#step_2').append('<b>TEST</b>');

	// $('.step').hide();
	// $('#step_2').show();

	$('#DataInput').html(step_2_template());
});

$( document ).on('click', "#step_3_goOn", function(event){

	var numOfWords = jsonData.studentSelectedSubject[jsonData.selectedSubjectElementNum].subjectTexts_selected.length;
	console.log('step_3_goOn - numOfWords: ' + numOfWords + ', jsonData.numOfChoosenWords: ' + jsonData.numOfChoosenWords);

	if (numOfWords == jsonData.numOfChoosenWords){
		$('#DataInput').html(step_4_template());
	} else {
		UserMsgBox("body", "Du skal vælge 3 ord før du kan gå videre. Du har valgt " + numOfWords + " ord.");
	}
});



//////////////////////
//  	STEP 4 		//
//////////////////////



function step_4_template(){
	console.log("step_4_template - wordCount: " + ((typeof(wordCount) !== 'undefined')?wordCount:'undefined'));
	console.log("step_4_template - jsonData 1: " + JSON.stringify(jsonData)); 
	console.log("step_4_template - jsonData.studentSelectedSubject 1: " + JSON.stringify(jsonData.studentSelectedSubject)); 
	if ((typeof(wordCount) === 'undefined') || (wordCount === null)) { 
		window.wordCount = 0;
	} else {
		++wordCount;
	}
	console.log("step_4_template - wordCount: " + wordCount);
	var JSN = jsonData.studentSelectedSubject[jsonData.selectedSubjectElementNum];
	var stepNo = 4;
	var HTML = '';
	HTML += '<div id="step_4" class="step">';
	HTML +=     '<div class="row">';
	HTML += 		'<div class="col-xs-12 col-md-8">';

	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_4" class="stepHeader">'+jsonData.steps[stepNo].header+'</h1>':'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?instruction(jsonData.steps[stepNo].instruction):'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');

	HTML += 			'<div id="subjectWordSentenceContainer" class="btnActions">';
			var subjectTexts = getSelected('subjectTexts');
			var subjectTexts_selected = getSelected('subjectTexts_selected');
			for (var i = 0; i < subjectTexts_selected.length; i++) {
				HTML += 	'<span class="subjectWordField_btn_text btn btn-'+((i == wordCount)?'primary':'info')+'">'+subjectTexts[ subjectTexts_selected[i] ]+'</span>';
			}
	HTML += 			'</div>';
	HTML += 			'<h4>Brug evt. nedenstående sætningsstartere til at skrive videre ud fra:</h4>';

	HTML += 			'<div class="DropdownWrap">';
	HTML += 				returnDropdownMarkup(jsonData.sentenceStarters_word);
	HTML += 			'</div>';

	HTML += 			'<textarea id="textInput_'+wordCount+'" val="">';
			if ((JSN.hasOwnProperty('subjectTexts_sentences')) && (typeof(JSN.subjectTexts_sentences[wordCount]) !== 'undefined')) {
				HTML += JSN.subjectTexts_sentences[wordCount];
			}			
	HTML += 			'</textarea>';
	HTML += 			'<div class="stepNav">';
	HTML += 				'<span id="step_4_goBack" class="btn btn-lg btn-info">Gå tilbage</span>';
	HTML += 				'<span id="step_4_goOn" class="btn btn-lg btn-primary">Gå videre</span>';
	HTML += 				returnAdioControls(jsonData.steps[stepNo].audioFiles);
	HTML += 			'</div>';
	HTML += 		'</div>';
	HTML += 	'</div>';
	HTML += '</div>';
	HTML = replaceWildcard(HTML, jsonData.numOfChoosenWords);
	return HTML;
}


$(document).on('change', '#Dropdown1', function(){
	// var selectedText = $('#Dropdown1:selected').text();
	var selectedText = $('#Dropdown1').val();
	console.log("Dropdown1 - selectedText: " + selectedText);
	$('#textInput_'+wordCount).val(selectedText);
});


$( document ).on('click', ".subjectWordField_btn_text", function(event){
	var index = $(this).index();
	console.log("subjectWordField_btn_text - index: " + index);
	 
	// -----------------------
	console.log("subjectWordField_btn_text - jsonData.studentSelectedSubject 1: " + JSON.stringify(jsonData.studentSelectedSubject)); 
	var JSN = jsonData.studentSelectedSubject[jsonData.selectedSubjectElementNum];
	if (!JSN.hasOwnProperty('subjectTexts_sentences')){
		JSN.subjectTexts_sentences = [];
		for (var i = 0; i < jsonData.numOfChoosenWords; i++) {
			JSN.subjectTexts_sentences.push('');
		};
	}

	var sentence = $('#textInput_'+wordCount).val();
	console.log("subjectWordField_btn_text - wordCount: " + wordCount + ", sentence: " + sentence);
	console.log("subjectWordField_btn_text - $('#textInput_'+wordCount).val(): " + $('#textInput_'+wordCount).val());
	// if (sentence.length > 0) {
		// if (JSN.subjectTexts_sentences.length < jsonData.numOfChoosenWords-1){
		if (wordCount < jsonData.numOfChoosenWords-1){
			// JSN.subjectTexts_sentences.push(sentence);
			JSN.subjectTexts_sentences[wordCount] = sentence;
			// $('#DataInput').html(step_4_template());
			console.log("subjectWordField_btn_text - jsonData.studentSelectedSubject 2: " + JSON.stringify(jsonData.studentSelectedSubject)); 
		} else {
			JSN.subjectTexts_sentences[wordCount] = sentence;
			// $('#DataInput').html(step_4b_template());
			console.log("subjectWordField_btn_text - jsonData.studentSelectedSubject 3: " + JSON.stringify(jsonData.studentSelectedSubject));
			// makeSortable();
		}

	// }
	// -----------------------
	wordCount = index-1; 
	$('#DataInput').html(step_4_template());   // 12-01-2016  <-----------  DATA SKAL GEMMENS HER!!!
});


$( document ).on('click', "#step_4_goBack", function(event){
	if ((typeof(wordCount) === 'undefined') || (wordCount == 0)){
		$('#DataInput').html(step_3_template());
		wordCount = null;
		console.log("step_4_goBack - wordCount: " + wordCount);
	} else {
		--wordCount;  	// Once...
		--wordCount;	// twice... because of the inscreasement inside step_4_template
		$('#DataInput').html(step_4_template());
	}
});

$( document ).on('click', "#step_4_goOn", function(event){
	console.log("step_4_goOn - jsonData.studentSelectedSubject 1: " + JSON.stringify(jsonData.studentSelectedSubject)); 
	var JSN = jsonData.studentSelectedSubject[jsonData.selectedSubjectElementNum];
	if (!JSN.hasOwnProperty('subjectTexts_sentences')){
		JSN.subjectTexts_sentences = [];
		for (var i = 0; i < jsonData.numOfChoosenWords; i++) {
			JSN.subjectTexts_sentences.push('');
		};
	}

	var sentence = htmlEntities($('#textInput_'+wordCount).val());
	console.log("step_4_goOn - wordCount: " + wordCount + ", sentence: " + sentence);
	console.log("step_4_goOn - $('#textInput_'+wordCount).val(): " + $('#textInput_'+wordCount).val());
	if (sentence.length > 0) {
		// JSN.subjectTexts_sentences[wordCount] = sentence;
		// if (JSN.subjectTexts_sentences.length < jsonData.numOfChoosenWords-1){
		if (wordCount < jsonData.numOfChoosenWords-1){
			// JSN.subjectTexts_sentences.push(sentence);
			JSN.subjectTexts_sentences[wordCount] = sentence;
			console.log("step_4_goOn - jsonData.studentSelectedSubject 2: " + JSON.stringify(jsonData.studentSelectedSubject));
			// if (hasNonEmptyStrElm( JSN.subjectTexts_sentences )){   	// IF-ELSE OK: den sender kursisten videre til 4b hvis alle subjectTexts_sentences er udfyldt!
				$('#DataInput').html(step_4_template());
			// } else {													// IF-ELSE OK: den sender kursisten videre til 4b hvis alle subjectTexts_sentences er udfyldt!
			// 	$('#DataInput').html(step_4b_template());
			// 	makeSortable();
			// }
			
		} else {
			JSN.subjectTexts_sentences[wordCount] = sentence;
			console.log("step_4_goOn - jsonData.studentSelectedSubject 3: " + JSON.stringify(jsonData.studentSelectedSubject));
			if (!hasNonEmptyStrElm( JSN.subjectTexts_sentences )){
				// JSN.subjectTexts_sentences[wordCount] = sentence;
				console.log("step_4_goOn - jsonData.studentSelectedSubject 4: " + JSON.stringify(jsonData.studentSelectedSubject));
				$('#DataInput').html(step_4b_template());
				
				makeSortable();
			} else {
				UserMsgBox("body", "Du skal skrive noget tekst i alle tekstboksene.");
			}
		}

	} else {
		UserMsgBox("body", "Du skal skrive noget tekst i tekstboksen - brug evt en sætningsstarter fra dropdownen.");
	}

});



//////////////////////
//  	STEP 4b 	//
//////////////////////


function step_4b_template(){
	console.log("step_4b_template - jsonData 1: " + JSON.stringify(jsonData));
	var JSN = jsonData.studentSelectedSubject[jsonData.selectedSubjectElementNum];
	var JSNS = (JSN.hasOwnProperty('subjectTexts_sentences_2'))? JSN.subjectTexts_sentences_2 : JSN.subjectTexts_sentences;
	var stepNo = "4b";
	stepNo = getJsonDataArrayIndex(stepNo);
	console.log("step_4b_template - stepNo: " + stepNo);
	var HTML = '';
	HTML += '<div id="step_4b" class="step">';
	HTML +=     '<div class="row">';
	HTML += 		'<div class="col-xs-12 col-md-8">';

	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_4b" class="stepHeader">'+jsonData.steps[stepNo].header+'</h1>':'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?instruction(jsonData.steps[stepNo].instruction):'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');
	HTML += 			'<div id="subjectSentenceSortableContainer" class="btnActions">';
			for (var n in JSNS) {
				HTML += 	'<div id="Sort_"'+n+' class="Sortable sortable_text_container">'+JSNS[n]+'</div>';
			}
	HTML += 			'</div>';
	HTML += 			'<div class="stepNav">';
	HTML += 				'<span id="step_4b_goBack" class="btn btn-lg btn-info">Gå tilbage</span>';
	HTML += 				'<span id="step_4b_goOn" class="btn btn-lg btn-primary">Gå videre</span>';
	HTML += 				returnAdioControls(jsonData.steps[stepNo].audioFiles);
	HTML += 			'</div>';
	HTML += 		'</div>';
	HTML += 	'</div>';
	HTML += '</div>';
	HTML = replaceWildcard(HTML, jsonData.numOfChoosenWords);
	return HTML;
}


function makeSortable() {
	// Sort function are placed here due to readiness issues of the DOM:
	$( "#subjectSentenceSortableContainer" ).sortable({
		axis: 'y',
		sortAnimateDuration: 500,
	    sortAnimate: true,
	    distance: 25,
	    update: function(event, ui) {
	    	console.log('makeSortable - UPDATE');
	    	updateSubjectSentenceOrder();
	    },
	    start: function(event, ui) {
	    	console.log('makeSortable - START');
	        console.log('makeSortable - ui.item.index: ' + ui.item.index());
	    },
	    stop: function(event, ui) {
	        console.log('makeSortable - STOP');
	    }
	});
}


function updateSubjectSentenceOrder(){
	console.log("updateSubjectSentenceOrder - jsonData.studentSelectedSubject 1: " + JSON.stringify(jsonData.studentSelectedSubject));
	var Tarray = [];
	$( ".Sortable" ).each(function( index, element ) {
		Tarray.push($(element).text());
	});

	var JSN = jsonData.studentSelectedSubject[jsonData.selectedSubjectElementNum];
	if (!JSN.hasOwnProperty('subjectTexts_sentences')){
		JSN.subjectTexts_sentences_2 = [];
	}
	jsonData.studentSelectedSubject[jsonData.selectedSubjectElementNum].subjectTexts_sentences_2 = Tarray;
	console.log("updateSubjectSentenceOrder - jsonData.studentSelectedSubject 2: " + JSON.stringify(jsonData.studentSelectedSubject));
	console.log("updateSubjectSentenceOrder - jsonData 1: " + JSON.stringify(jsonData)); 
}


$( document ).on('click', "#step_4b_goBack", function(event){
	if (typeof(step_4b_hasBeenSorted) === 'undefined'){
		window.step_4b_hasBeenSorted = false;
	}
	var JSN = jsonData.studentSelectedSubject[jsonData.selectedSubjectElementNum];
	if ((!JSN.hasOwnProperty('subjectTexts_sentences_2')) || (step_4b_hasBeenSorted)) {
		window.wordCount = jsonData.numOfChoosenWords-2;  // Sets the state to the last btn of step 4. 
		console.log("step_4b_goBack - wordCount: " + wordCount); 
		$('#DataInput').html(step_4_template());
	}
	if ((JSN.hasOwnProperty('subjectTexts_sentences_2')) && (step_4b_hasBeenSorted == false)) {
		$( ".Sortable" ).each(function( index, element ) {
			$(element).text(JSN.subjectTexts_sentences[index]);
		});
		step_4b_hasBeenSorted = true;
	} 

});

$( document ).on('click', "#step_4b_goOn", function(event){
	$('#DataInput').html(step_5_template());
});



//////////////////////
//  	STEP 5 		//
//////////////////////


function step_5_template(){
	console.log("step_5_template - jsonData 1: " + JSON.stringify(jsonData));
	var JSN = jsonData.studentSelectedSubject[jsonData.selectedSubjectElementNum];
	var stepNo = 5;
	stepNo = getJsonDataArrayIndex(stepNo);
	var HTML = '';
	HTML += '<div id="step_5" class="step">';
	HTML +=     '<div class="row">';
	HTML += 		'<div class="col-xs-12 col-md-8">';
	
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_5" class="stepHeader">'+jsonData.steps[stepNo].header+'</h1>':'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?instruction(jsonData.steps[stepNo].instruction):'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');

	HTML += 			'<h4>Brug evt. nedenstående sætningsstartere til at skrive videre ud fra:</h4>';

	HTML += 			'<div class="DropdownWrap">';
	HTML += 				returnDropdownMarkup(jsonData.sentenceStarters_begin);
	HTML += 			'</div>';
	
	HTML += 			'<textarea id="textInput2" val="">';
			HTML += (JSN.hasOwnProperty('sentenceStarters_begin_text'))? JSN.sentenceStarters_begin_text : '';
	HTML += 			'</textarea>';
	HTML += 			'<div class="stepNav">';
	HTML += 				'<span id="step_5_goBack" class="btn btn-lg btn-info">Gå tilbage</span>';
	HTML += 				'<span id="step_5_goOn" class="btn btn-lg btn-primary">Gå videre</span>';
	HTML += 				returnAdioControls(jsonData.steps[stepNo].audioFiles);
	HTML += 			'</div>';
	HTML += 		'</div>';
	HTML += 	'</div>';
	HTML += '</div>';
	HTML = replaceWildcard(HTML, jsonData.numOfChoosenWords);
	return HTML;
}


$(document).on('change', '#Dropdown2', function(){
	// var selectedText = $('#Dropdown1:selected').text();
	var selectedText = $('#Dropdown2').val();
	console.log("Dropdown1 - selectedText: " + selectedText);
	$('#textInput2').val(selectedText);
	jsonData.studentSelectedSubject[jsonData.selectedSubjectElementNum].JSN.sentenceStarters_begin_text = textInputText;
});

$( document ).on('click', "#step_5_goBack", function(event){
	$('#DataInput').html(step_4b_template());
});

$( document ).on('click', "#step_5_goOn", function(event){
	console.log("step_5_goOn - jsonData.studentSelectedSubject 1: " + JSON.stringify(jsonData.studentSelectedSubject));
	var textInputText = htmlEntities($('#textInput2').val());
	if (textInputText.length > 0) {
		var JSN = jsonData.studentSelectedSubject[jsonData.selectedSubjectElementNum];
		JSN.sentenceStarters_begin_text = textInputText;
		$('#DataInput').html(step_6_template());
	}
	console.log("step_5_goOn - jsonData.studentSelectedSubject 2: " + JSON.stringify(jsonData.studentSelectedSubject));
});

//////////////////////
//  	STEP 6 		//
//////////////////////


function step_6_template(){
	console.log("step_6_template - jsonData 1: " + JSON.stringify(jsonData));
	var JSN = jsonData.studentSelectedSubject[jsonData.selectedSubjectElementNum];
	var stepNo = 6;
	stepNo = getJsonDataArrayIndex(stepNo);
	var HTML = '';
	HTML += '<div id="step_6" class="step">';
	HTML +=     '<div class="row">';
	HTML += 		'<div class="col-xs-12 col-md-8">';
	
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_6" class="stepHeader">'+jsonData.steps[stepNo].header+'</h1>':'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?instruction(jsonData.steps[stepNo].instruction):'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');

	HTML += 			'<h4>Brug evt. nedenstående sætningsstartere til at skrive videre ud fra:</h4>';

	HTML += 			'<div class="DropdownWrap">';
	HTML += 				returnDropdownMarkup(jsonData.sentenceStarters_begin);
	HTML += 			'</div>';
	
	HTML += 			'<textarea id="textInput3" val="">';
			HTML += (JSN.hasOwnProperty('sentenceStarters_end_text'))? JSN.sentenceStarters_end_text : '';
	HTML += 			'</textarea>';
	HTML += 			'<div class="stepNav">';
	HTML += 				'<span id="step_6_goBack" class="btn btn-lg btn-info">Gå tilbage</span>';
	HTML += 				'<span id="step_6_goOn" class="btn btn-lg btn-primary">Gå videre</span>';
	HTML += 				returnAdioControls(jsonData.steps[stepNo].audioFiles);
	HTML += 			'</div>';
	HTML += 		'</div>';
	HTML += 	'</div>';
	HTML += '</div>';
	return HTML;
}


$(document).on('change', '#Dropdown3', function(){
	// var selectedText = $('#Dropdown1:selected').text();
	var selectedText = $('#Dropdown3').val();
	console.log("Dropdown1 - selectedText: " + selectedText);
	$('#textInput3').val(selectedText);
	jsonData.studentSelectedSubject[jsonData.selectedSubjectElementNum].JSN.sentenceStarters_end_text = textInputText;
});

$( document ).on('click', "#step_6_goBack", function(event){
	$('#DataInput').html(step_5_template());
});

$( document ).on('click', "#step_6_goOn", function(event){
	console.log("step_6_goOn - jsonData.studentSelectedSubject 1: " + JSON.stringify(jsonData.studentSelectedSubject));
	var textInputText = htmlEntities($('#textInput3').val());
	if (textInputText.length > 0) {
		var JSN = jsonData.studentSelectedSubject[jsonData.selectedSubjectElementNum];
		JSN.sentenceStarters_end_text = textInputText;
		$('#DataInput').html(step_6b_template());
	}
	console.log("step_6_goOn - jsonData.studentSelectedSubject 2: " + JSON.stringify(jsonData.studentSelectedSubject));
});

//////////////////////
//  	STEP 6b 	//
//////////////////////


function step_6b_template(){
	console.log("step_6b_template - jsonData 1: " + JSON.stringify(jsonData));
	var JSN = jsonData.studentSelectedSubject[jsonData.selectedSubjectElementNum];
	var stepNo = "6b";
	stepNo = getJsonDataArrayIndex(stepNo);
	var HTML = '';
	HTML += '<div id="step_6b" class="step">';
	HTML +=     '<div class="row">';
	HTML += 		'<div id="subjectHeadingContainer" class="col-xs-12 col-md-8">';
	
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_6b" class="stepHeader">'+jsonData.steps[stepNo].header+'</h1>':'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?instruction(jsonData.steps[stepNo].instruction):'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');

	// HTML += 			returnInputBoxes3(1, 'studentSubjectTitel', ' Skriv din overskrift her');
			var studentSubjectTitel = (JSN.hasOwnProperty('studentSubjectTitel'))? JSN.studentSubjectTitel : 'Skriv din overskrift her';
	HTML += 			returnInputBoxes3(1, 'studentSubjectTitel', studentSubjectTitel);
	
	HTML += 			'<div class="stepNav">';
	HTML += 				'<span id="step_6b_goBack" class="btn btn-lg btn-info">Gå tilbage</span>';
	HTML += 				'<span id="step_6b_goOn" class="btn btn-lg btn-primary">Gå videre</span>';
	HTML += 				returnAdioControls(jsonData.steps[stepNo].audioFiles);
	HTML += 			'</div>';
	HTML += 		'</div>';
	HTML += 	'</div>';
	HTML += '</div>';
	HTML = replaceWildcard(HTML, jsonData.numOfChoosenWords);
	return HTML;
}


$( document ).on('click', "#step_6b_goBack", function(event){
	$('#DataInput').html(step_6_template());
});

$( document ).on('click', "#step_6b_goOn", function(event){
	console.log("step_6b_goOn - jsonData.studentSelectedSubject 1: " + JSON.stringify(jsonData.studentSelectedSubject));
	var textInputText = htmlEntities($('.studentSubjectTitel').val());
	if (textInputText.length > 0) {
		var JSN = jsonData.studentSelectedSubject[jsonData.selectedSubjectElementNum];
		JSN.studentSubjectTitel = [];
		JSN.studentSubjectTitel[0] = textInputText;
		$('#DataInput').html(step_7_template());
	}
	console.log("step_6b_goOn - jsonData.studentSelectedSubject 2: " + JSON.stringify(jsonData.studentSelectedSubject));
});


//////////////////////
//  	STEP 7 		//
//////////////////////


function step_7_template(){
	console.log("step_7_template - jsonData 1: " + JSON.stringify(jsonData));
	var JSN = jsonData.studentSelectedSubject[jsonData.selectedSubjectElementNum];
	var stepNo = "7";
	stepNo = getJsonDataArrayIndex(stepNo);
	var HTML = '';
	HTML += '<div id="step_7" class="step">';
	HTML +=     '<div class="row">';
	HTML += 		'<div id="XXXXXXX" class="col-xs-12 col-md-8">';

	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('header'))?'<h1 id="stepHeader_7" class="stepHeader">'+jsonData.steps[stepNo].header+'</h1>':'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('instruction'))?instruction(jsonData.steps[stepNo].instruction):'');
	HTML += 			((jsonData.steps[stepNo].hasOwnProperty('explanation'))?explanation(jsonData.steps[stepNo].explanation):'');

	HTML += 			'<div class="TextHolder">';
	// HTML += 				'<h3>Titel står her</h3><p>Alle kan blive enige om at det er et problem at vi nu har opbygget så meget af verdens energiforbrug på atomkraft, da det har så stor risiko for fremtiden knyttet til sig.</p><p>Hvis nogen skulle være i tvivl om at det er et problem at vi får så meget energi fra atomkraft, så bør man tænke på ulykken i Tjernobyl.</p><p>Mit hovedsynspunkt er at det er uforsvarligt overfor fremtidens børn at bygge et energiforbrug op der har så ukendte konsekvenser for fremtiden.</p><p>På den ene side kan man være for atomkraft, da der reelt er mange fordele ved at skrue op for brugen af atomkraft og derved mindske forbruget af fossile brændstoffer, indtil vi har bedre og renere energikilder i det omfang det kræves til den voksende verdensbefolkning. På den anden siden kan man være i mod atomkraft da man med rette kan hævde at vi reelt ikke hvad der vil ske med det opbevarede atomaffald.</p><p>Afslutningsvis kan man sige at fremtiden nok vil afgøre atomkrafts skæbne. Enten vil der ske en voldsomulykke der gør at menneskeheden dropper det, eller så vil nye energikilder vinde hastigt frem.</p>';
	HTML += 				'<h3>'+JSN.studentSubjectTitel[0]+'</h3>';
	HTML += 				'<p>'+JSN.sentenceStarters_begin_text+'</p>';
			for (var n in JSN.subjectTexts_sentences_2){
				HTML += 	'<p>'+JSN.subjectTexts_sentences_2[n]+'</p>';
			}
	HTML += 				'<p>'+JSN.sentenceStarters_end_text+'</p>';

	HTML += 			'</div>';
	HTML += 			'<div class="stepNav">';
	HTML += 				'<span id="step_7_goBack" class="btn btn-lg btn-info">Gå tilbage</span>';
	HTML += 				'<span id="step_7_download" class="btn btn-lg btn-primary">DOWNLOAD Word fil (.docx)</span>';
	// HTML += 				returnAdioControls(jsonData.steps[stepNo].audioFiles);
	HTML += 			'</div>';
	HTML += 		'</div>';
	HTML += 	'</div>';
	HTML += '</div>';
	HTML = replaceWildcard(HTML, jsonData.numOfChoosenWords);
	return HTML;
}


$( document ).on('click', "#step_7_goBack", function(event){
	$('#DataInput').html(step_6b_template());
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  							RUN CODE...
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).ready(function() {
	
	
	$('#DataInput').html(step_0_template());
	jsonData.currentStep = 0;

	// =========================================================================
	// if((typeof(Storage) !== "undefined") && (localStorage.getItem("danA_skriveproces") !== null)) {

	// 	var danA_skriveproces = localStorage.getItem("danA_skriveproces");
	//     // alert("LocalStorage supported!");
	//     console.log("checkForLocalStoargeSupport - LocalStorage supported!");

	//     if (danA_skriveproces.hasOwnProperty('currentStep')){
	//     	var HTML = '';
	//     	HTML += 'Ønsker du at fortsætte hvor du slap?';
	//     	HTML += '<span class="btn btn-sucess">ja</span> <span class="btn btn-danger">nej</span>';
	//     	UserMsgBox("body", HTML);
	//     	// $('#DataInput').html(eval('step_'+danA_skriveproces.currentStep+'_template'));
	//     }
	// } else {
	//     // alert("LocalStorage NOT supported!");
	//     console.log("checkForLocalStoargeSupport - LocalStorage NOT supported!");
	// }
	// =========================================================================


	// STEP 0:
	// $('#DataInput').html(step_0_template());

	// STEP 1:
	// jsonData = {"subjects":["Rygning","Syrien","Atomkraft","Grafitti","Spis mindre kød","Doping","Prostitution","Lægeordineret heroin","Fri hash"],"numOfChoosenWords":3,"sentenceStarters_word":{"id":"Dropdown1","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - ord - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - ord -  1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - ord -  2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - ord -  3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - ord -  4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - ord -  5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_begin":{"id":"Dropdown2","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - start - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - start - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - start - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - start - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - start - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - start - 5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_end":{"id":"Dropdown3","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - slut - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - slut - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - slut - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - slut - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - slut - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - slut - 5: Lorem ipsum dolor sit amet..."}]},"steps":[{"step":0,"header":"(step 0) Guidet skriveproces - skriv en debatartikel.","img":{"src":"img/start_img_750x350.jpg","alt":"Billede af XXX"},"audioFiles":[{"name":"audio/step_0.mp3","type":"mpeg"}]},{"step":1,"header":"(step 1) Guidet skriveproces - skriv en debatartikel.","instruction":"Vælg et af følgende emner (klik og vælg)","audioFiles":[{"name":"audio/step_1.mp3","type":"mpeg"}]},{"step":2,"header":"(step 2) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav en brainstorm på dit valgte emne: ","audioFiles":[{"name":"audio/step_2.mp3","type":"mpeg"}]},{"step":3,"header":"(step 3) Guidet skriveproces - skriv en debatartikel.","instruction":"(step 3) Udvælg ??? ord fra din brainstorm.","audioFiles":[{"name":"audio/step_3.mp3","type":"mpeg"}]},{"step":4,"header":"(step 4) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav ord til sætninger - et ad gangen","audioFiles":[{"name":"audio/step_4.mp3","type":"mpeg"}]},{"step":"4b","header":"(step 4b) Guidet skriveproces - skriv en debatartikel.","instruction":"Træk dine ??? sætninger i rette rækkefølge.","audioFiles":[{"name":"audio/step_4b.mp3","type":"mpeg"}]},{"step":5,"header":"(step 5) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>indledende</b> sætning","audioFiles":[{"name":"audio/step_5.mp3","type":"mpeg"}]},{"step":6,"header":"(step 6) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>afsluttende</b> sætning","audioFiles":[{"name":"audio/step_6.mp3","type":"mpeg"}]},{"step":"6b","header":"(step 6b) Guidet skriveproces - skriv en debatartikel.","instruction":"Skriv en <b>overskrift</b> til din debatartikel","audioFiles":[{"name":"audio/step_6b.mp3","type":"mpeg"}]},{"step":7,"header":"(step 7) Guidet skriveproces - skriv en debatartikel.","instruction":"Her er dine 5 sætninger som du skal arbejde videre med.","explanation":"Download Word-filen med instruktion til hvordan du kan arbejde videre med din debatartikel.","audioFiles":[{"name":"audio/step_7.mp3","type":"mpeg"}]}],"studentSelectedSubject":[{"subjectName":"aaa","selected":true,"subjectTexts":[]}]};
	// $('#DataInput').html(step_1_template());

	// STEP 2:
	// jsonData = {"subjects":["Rygning","Syrien","Atomkraft","Grafitti","Spis mindre kød","Doping","Prostitution","Lægeordineret heroin","Fri hash"],"numOfChoosenWords":3,"sentenceStarters_word":{"id":"Dropdown1","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - ord - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - ord -  1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - ord -  2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - ord -  3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - ord -  4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - ord -  5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_begin":{"id":"Dropdown2","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - start - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - start - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - start - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - start - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - start - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - start - 5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_end":{"id":"Dropdown3","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - slut - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - slut - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - slut - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - slut - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - slut - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - slut - 5: Lorem ipsum dolor sit amet..."}]},"steps":[{"step":0,"header":"(step 0) Guidet skriveproces - skriv en debatartikel.","img":{"src":"img/start_img_750x350.jpg","alt":"Billede af XXX"},"audioFiles":[{"name":"audio/step_0.mp3","type":"mpeg"}]},{"step":1,"header":"(step 1) Guidet skriveproces - skriv en debatartikel.","instruction":"Vælg et af følgende emner (klik og vælg)","audioFiles":[{"name":"audio/step_1.mp3","type":"mpeg"}]},{"step":2,"header":"(step 2) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav en brainstorm på dit valgte emne: ","audioFiles":[{"name":"audio/step_2.mp3","type":"mpeg"}]},{"step":3,"header":"(step 3) Guidet skriveproces - skriv en debatartikel.","instruction":"(step 3) Udvælg ??? ord fra din brainstorm.","audioFiles":[{"name":"audio/step_3.mp3","type":"mpeg"}]},{"step":4,"header":"(step 4) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav ord til sætninger - et ad gangen","audioFiles":[{"name":"audio/step_4.mp3","type":"mpeg"}]},{"step":"4b","header":"(step 4b) Guidet skriveproces - skriv en debatartikel.","instruction":"Træk dine ??? sætninger i rette rækkefølge.","audioFiles":[{"name":"audio/step_4b.mp3","type":"mpeg"}]},{"step":5,"header":"(step 5) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>indledende</b> sætning","audioFiles":[{"name":"audio/step_5.mp3","type":"mpeg"}]},{"step":6,"header":"(step 6) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>afsluttende</b> sætning","audioFiles":[{"name":"audio/step_6.mp3","type":"mpeg"}]},{"step":"6b","header":"(step 6b) Guidet skriveproces - skriv en debatartikel.","instruction":"Skriv en <b>overskrift</b> til din debatartikel","audioFiles":[{"name":"audio/step_6b.mp3","type":"mpeg"}]},{"step":7,"header":"(step 7) Guidet skriveproces - skriv en debatartikel.","instruction":"Her er dine 5 sætninger som du skal arbejde videre med.","explanation":"Download Word-filen med instruktion til hvordan du kan arbejde videre med din debatartikel.","audioFiles":[{"name":"audio/step_7.mp3","type":"mpeg"}]}],"studentSelectedSubject":[{"subjectName":"aaa","selected":true,"subjectTexts":["bbb","ccc","ddd","eee","fff","ggg","hhh","iii","jjj"]}],"selectedSubjectElementNum":"0"};
	// $('#DataInput').html(step_2_template());

	// STEP 3:
	// jsonData = {"subjects":["Rygning","Syrien","Atomkraft","Grafitti","Spis mindre kød","Doping","Prostitution","Lægeordineret heroin","Fri hash"],"numOfChoosenWords":3,"sentenceStarters_word":{"id":"Dropdown1","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - ord - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - ord -  1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - ord -  2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - ord -  3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - ord -  4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - ord -  5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_begin":{"id":"Dropdown2","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - start - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - start - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - start - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - start - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - start - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - start - 5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_end":{"id":"Dropdown3","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - slut - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - slut - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - slut - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - slut - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - slut - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - slut - 5: Lorem ipsum dolor sit amet..."}]},"steps":[{"step":0,"header":"(step 0) Guidet skriveproces - skriv en debatartikel.","img":{"src":"img/start_img_750x350.jpg","alt":"Billede af XXX"},"audioFiles":[{"name":"audio/step_0.mp3","type":"mpeg"}]},{"step":1,"header":"(step 1) Guidet skriveproces - skriv en debatartikel.","instruction":"Vælg et af følgende emner (klik og vælg)","audioFiles":[{"name":"audio/step_1.mp3","type":"mpeg"}]},{"step":2,"header":"(step 2) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav en brainstorm på dit valgte emne: ","audioFiles":[{"name":"audio/step_2.mp3","type":"mpeg"}]},{"step":3,"header":"(step 3) Guidet skriveproces - skriv en debatartikel.","instruction":"(step 3) Udvælg ??? ord fra din brainstorm.","audioFiles":[{"name":"audio/step_3.mp3","type":"mpeg"}]},{"step":4,"header":"(step 4) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav ord til sætninger - et ad gangen","audioFiles":[{"name":"audio/step_4.mp3","type":"mpeg"}]},{"step":"4b","header":"(step 4b) Guidet skriveproces - skriv en debatartikel.","instruction":"Træk dine ??? sætninger i rette rækkefølge.","audioFiles":[{"name":"audio/step_4b.mp3","type":"mpeg"}]},{"step":5,"header":"(step 5) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>indledende</b> sætning","audioFiles":[{"name":"audio/step_5.mp3","type":"mpeg"}]},{"step":6,"header":"(step 6) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>afsluttende</b> sætning","audioFiles":[{"name":"audio/step_6.mp3","type":"mpeg"}]},{"step":"6b","header":"(step 6b) Guidet skriveproces - skriv en debatartikel.","instruction":"Skriv en <b>overskrift</b> til din debatartikel","audioFiles":[{"name":"audio/step_6b.mp3","type":"mpeg"}]},{"step":7,"header":"(step 7) Guidet skriveproces - skriv en debatartikel.","instruction":"Her er dine 5 sætninger som du skal arbejde videre med.","explanation":"Download Word-filen med instruktion til hvordan du kan arbejde videre med din debatartikel.","audioFiles":[{"name":"audio/step_7.mp3","type":"mpeg"}]}],"studentSelectedSubject":[{"subjectName":"aaa","selected":true,"subjectTexts":["bbb","ccc","ddd","eee","fff","ggg","hhh","iii","jjj"],"subjectTexts_selected":[5,6,7]}],"selectedSubjectElementNum":"0"};
	// $('#DataInput').html(step_3_template());

	// STEP 4:
	// jsonData = {"subjects":["Rygning","Syrien","Atomkraft","Grafitti","Spis mindre kød","Doping","Prostitution","Lægeordineret heroin","Fri hash"],"numOfChoosenWords":3,"sentenceStarters_word":{"id":"Dropdown1","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - ord - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - ord -  1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - ord -  2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - ord -  3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - ord -  4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - ord -  5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_begin":{"id":"Dropdown2","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - start - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - start - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - start - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - start - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - start - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - start - 5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_end":{"id":"Dropdown3","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - slut - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - slut - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - slut - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - slut - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - slut - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - slut - 5: Lorem ipsum dolor sit amet..."}]},"steps":[{"step":0,"header":"(step 0) Guidet skriveproces - skriv en debatartikel.","img":{"src":"img/start_img_750x350.jpg","alt":"Billede af XXX"},"audioFiles":[{"name":"audio/step_0.mp3","type":"mpeg"}]},{"step":1,"header":"(step 1) Guidet skriveproces - skriv en debatartikel.","instruction":"Vælg et af følgende emner (klik og vælg)","audioFiles":[{"name":"audio/step_1.mp3","type":"mpeg"}]},{"step":2,"header":"(step 2) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav en brainstorm på dit valgte emne: ","audioFiles":[{"name":"audio/step_2.mp3","type":"mpeg"}]},{"step":3,"header":"(step 3) Guidet skriveproces - skriv en debatartikel.","instruction":"(step 3) Udvælg ??? ord fra din brainstorm.","audioFiles":[{"name":"audio/step_3.mp3","type":"mpeg"}]},{"step":4,"header":"(step 4) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav ord til sætninger - et ad gangen","audioFiles":[{"name":"audio/step_4.mp3","type":"mpeg"}]},{"step":"4b","header":"(step 4b) Guidet skriveproces - skriv en debatartikel.","instruction":"Træk dine ??? sætninger i rette rækkefølge.","audioFiles":[{"name":"audio/step_4b.mp3","type":"mpeg"}]},{"step":5,"header":"(step 5) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>indledende</b> sætning","audioFiles":[{"name":"audio/step_5.mp3","type":"mpeg"}]},{"step":6,"header":"(step 6) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>afsluttende</b> sætning","audioFiles":[{"name":"audio/step_6.mp3","type":"mpeg"}]},{"step":"6b","header":"(step 6b) Guidet skriveproces - skriv en debatartikel.","instruction":"Skriv en <b>overskrift</b> til din debatartikel","audioFiles":[{"name":"audio/step_6b.mp3","type":"mpeg"}]},{"step":7,"header":"(step 7) Guidet skriveproces - skriv en debatartikel.","instruction":"Her er dine 5 sætninger som du skal arbejde videre med.","explanation":"Download Word-filen med instruktion til hvordan du kan arbejde videre med din debatartikel.","audioFiles":[{"name":"audio/step_7.mp3","type":"mpeg"}]}],"studentSelectedSubject":[{"subjectName":"aaa","selected":true,"subjectTexts":["bbb","ccc","ddd","eee","fff","ggg","hhh","iii","jjj"],"subjectTexts_selected":[5,6,7],"subjectTexts_sentences":["aaa","bbb","ccc"]}],"selectedSubjectElementNum":"0"};
	// $('#DataInput').html(step_4_template());

	// STEP 4b:
	// jsonData = {"subjects":["Rygning","Syrien","Atomkraft","Grafitti","Spis mindre kød","Doping","Prostitution","Lægeordineret heroin","Fri hash"],"numOfChoosenWords":3,"sentenceStarters_word":{"id":"Dropdown1","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - ord - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - ord -  1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - ord -  2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - ord -  3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - ord -  4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - ord -  5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_begin":{"id":"Dropdown2","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - start - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - start - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - start - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - start - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - start - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - start - 5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_end":{"id":"Dropdown3","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - slut - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - slut - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - slut - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - slut - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - slut - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - slut - 5: Lorem ipsum dolor sit amet..."}]},"steps":[{"step":0,"header":"(step 0) Guidet skriveproces - skriv en debatartikel.","img":{"src":"img/start_img_750x350.jpg","alt":"Billede af XXX"},"audioFiles":[{"name":"audio/step_0.mp3","type":"mpeg"}]},{"step":1,"header":"(step 1) Guidet skriveproces - skriv en debatartikel.","instruction":"Vælg et af følgende emner (klik og vælg)","audioFiles":[{"name":"audio/step_1.mp3","type":"mpeg"}]},{"step":2,"header":"(step 2) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav en brainstorm på dit valgte emne: ","audioFiles":[{"name":"audio/step_2.mp3","type":"mpeg"}]},{"step":3,"header":"(step 3) Guidet skriveproces - skriv en debatartikel.","instruction":"(step 3) Udvælg ??? ord fra din brainstorm.","audioFiles":[{"name":"audio/step_3.mp3","type":"mpeg"}]},{"step":4,"header":"(step 4) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav ord til sætninger - et ad gangen","audioFiles":[{"name":"audio/step_4.mp3","type":"mpeg"}]},{"step":"4b","header":"(step 4b) Guidet skriveproces - skriv en debatartikel.","instruction":"Træk dine ??? sætninger i rette rækkefølge.","audioFiles":[{"name":"audio/step_4b.mp3","type":"mpeg"}]},{"step":5,"header":"(step 5) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>indledende</b> sætning","audioFiles":[{"name":"audio/step_5.mp3","type":"mpeg"}]},{"step":6,"header":"(step 6) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>afsluttende</b> sætning","audioFiles":[{"name":"audio/step_6.mp3","type":"mpeg"}]},{"step":"6b","header":"(step 6b) Guidet skriveproces - skriv en debatartikel.","instruction":"Skriv en <b>overskrift</b> til din debatartikel","audioFiles":[{"name":"audio/step_6b.mp3","type":"mpeg"}]},{"step":7,"header":"(step 7) Guidet skriveproces - skriv en debatartikel.","instruction":"Her er dine 5 sætninger som du skal arbejde videre med.","explanation":"Download Word-filen med instruktion til hvordan du kan arbejde videre med din debatartikel.","audioFiles":[{"name":"audio/step_7.mp3","type":"mpeg"}]}],"studentSelectedSubject":[{"subjectName":"aaa","selected":true,"subjectTexts":["bbb","ccc","ddd","eee","fff","ggg","hhh","iii","jjj"],"subjectTexts_selected":[5,6,7],"subjectTexts_sentences":["aaa","bbb","ccc"],"subjectTexts_sentences_2":["aaa","ccc","bbb"]}],"selectedSubjectElementNum":"0"};
	// $('#DataInput').html(step_4b_template());
	// makeSortable(); // VIGTIG: DENNE SKAL VÆRE AKTIV VED TEST (ellers er DOM-elementer ikke tilstæde!)

	// STEP 5:
	// jsonData = {"subjects":["Rygning","Syrien","Atomkraft","Grafitti","Spis mindre kød","Doping","Prostitution","Lægeordineret heroin","Fri hash"],"numOfChoosenWords":3,"sentenceStarters_word":{"id":"Dropdown1","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - ord - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - ord -  1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - ord -  2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - ord -  3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - ord -  4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - ord -  5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_begin":{"id":"Dropdown2","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - start - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - start - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - start - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - start - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - start - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - start - 5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_end":{"id":"Dropdown3","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - slut - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - slut - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - slut - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - slut - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - slut - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - slut - 5: Lorem ipsum dolor sit amet..."}]},"steps":[{"step":0,"header":"(step 0) Guidet skriveproces - skriv en debatartikel.","img":{"src":"img/start_img_750x350.jpg","alt":"Billede af XXX"},"audioFiles":[{"name":"audio/step_0.mp3","type":"mpeg"}]},{"step":1,"header":"(step 1) Guidet skriveproces - skriv en debatartikel.","instruction":"Vælg et af følgende emner (klik og vælg)","audioFiles":[{"name":"audio/step_1.mp3","type":"mpeg"}]},{"step":2,"header":"(step 2) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav en brainstorm på dit valgte emne: ","audioFiles":[{"name":"audio/step_2.mp3","type":"mpeg"}]},{"step":3,"header":"(step 3) Guidet skriveproces - skriv en debatartikel.","instruction":"(step 3) Udvælg ??? ord fra din brainstorm.","audioFiles":[{"name":"audio/step_3.mp3","type":"mpeg"}]},{"step":4,"header":"(step 4) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav ord til sætninger - et ad gangen","audioFiles":[{"name":"audio/step_4.mp3","type":"mpeg"}]},{"step":"4b","header":"(step 4b) Guidet skriveproces - skriv en debatartikel.","instruction":"Træk dine ??? sætninger i rette rækkefølge.","audioFiles":[{"name":"audio/step_4b.mp3","type":"mpeg"}]},{"step":5,"header":"(step 5) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>indledende</b> sætning","audioFiles":[{"name":"audio/step_5.mp3","type":"mpeg"}]},{"step":6,"header":"(step 6) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>afsluttende</b> sætning","audioFiles":[{"name":"audio/step_6.mp3","type":"mpeg"}]},{"step":"6b","header":"(step 6b) Guidet skriveproces - skriv en debatartikel.","instruction":"Skriv en <b>overskrift</b> til din debatartikel","audioFiles":[{"name":"audio/step_6b.mp3","type":"mpeg"}]},{"step":7,"header":"(step 7) Guidet skriveproces - skriv en debatartikel.","instruction":"Her er dine 5 sætninger som du skal arbejde videre med.","explanation":"Download Word-filen med instruktion til hvordan du kan arbejde videre med din debatartikel.","audioFiles":[{"name":"audio/step_7.mp3","type":"mpeg"}]}],"studentSelectedSubject":[{"subjectName":"aaa","selected":true,"subjectTexts":["bbb","ccc","ddd","eee","fff","ggg","hhh","iii","jjj"],"subjectTexts_selected":[5,6,7],"subjectTexts_sentences":["aaa","bbb","ccc"],"subjectTexts_sentences_2":["aaa","ccc","bbb"]}],"selectedSubjectElementNum":"0"};
	// $('#DataInput').html(step_5_template());

	// STEP 6:
	// jsonData = {"subjects":["Rygning","Syrien","Atomkraft","Grafitti","Spis mindre kød","Doping","Prostitution","Lægeordineret heroin","Fri hash"],"numOfChoosenWords":3,"sentenceStarters_word":{"id":"Dropdown1","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - ord - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - ord -  1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - ord -  2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - ord -  3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - ord -  4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - ord -  5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_begin":{"id":"Dropdown2","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - start - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - start - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - start - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - start - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - start - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - start - 5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_end":{"id":"Dropdown3","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - slut - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - slut - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - slut - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - slut - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - slut - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - slut - 5: Lorem ipsum dolor sit amet..."}]},"steps":[{"step":0,"header":"(step 0) Guidet skriveproces - skriv en debatartikel.","img":{"src":"img/start_img_750x350.jpg","alt":"Billede af XXX"},"audioFiles":[{"name":"audio/step_0.mp3","type":"mpeg"}]},{"step":1,"header":"(step 1) Guidet skriveproces - skriv en debatartikel.","instruction":"Vælg et af følgende emner (klik og vælg)","audioFiles":[{"name":"audio/step_1.mp3","type":"mpeg"}]},{"step":2,"header":"(step 2) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav en brainstorm på dit valgte emne: ","audioFiles":[{"name":"audio/step_2.mp3","type":"mpeg"}]},{"step":3,"header":"(step 3) Guidet skriveproces - skriv en debatartikel.","instruction":"(step 3) Udvælg ??? ord fra din brainstorm.","audioFiles":[{"name":"audio/step_3.mp3","type":"mpeg"}]},{"step":4,"header":"(step 4) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav ord til sætninger - et ad gangen","audioFiles":[{"name":"audio/step_4.mp3","type":"mpeg"}]},{"step":"4b","header":"(step 4b) Guidet skriveproces - skriv en debatartikel.","instruction":"Træk dine ??? sætninger i rette rækkefølge.","audioFiles":[{"name":"audio/step_4b.mp3","type":"mpeg"}]},{"step":5,"header":"(step 5) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>indledende</b> sætning","audioFiles":[{"name":"audio/step_5.mp3","type":"mpeg"}]},{"step":6,"header":"(step 6) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>afsluttende</b> sætning","audioFiles":[{"name":"audio/step_6.mp3","type":"mpeg"}]},{"step":"6b","header":"(step 6b) Guidet skriveproces - skriv en debatartikel.","instruction":"Skriv en <b>overskrift</b> til din debatartikel","audioFiles":[{"name":"audio/step_6b.mp3","type":"mpeg"}]},{"step":7,"header":"(step 7) Guidet skriveproces - skriv en debatartikel.","instruction":"Her er dine 5 sætninger som du skal arbejde videre med.","explanation":"Download Word-filen med instruktion til hvordan du kan arbejde videre med din debatartikel.","audioFiles":[{"name":"audio/step_7.mp3","type":"mpeg"}]}],"studentSelectedSubject":[{"subjectName":"aaa","selected":true,"subjectTexts":["bbb","ccc","ddd","eee","fff","ggg","hhh","iii","jjj"],"subjectTexts_selected":[5,6,7],"subjectTexts_sentences":["aaa","bbb","ccc"],"subjectTexts_sentences_2":["aaa","ccc","bbb"],"sentenceStarters_begin_text":"indledende sætning"}],"selectedSubjectElementNum":"0"};
	// $('#DataInput').html(step_6_template());

	// STEP 6b:
	// jsonData = {"subjects":["Rygning","Syrien","Atomkraft","Grafitti","Spis mindre kød","Doping","Prostitution","Lægeordineret heroin","Fri hash"],"numOfChoosenWords":3,"sentenceStarters_word":{"id":"Dropdown1","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - ord - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - ord -  1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - ord -  2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - ord -  3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - ord -  4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - ord -  5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_begin":{"id":"Dropdown2","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - start - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - start - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - start - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - start - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - start - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - start - 5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_end":{"id":"Dropdown3","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - slut - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - slut - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - slut - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - slut - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - slut - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - slut - 5: Lorem ipsum dolor sit amet..."}]},"steps":[{"step":0,"header":"(step 0) Guidet skriveproces - skriv en debatartikel.","img":{"src":"img/start_img_750x350.jpg","alt":"Billede af XXX"},"audioFiles":[{"name":"audio/step_0.mp3","type":"mpeg"}]},{"step":1,"header":"(step 1) Guidet skriveproces - skriv en debatartikel.","instruction":"Vælg et af følgende emner (klik og vælg)","audioFiles":[{"name":"audio/step_1.mp3","type":"mpeg"}]},{"step":2,"header":"(step 2) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav en brainstorm på dit valgte emne: ","audioFiles":[{"name":"audio/step_2.mp3","type":"mpeg"}]},{"step":3,"header":"(step 3) Guidet skriveproces - skriv en debatartikel.","instruction":"(step 3) Udvælg ??? ord fra din brainstorm.","audioFiles":[{"name":"audio/step_3.mp3","type":"mpeg"}]},{"step":4,"header":"(step 4) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav ord til sætninger - et ad gangen","audioFiles":[{"name":"audio/step_4.mp3","type":"mpeg"}]},{"step":"4b","header":"(step 4b) Guidet skriveproces - skriv en debatartikel.","instruction":"Træk dine ??? sætninger i rette rækkefølge.","audioFiles":[{"name":"audio/step_4b.mp3","type":"mpeg"}]},{"step":5,"header":"(step 5) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>indledende</b> sætning","audioFiles":[{"name":"audio/step_5.mp3","type":"mpeg"}]},{"step":6,"header":"(step 6) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>afsluttende</b> sætning","audioFiles":[{"name":"audio/step_6.mp3","type":"mpeg"}]},{"step":"6b","header":"(step 6b) Guidet skriveproces - skriv en debatartikel.","instruction":"Skriv en <b>overskrift</b> til din debatartikel","audioFiles":[{"name":"audio/step_6b.mp3","type":"mpeg"}]},{"step":7,"header":"(step 7) Guidet skriveproces - skriv en debatartikel.","instruction":"Her er dine 5 sætninger som du skal arbejde videre med.","explanation":"Download Word-filen med instruktion til hvordan du kan arbejde videre med din debatartikel.","audioFiles":[{"name":"audio/step_7.mp3","type":"mpeg"}]}],"studentSelectedSubject":[{"subjectName":"aaa","selected":true,"subjectTexts":["bbb","ccc","ddd","eee","fff","ggg","hhh","iii","jjj"],"subjectTexts_selected":[5,6,7],"subjectTexts_sentences":["aaa","bbb","ccc"],"subjectTexts_sentences_2":["aaa","ccc","bbb"],"sentenceStarters_begin_text":"indledende sætning","sentenceStarters_end_text":"afsluttende sætning"}],"selectedSubjectElementNum":"0"};
	// $('#DataInput').html(step_6b_template());

	// STEP 7:
	// jsonData = {"subjects":["Rygning","Syrien","Atomkraft","Grafitti","Spis mindre kød","Doping","Prostitution","Lægeordineret heroin","Fri hash"],"numOfChoosenWords":3,"sentenceStarters_word":{"id":"Dropdown1","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - ord - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - ord -  1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - ord -  2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - ord -  3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - ord -  4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - ord -  5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_begin":{"id":"Dropdown2","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - start - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - start - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - start - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - start - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - start - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - start - 5: Lorem ipsum dolor sit amet..."}]},"sentenceStarters_end":{"id":"Dropdown3","class":"Dropdown","options":[{"id":"id0","class":"class0","value":"Sætningsstarter - slut - 0: Lorem ipsum dolor sit amet..."},{"id":"id1","class":"class1","value":"Sætningsstarter - slut - 1: Lorem ipsum dolor sit amet..."},{"id":"id2","class":"class2","value":"Sætningsstarter - slut - 2: Lorem ipsum dolor sit amet..."},{"id":"id3","class":"class3","value":"Sætningsstarter - slut - 3: Lorem ipsum dolor sit amet..."},{"id":"id4","class":"class4","value":"Sætningsstarter - slut - 4: Lorem ipsum dolor sit amet..."},{"id":"id5","class":"class5","value":"Sætningsstarter - slut - 5: Lorem ipsum dolor sit amet..."}]},"steps":[{"step":0,"header":"(step 0) Guidet skriveproces - skriv en debatartikel.","img":{"src":"img/start_img_750x350.jpg","alt":"Billede af XXX"},"audioFiles":[{"name":"audio/step_0.mp3","type":"mpeg"}]},{"step":1,"header":"(step 1) Guidet skriveproces - skriv en debatartikel.","instruction":"Vælg et af følgende emner (klik og vælg)","audioFiles":[{"name":"audio/step_1.mp3","type":"mpeg"}]},{"step":2,"header":"(step 2) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav en brainstorm på dit valgte emne: ","audioFiles":[{"name":"audio/step_2.mp3","type":"mpeg"}]},{"step":3,"header":"(step 3) Guidet skriveproces - skriv en debatartikel.","instruction":"(step 3) Udvælg ??? ord fra din brainstorm.","audioFiles":[{"name":"audio/step_3.mp3","type":"mpeg"}]},{"step":4,"header":"(step 4) Guidet skriveproces - skriv en debatartikel.","instruction":"Lav ord til sætninger - et ad gangen","audioFiles":[{"name":"audio/step_4.mp3","type":"mpeg"}]},{"step":"4b","header":"(step 4b) Guidet skriveproces - skriv en debatartikel.","instruction":"Træk dine ??? sætninger i rette rækkefølge.","audioFiles":[{"name":"audio/step_4b.mp3","type":"mpeg"}]},{"step":5,"header":"(step 5) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>indledende</b> sætning","audioFiles":[{"name":"audio/step_5.mp3","type":"mpeg"}]},{"step":6,"header":"(step 6) Guidet skriveproces - skriv en debatartikel.","instruction":"Nu skal du skrive en <b>afsluttende</b> sætning","audioFiles":[{"name":"audio/step_6.mp3","type":"mpeg"}]},{"step":"6b","header":"(step 6b) Guidet skriveproces - skriv en debatartikel.","instruction":"Skriv en <b>overskrift</b> til din debatartikel","audioFiles":[{"name":"audio/step_6b.mp3","type":"mpeg"}]},{"step":7,"header":"(step 7) Guidet skriveproces - skriv en debatartikel.","instruction":"Her er dine 5 sætninger som du skal arbejde videre med.","explanation":"Download Word-filen med instruktion til hvordan du kan arbejde videre med din debatartikel.","audioFiles":[{"name":"audio/step_7.mp3","type":"mpeg"}]}],"studentSelectedSubject":[{"subjectName":"aaa","selected":true,"subjectTexts":["bbb","ccc","ddd","eee","fff","ggg","hhh","iii","jjj"],"subjectTexts_selected":[5,6,7],"subjectTexts_sentences":["aaa","bbb","ccc"],"subjectTexts_sentences_2":["aaa","ccc","bbb"],"sentenceStarters_begin_text":"indledende sætning","sentenceStarters_end_text":"afsluttende sætning","studentSubjectTitel":["overskrift"]}],"selectedSubjectElementNum":"0"};
	// $('#DataInput').html(step_7_template());


	//#####################  DESIGN  #####################


	// $('#DataInput').html(step_6_template());

	// $('#DataInput').html(step_6b_template());

	// $('#DataInput').html(step_7_template());
	
});



