const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();


module.exports.remove_from_cart = async (event) => {
    try {
        const{userID,productID} = JSON.parse(event.body);

        if(!userID || !productID){
            return{
                statusCode: 400,
                body: JSON.stringify({message:"userID and productID are required."})
            };
        }

        const params = {
            TableName: "Cart",
            Key:{
                userID,
                productID
            },
            ReturnValues: "ALL_OLD"
        };

        const result = await dynamoDB.delete(params).promise();

        return{
            statusCode:200,
            body: JSON.stringify({
                message:"Product removed from cart successfully.",
                deletedItem: result.Attributes
            },)
        }
    } catch (error) {
        console.error("Error removing from cart [catch block]: ", error);
        return{
            statusCode:500,
            body:JSON.stringify({message:"Failed to remove product from cart."}),
        };
    }
};