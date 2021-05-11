// When is it best to use undefined and when is it better to use void
function firstValueGeneric<T>(array: T[]): T | void {
  if (array && array.length !== 0) {
    return array[0]
  }
}


function firstValue(array: any[]): any {
  if (array && array.length !== 0) {
    return array[0]
  }
}

// So the value here is of type any because we have no idea what the firstValue function will return.
// We can tell by code examination but no guarantees from the compiler.
const value = firstValue([1, 2, 3]);

// Compiler knows that this is a number or it is void,
// Hence we can use this fact to know which methods are available to us based on the fact that it is a number
const typedValue = firstValueGeneric([1, 2, 3]);

// -------------------------------------------------------------------------------------------------------------

type Size = 'XS' | 'S' | 'M' | 'L' | 'XL';

interface Clothes {
  size: Size;
}

interface Shirt extends Clothes {
  collared: boolean;
}

interface Pants extends Clothes {
  shorts: boolean;
}

function getClothesSize<T extends Clothes>(clothing: T): Size {
  // The compiler doesn't complain here because we have specified that T extends Clothes
  // clothing.collared; // This is not allowed as we are not sure if it is a Shirt
    return clothing.size;
}

const myShirt: Shirt = {
  size: 'M',
  collared: false
}

const myPants: Pants = {
  size: 'M',
  shorts: false
}

const myShirtSize = getClothesSize(myShirt);
const myPantSize = getClothesSize(myPants);