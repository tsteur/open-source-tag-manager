/**
 * Copyright (C) 2015 Digimedia Sp. z.o.o. d/b/a Clearcode
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option) any
 * later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Finding type by type id
 * @param  {Array} array
 * @param  {Number} type
 * @return {Object}
 */
var findTypeByType = (array, type) => {
    let tempType = type;

    return array.filter(element => element.type === tempType);
};

let currentContainer;
let conditionResource;

class Condition {
    constructor ($conditionResource, $currentContainer) {
        currentContainer = $currentContainer;
        conditionResource = $conditionResource;

        if (currentContainer.getId() !== undefined) {
            this.conditionResourcePromise = conditionResource.query(currentContainer.getId());
        }
    }

    getArrayOfTypes () {
        return this.conditionResourcePromise.then(
            resp => {
                let typesTemp = [],
                    typesIndex = resp.length;

                while (typesIndex--) {
                    typesTemp[resp[typesIndex].type] = resp[typesIndex].name;
                }

                return typesTemp;
            }
        );
    }

    allVariables () {
        return this.conditionResourcePromise.then(
            resp => {
                let variables = [];
                for (let index = 0; index < resp.length; index++) {
                    variables = variables.length
                        ? mergeVariables(variables, resp[index].variables)
                        : resp[index].variables;
                }
                
                return variables;
            }
        );
    }

    getVariables (type) {
        return this.conditionResourcePromise.then(
            resp => {
                let responsedTypes = findTypeByType(resp, type);

                if (responsedTypes.length === 1) {
                    return responsedTypes[0].variables;
                } else {
                    return false;
                }
            }
        );
    }

    getRequired (type) {
        return this.conditionResourcePromise.then(
            resp => {
                let responsedTypes = findTypeByType(resp, type);

                if (responsedTypes.length === 1) {
                    return responsedTypes[0].variables.filter(variable => {
                        return variable.name === 'Event' && responsedTypes[0].name === 'Event'
                    });
                } else {
                    return false;
                }
            }
        );
    }

    getActions (type) {
        return this.conditionResourcePromise.then(
            resp => {
                let responsedTypes = findTypeByType(resp, type);

                if (responsedTypes.length === 1) {
                    return responsedTypes[0].actions;
                } else {
                    return false;
                }
            }
        );
    }

    refresh () {
        this.conditionResourcePromise = conditionResource.query(currentContainer.getId());
    }
}

function mergeVariables (arrayFirst, arraySecond) {
    let final = [];
    for (let indexFirst in arrayFirst) {
        let shared = false;
        for (let indexSecond in arraySecond) {
            if (isVariablesNameEqual(arraySecond[indexSecond], arrayFirst[indexFirst])) {
                shared = true;
                break;
            }
        }
        if (!shared) {
            final.push(arrayFirst[indexFirst])
        }
    }

    return final.concat(arraySecond);
}

function isVariablesNameEqual (variableFirst, variableSecond) {
    return variableFirst.name === variableSecond.name;
}

export default Condition;
