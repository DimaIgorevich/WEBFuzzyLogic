let TITLE_VARIABLE 					= "titleVar";
let TYPE_VARIABLE 					= "typeVar";
let COUNT_TERM 						= "countTerm";
let SIGNAL_VARIABLE 				= "signalValue";
let INPUT_VARIABLE_LINKS 			= "inputVarLinks";
let TRIANGLE_NUMERIC_LEFT_SIDE 		= "a0";
let TRIANGLE_NUMERIC_MIDDLE 		= "a1";
let TRIANGLE_NUMERIC_RIGHT_SIDE 	= "a2";
let TERM_NAME 						= "name";
let TERM_SHORT_NAME 				= "shortName";

var FormDataHelper = (function () {

	function getFormDataTitleVariable() {
		return document.getElementById(TITLE_VARIABLE).valueOf().value;
	}

	function getFormDataTypeVariable() {
		return document.getElementById(TYPE_VARIABLE).valueOf().value;
	} 

	function getFormDataCountTerm() {
		return document.getElementById(COUNT_TERM).valueOf().value;
	}

	function getFormDataSignalVariable() {
		return document.getElementById(SIGNAL_VARIABLE).valueOf().value;
	}

	function getFormDataInputVariableLinks() {
		return document.getElementById(INPUT_VARIABLE_LINKS).valueOf().value
	}

	function getFormDataTriangleNumericLeftSide() {
		return document.getElementById(TRIANGLE_NUMERIC_LEFT_SIDE).valueOf().value;
	}

	function getFormDataTriangleNumericMiddle() {
		return document.getElementById(TRIANGLE_NUMERIC_MIDDLE).valueOf().value;
	}

	function getFormDataTriangleNumericRightSide() {
		return document.getElementById(TRIANGLE_NUMERIC_RIGHT_SIDE).valueOf().value;
	}

	function getFormDataTermName() {
		return document.getElementById(TERM_NAME).valueOf().value;
	}

	function getFormDataTermShortName() {
		return document.getElementById(TERM_SHORT_NAME).valueOf().value;
	}

	return {
		isEmptyFormMainFields: function () {
			if (getFormDataTitleVariable() != "" && getFormDataCountTerm() > 0){
        		return false;
    		}
    		return true;
		},

		isReadyAllTerms: function (terms) {
			if (terms.length == getFormDataCountTerm()) {
				return true;
			}
			return false;
		},

		getTermData: function () {
			var object = {
				NAME: 					getFormDataTermName(),
				SHORT_NAME: 			getFormDataTermShortName(),
				TRIANGLE_LEFT_SIDE: 	getFormDataTriangleNumericLeftSide(),
				TRIANGLE_MIDDLE: 		getFormDataTriangleNumericMiddle(),
				TRIANGLE_RIGHT_SIDE: 	getFormDataTriangleNumericRightSide()
			};
			return object;
		},

		getVariableData: function () {
			var signal = getFormDataSignalVariable();
			if (getFormDataTypeVariable() == VariableType.INTERMEDIATE) {
				signal = null;
			}

			var object = {
				TITLE: 			getFormDataTitleVariable(),
				TYPE: 			getFormDataTypeVariable(),
				TERM_COUNT: 	getFormDataCountTerm(),
				SIGNAL_VALUE: 	signal,
				INPUT_LINKS: 	getFormDataInputVariableLinks()
			};
			return object;
		},

		resetTermData: function () {
			document.getElementById(TERM_NAME).valueOf().value 						= "";
			document.getElementById(TERM_SHORT_NAME).valueOf().value 				= "";
			document.getElementById(TRIANGLE_NUMERIC_LEFT_SIDE).valueOf().value 	= "";
			document.getElementById(TRIANGLE_NUMERIC_MIDDLE).valueOf().value 		= "";
			document.getElementById(TRIANGLE_NUMERIC_RIGHT_SIDE).valueOf().value 	= "";
		},

		resetVariableData: function () {
			document.getElementById(TYPE_VARIABLE).valueOf().value 			= VariableType.INPUT;
    		document.getElementById(TITLE_VARIABLE).valueOf().value 		= "";
    		document.getElementById(COUNT_TERM).valueOf().value 			= "0";
    		document.getElementById(SIGNAL_VARIABLE).valueOf().value 		= 0;
    		document.getElementById(SIGNAL_VARIABLE).disabled 				= false;
    		document.getElementById(INPUT_VARIABLE_LINKS).valueOf().value 	= "";
		}, 

		resetForm: function () {
			FormDataHelper.resetTermData();
			FormDataHelper.resetVariableData();
		},

		setVariableData: function (data) {
			document.getElementById(TITLE_VARIABLE).valueOf().value 	= data.getTitle();
    		document.getElementById(TYPE_VARIABLE).value 				= data.getType();
    		document.getElementById(COUNT_TERM).valueOf().value 		= data.getCountTerm();
    		document.getElementById(SIGNAL_VARIABLE).valueOf().value 	= data.getSignalValue();
    		document.getElementById(INPUT_VARIABLE_LINKS).valueOf().value 	= data.getLinks();
		},

		setTermData: function (data) {
			let triangleNumber = data.getTriangleNumber();
        	document.getElementById(TRIANGLE_NUMERIC_LEFT_SIDE).valueOf().value 	= triangleNumber.getLeftRange();
        	document.getElementById(TRIANGLE_NUMERIC_MIDDLE).valueOf().value 		= triangleNumber.getMiddleRange();
        	document.getElementById(TRIANGLE_NUMERIC_RIGHT_SIDE).valueOf().value 	= triangleNumber.getRightRange();
        	document.getElementById(TERM_NAME).valueOf().value 						= data.getName();
        	document.getElementById(TERM_SHORT_NAME).valueOf().value 				= data.getShortName();
		}
	};
})();