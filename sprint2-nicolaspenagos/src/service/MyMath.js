const escalarProduct = (v1, v2) => {
    if (v1.length !== v2.length)
        throw new Error("Vectors must have the same length");

    let result = 0.0;
    for (let i = 0; i < v1.length; i++) {

        if (typeof v1[i] !== 'number' || typeof v2[i] !== 'number')
            throw new Error("Vectors must only contains numbers");

        result += v1[i] * v2[i];
    }

   
    return result;
}

const getVectorMagnitude = (v) => {
    let sum = 0;

    v.forEach(element => {
        if (typeof element !== 'number')
            throw new Error("Vector must only contains numbers");
        sum += element * element;
    });

    return Math.sqrt(sum);
}

export const cosineSimlarity = (v1, v2) => {
    console.log(escalarProduct(v1,v2))
    return escalarProduct(v1,v2)/(getVectorMagnitude(v1)*getVectorMagnitude(v2));
}