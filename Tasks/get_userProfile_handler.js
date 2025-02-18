const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const USER_TABLE = "NewUsers";

// handling GET request

module.exports.getProfile = async (event) =>{
    
    try {
        const {email} = event.queryStringParameters;

        if(email){
            console.log("received email: ", email);
        }
        if(!email){
            return{
                statusCode: 400,
                body: JSON.stringify({error: "you are not giving email in your request"}),
            };
        }

        // ye parameter hai get() me pass karne ke liye
        const params = {
            TableName: USER_TABLE,
            Key: {email: email},
        };

        // ab result store karna hai - data table se leke result variable me store krna hai
        
        const result = await dynamoDB.get(params).promise();

        // agar result me vo USER ID nhi hai to 

        if(!result.Item){
            return{
                statusCode: 404,
                body: JSON.stringify({error:"User not found in the Table"}),
            };
        }

        // agar sabkuch sahi hai to result return kar do

        return{
            statusCode: 200,
            body: JSON.stringify(result.Item),
        };

        
    } catch (error) {
        console.error("Error fetching user Profile: ", error);
        return{
            statusCode:500,
            body: JSON.stringify({error:"handling this error from the Catch block of the Code."})
        }
    }


}