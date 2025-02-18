const AWS = require("aws-sdk")
const dynamoDB = new AWS.DynamoDB.DocumentClient();


exports.addToCartFunction = async (event) =>{
    try{
        const body = JSON.parse(event.body);
        const { userID , productID} = body;

        if( !userID || !productID){
            return {
                statusCode:400,
                body: JSON.stringify({error: "Missing required Query Parameter[check userID or productID]"}),
            }
        }



    const params = {
        TableName: process.env.CART_TABLE,
        Item:{
            userID,productID
        }
    }

    await dynamoDB.put(params).promise();


    return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Product added to cart successfully",
          userID,
          productID,
        }),
      };
    } catch(error){
        return{
            statusCode: 500,
            body: JSON.stringify({error: "error msg from the catch block of your code", details: error.message}),
        }
    }
}