const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.history = async (event) =>{
    try {
        const userID = event.queryStringParameters.userID;

        if(!userID){
            return{
                statusCode:400,
                body: JSON.stringify({message:"userID is required."})
            };
        }

        const params = {
            TableName: "orders",
            FilterExpression: "userID = :userID",
            ExpressionAttributeValues:{
                ":userID":userID,
            }
        };


        //using scan because productID is partition key
        const result = await dynamoDB.scan(params).promise();


        if( result.Items.length === 0){
            return{
                statusCode:404,
                body:JSON.stringify({message:"no oders found for this user."})
            };
        }

        return{
            statusCode:200,
            body:JSON.stringify({
                message_is:"Order history retrieved successfully.",
                orders: result.Items
            })
        }
    } catch (error) {
        console.error("Error retrieving order history: ", error);
        return{
            statusCode: 500,
            body: JSON.stringify({message:"failed to retrieve order history."})
        };
    }
}