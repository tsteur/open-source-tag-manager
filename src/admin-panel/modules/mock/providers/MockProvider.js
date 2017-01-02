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
 * Storage with all mocks
 */
class MockProvider {
	/* eslint-disable */
    /**
	 * Constructor for storage
	 *
	 * example collection
	 * @return {[type]} [description]
	 */
	constructor () {

		this.collection = {};
		this.collectionCopy = {};

	}

    /**
	 * Initialize table
	 * @param {String} tableName
	 * @param {Array} elements
	 */
	init (tableName, elements) {

		if (elements === undefined) {

			this.collection[tableName] = [];

		} else {

			this.collection[tableName] = elements;

		}

	}

	/**
	 * Copy collection
	 */
	copy () {

		angular.copy(this.collection, this.collectionCopy);

	}

	/**
	 * Restore collection
	 */
	restore () {

		angular.copy(this.collectionCopy, this.collection);

	}

	$get () {

        return this;

    }
	/* eslint-enable */
}

export default MockProvider;
