'use strict'

// << Recursion >>
// Recursion Traversal
// 1. Recursion structure
// 2. Recursion depth
// 3. Recursion base

// Goal's:
// 1. Deep Clone; 2. Search by conditions; 3. Iteration

// get data
const url_placeholder = `https://jsonplaceholder.typicode.com/users`;
fetch(url_placeholder)
	.then(response => response.json())
	.then(json =>{

		// [{},{},{},...]
		// console.log(json)

		// Recursion
		// Deep Clone << Recursion >>
		// console.log(deepClone(json))
		// console.log(json === deepClone(json))
		// console.log(json[0].address === deepClone(json)[0].address)

		// Search by condition's
		// console.log(searchByCondition(json, (key, value)=>{
		// 	if(value === 'Kulas Light') return true
		// }))

		// iteration << Recursion >>
		// iteration(json)

		// Simple Clone << For In >>
		// console.log(scForIn(json))
		// console.log(json === scForIn(json))

		// Simple Clone << For Of >>
		// console.log(scForOf(json));
		// console.log(json == scForOf(json))

		//Simple Clone << For / While >>
		// console.log(scFor(json))
		// console.log(json === scFor(json))

		// Simole Clone << Universal >>
		// console.log(scUniversal(json))
		// console.log(json === scUniversal(json))
		// console.log(json[0] === scUniversal(json)[0])

		
	})

const response = "{\"23 May 2021, Sunday,\": {\"каб. 100\": [{\"time\": \"11 - 17\", \"group\": \"2\"}], \"каб. 200\": [{\"time\": \"12 - 15\", \"group\": \"2\"}], \"каб.300\": [{\"time\": \"10 - 13\", \"group\": \"4\"}]}, \"24 May 2021, Monday,\": {\"каб. 100\": [{\"time\": \"11 - 17\", \"group\": \"2\"}], \"каб. 200\": [{\"time\": \"12 - 15\", \"group\": \"2\"}], \"каб.300\": [{\"time\": \"10 - 13\", \"group\": \"4\"}]}}"
const json = JSON.parse(response);
	// {key:{key:[]}...}

const clone = deepClone(json)
		// console.log(clone)
		// console.log(clone === json)
		// console.log(clone['23 May 2021, Sunday,'] == json['23 May 2021, Sunday,'])

const rooms = searchByCondition(clone, (key, value)=>{
	if(key.includes('каб')) return true;
})
		// console.log(rooms)






// 1. Deep Clone << Recursion >>
function deepClone(data, clone){
	(isArray(data)) ? clone = [] :
	(isObject(data)) ? clone = {} :
							clone = data

	if(isArray(data)){
		data.forEach(item =>{
			(isObject(item)) ? clone.push(deepClone(item)) : clone.push(item)
		})
	}else if(isObject(data)){
		for(let key in data) 
			(isObject(data[key])) ? clone[key] = deepClone(data[key]) : clone[key] = data[key]
	}



	return clone
}

// 2. Search by condition's << Recursion traversal >>
//? return key of value && return value/prop or parent 
//*** return triplet [key:-//-, value:-//-, parent:-//-]
function searchByCondition(data, condition = (key, value)=> value, collection = []){

	if(isArray(data)){
		data.forEach((item, index) =>{
			if(condition(index, item)){
				collection.push({key:index, value:item, parent:data})
			}else if(isObject(item)){
				searchByCondition(item, condition, collection)
			}
		})
	}

	else if(isObject(data)){
		for(let key in data){
			if(condition(key, data[key])){
				collection.push({key:key, value:data[key], parent:data})
			}else if(isObject(data[key])){
				searchByCondition(data[key], condition, collection)
			}
		}
	}

	return collection

}

// 3. Iterations << Recursion >>
function iteration(data){

	if(isArray(data)){
		data.forEach((item, index)=>{
			if(isObject(item)){
				console.log(`key: ${index}   value: Object`)
				iteration(item)
			}else{
				console.log(`key: ${index}   value: ${item}`)
			}
		})
	}

	else if(isObject(data)){
		for(let key in data)
			if(isObject(data[key])){
				console.log(`key: ${key}   value: Object`)
				iteration(data[key])
			}else{
				console.log(`key: ${key}   value: ${data[key]}`)
			}
	}

	else{
		console.log(data)
	}
}



// Simple Clone << For In >>
// 1. Standart object's, changes : none
// 2. __proto__, changes : none

function scForIn(data, clone){
	(isArray(data)) ? clone = []:
	(isObject(data)) ? clone = {}:
							clone = data

	
	if(isArray(data)){
		data.forEach(item => clone.push(item))
	}else if(isObject(data)){
		for(let key in data) 
			clone[key] = data[key]
	}


	return clone;
}

// Simple Clone << For Of >>
// Create iterable object's

const symb = function(){
	return{
		keys:Object.keys(this),
		index:0,
		next(){
			if(this.index < this.keys.length) return {done:false, value:this.keys[this.index++]}
			return {done:true}
		}
	}
}

function scForOf(data, clone){
	(isArray(data)) ? clone = []:
	(isObject(data)) ? clone = {}:
							clone = data

	if(isArray(data)){
		data.forEach(item => clone.push(item))
	}else if(isObject(data)){
		data[Symbol.iterator] = symb;
		for(let key of data){
			clone[key] = data[key]
		}
	}


	return clone
}


// Simple Clone << For / While >>
function scFor(data, clone){
	(isArray(data)) ? clone = []:
	(isObject(data)) ? clone = {}:
							clone = data

	if(isArray(data)){
		data.forEach(item => clone.push(item))
	}else if(isObject(data)){
		const keys = Object.keys(data);
		for(let index = keys.length; index--;){
			clone[keys[index]] = data[keys[index]]
		}
	}
	
	return clone;
}

// Simple Clone << Universal >>
function scUniversal(data, clone){
	(isArray(data)) ? clone = []:
	(isObject(data)) ? clone = {}:
							clone = data
	
	if(isArray(data)){
		data.forEach(item =>{
			let item_clone;
			if(isArray(item)){
				item_clone = []
				item.forEach(i =>{
					item_clone.push(i) 
				})
			}else if(isObject(item)){
				item_clone = {}
				for(let key in item)
					item_clone[key] = item[key]
			}else{
				clone.push(item)
			}

			if(!isEmpty(item_clone)) clone.push(item_clone);
		})
	}else if(isObject(data)){
		clone = {}
		for(let key in data){
			let elem_clone;
			if(isArray(data[key])){
				elem_clone = []
				data[key].forEach(i=> elem_clone.push(i))
			}else if(isObject(data[key])){
				elem_clone = {}
				for(let k in data[key])
					elem_clone[k] = data[key][k]
			}else{
				clone[key] = data[key]
			}

			if(!isEmpty(elem_clone)) clone[key] = elem_clone
		}
	}


	return clone;
}




function isArray(elem){
	return Array.isArray(elem);
}
function isObject(elem){
	return typeof elem === 'object' && elem !== null
}
function isEmpty(elem){
	if(isArray(elem)){
		return elem.length === 0
	}else if(isObject(elem)){
		return Object.keys(elem).length === 0
	}else{
		return elem === undefined
	}
}
