function getSeriesByTerm(term, size) {
    let series = new Array(size);

    series[term[0]] = 0;
    if(term[0] == term[1]){
        series[term[0]] = 1;
    } else {
        series[term[1]] = 1;
    }

    series[term[2]] = 0;
    if(term[2] == term[1]){
        series[term[1]] = 1;
    } else {
        series[term[2]] = 0;
    }

    for(let i = 0; i <= size; i++){
        if(i < term[0] || i > term[2]) {
            series[i] = 0;
        }
    }

    return series;
}

function funzzificationByArrayGroup(arrayGroup) {
    let resultSet = new Array(0);
    for (var index = 0; index < arrayGroup.length; index++) {
        let listRules = arrayGroup[index];
        let set = new Array(0);
        for (var ruleItem = 0; ruleItem < listRules.length; ruleItem++) {
            set.push(listRules[ruleItem].getPowerOfMembershipBySignal(variables[ruleItem].getSignalValue()));
        }
        set.sort( function (a, b) {
            return a-b;
        });
        resultSet.push(set[0]);
    }
    resultSet.sort( function (a, b) {
        return b-a;
    });
    return resultSet[0];
}

function fuzzificationVector() {
    let vector = new Array(knowledgeMatrix.getListKnowledgeMatrix().length);
    for (var index = 0; index < vector.length; index++) {
        vector[index] = funzzificationByArrayGroup(knowledgeMatrix.getListKnowledgeMatrix()[index]);
    }
    return vector;
}

