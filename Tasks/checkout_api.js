const AWS = require("aws-sdk");

const dynamoDB = AWS.DynamoDB.DocumentClient();


exports.checkout_function = async (event) =>{
    const{userID, shippingAddress, paymentMethod, cartItems} = event.queryStringParameters;

    

}
