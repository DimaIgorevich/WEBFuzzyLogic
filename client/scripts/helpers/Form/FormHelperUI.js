let START_INDEX_DATA = 0;

var terms;
terms = new Array(0);

var currentTerm = START_INDEX_DATA;
var currentVariable = null;

function fetchRulesDataFormToRuleDataBase(ruleDB) {
    for (var row = 0; row < ruleDB.getListRule().length; row++) {
        var select = document.getElementById('select-' + row);
        ruleDB.setValueCharacteristicModelAtIndex(select.selectedIndex, row);
    }
}

function formWillAppearWithNodeData(data) {
    var variable = data.variable;
    FormDataHelper.setVariableData(variable);

    terms = variable.getListTerm();
    currentTerm = START_INDEX_DATA;
    currentVariable = variable;

    loadDataTermByIndex(currentTerm);
    changeCountTerms();
    repaintChart();
}

function addTerm(term) {
    terms.push(term);
    repaintChart();
}

function addVariable(variable) {
    variable.sortListTermContent();
    hidePopup();
    addNodeToWorkspaceDiagramWithVariable(variable);
}

function editVariable(variable) {
    var node = workspaceDiagram.findNodeForKey(variable.getTitle());
    let editableVariable = createVariable();

    if (!editableVariable.isLinksEmpty()) {
        let links = parseLinksAtVariable(editableVariable);
        createLinkWithNode(links, node, variable);
    }

    workspaceDiagram.model.setDataProperty(node.data, "key", editableVariable.getTitle());
    workspaceDiagram.model.setDataProperty(node.data, "variable", editableVariable);
}

function loadDataTermByIndex(index) {
    let term = terms[index];
    if (term) {
        FormDataHelper.setTermData(term);
    }
}

// PRAGMA: FORM DATA

function resetFormData() {
    FormDataHelper.resetForm();
    hideTriangleDataForm();

    terms.length = START_INDEX_DATA;
    currentTerm = START_INDEX_DATA;
    series.length = START_INDEX_DATA;
    currentVariable = null;

    chart.update;
}

// PRAGMA: INIT

function createTerm() {
    var data = FormDataHelper.getTermData();

    let object = new Term(
        new TriangleNumber(
            data.TRIANGLE_LEFT_SIDE,
            data.TRIANGLE_MIDDLE,
            data.TRIANGLE_RIGHT_SIDE
        ),
        data.NAME,
        data.SHORT_NAME
    );
    return object;
}

function createVariable() {
    var data = FormDataHelper.getVariableData();

    let object = new Variable (
        data.TITLE,
        data.TYPE,
        data.TERM_COUNT,
        terms,
        data.SIGNAL_VALUE,
        data.INPUT_LINKS
    );
    return object;
}

// PRAGMA: TRIANGLE DATA FORM

function showTriangleDataForm() {
    $(".term-data").height("100%");
    $(".term-data").css('visibility', 'visible');
}

function hideTriangleDataForm() {
    $(".term-data").height(0);
    $(".term-data").css('visibility','hidden');
}