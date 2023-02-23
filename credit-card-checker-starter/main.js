// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]


// Add your functions below:
let invalidCards = [];
let invalidCompanies = [];
let falseNumber = 0;
let falseRemainder = 0;
let newNumArray = [];

//convert a string to numbers

const convertToNumber = str => {
    let validCardNumber = [];
    for (let i = 0 ; i<str.length ; i++) {
        validCardNumber.push(parseInt(str[i]))
    }
    console.log(validCardNumber)
    return validCardNumber;
}

const validCred = arr => {
    let numberArray = [];
    let numberSum = 0;
    let isEven = true;
    
    

    // checking if the length of the cc# is even or odd, so we can properly iterate to every second step in next loop
    if ((arr.length - 1) % 2 === 0) {
        isEven = true;
    } else {
        isEven = false;
    }

    // iterating backwards through the original array, doubling every second number
    for (let i = arr.length - 1 ; i >= 0 ; i--) {
        if (i === arr.length -1) {
            numberArray.push(arr[i])
        }
        else if ((isEven && i % 2 != 0) || (isEven === false && i % 2 === 0)) {
            numberArray.push((arr[i] * 2))
        } else {
            numberArray.push(arr[i])
        }
    }
    //console.log(numberArray);

    // subtracting 9 from any number bigger than 9
    for (j = numberArray.length - 1 ; j >= 0 ; j--) {
        if (numberArray[j] > 9) {
            numberArray[j] = numberArray[j] - 9
        }
    }

    //console.log(numberArray)
    
    numberSum = numberArray.reduce((acc, curr) => acc + curr, 0) //summing up the array

    //console.log(numberSum)

    //is this number divisible by 10?
    if (numberSum % 10 === 0) {
        return true;
    } else {
        falseNumber = numberSum;
        falseRemainder = numberSum % 10;
        return false;
    }
}

// make a new array containing all the invalid CC numbers
const findInvalidCards = (arr) => {
    
    for (let i = 0 ; i<arr.length ; i++) {
        if (validCred(arr[i]) === false) {
            invalidCards.push(arr[i]);
        }
    }
    //console.log(invalidCards)
    return invalidCards;
}

// console.log(findInvalidCards(batch))

// make a new array of all the companies that have issued a faulty card
const idInvalidCardCompanies = arr => {
    for (let i = 0 ; i < arr.length ; i++) {
        if (arr[i][0] === 3 && invalidCompanies.includes('amex') != true) {
            invalidCompanies.push('amex')
        }
        else if (arr[i][0] === 4 && invalidCompanies.includes('visa') != true){
            invalidCompanies.push('visa')
        }
        else if (arr[i][0] === 5 && invalidCompanies.includes('mastercard') != true) {
            invalidCompanies.push('mastercard')
        }
        else if (arr[i][0] === 6 && invalidCompanies.includes('discover') != true) {
            invalidCompanies.push('discover')
        }
        else if (arr[i][0] != 3 && arr[i][0] != 4 && arr[i][0] != 5 && arr[i][0] != 6){
            console.log('Company not found')
        }
    }
    
    console.log(invalidCompanies)
    return invalidCompanies
}

// convert an invalid CC# to a valid one
const convertInvalidToValid = str => {
    
    newNumArray = convertToNumber(str)

    if (validCred(newNumArray) === false) {
        console.log(falseNumber)
        console.log(falseRemainder)
        for (let i = 0 ; i < newNumArray.length ; i++) {
            if (newNumArray[i] - falseRemainder > 0) {
                newNumArray[i] = newNumArray[i] - falseRemainder
                break;
            }

        }
        console.log(newNumArray);
        return newNumArray;
    }
}


//findInvalidCards(batch)
//idInvalidCardCompanies(invalidCards)
//convertToNumber('43564432')
convertInvalidToValid('46372638486525')
console.log(validCred(newNumArray))






