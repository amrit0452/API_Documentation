const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports.update = async (event) => {
  try {
    const {email,name,shipping_address} = JSON.parse(event.body);

    if(!email){
        return{
            statusCode: 400,
            body: JSON.stringify({message:"Email is required "})
        }
    }
    // Prepare the update expression and values
    let updateFields = [];
    let expressionAttributeNames = {}; // Used for reserved keywords
    let expressionAttributeValues = {};

    if(name){
        updateFields.push("#name = :name")
        expressionAttributeNames['#name'] = "name";
        expressionAttributeValues[':name'] = name;
    }

    // if(email){
    //     updateExpression += 'email = :email,';
    //     expressionAttributeValues[':email'] = email;
    // }

    if(shipping_address){
        updateFields.push("shipping_address = :shipping_address")
        expressionAttributeValues[':shipping_address'] = shipping_address;
    }

    // if no field is provided for updation

    if(updateFields.length === 0){
        return{
            statusCode: 400,
            body: JSON.stringify({error:"No fields are provided for update."})
        }
    }
     // Remove the trailing comma from the update expression
    const updateExpression = "set " + updateFields.join(", ");

    const params = {
        TableName : "NewUsers",
        Key: {
            'email': email,
        },
        UpdateExpression: updateExpression,
        ExpressionAttributeNames : expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues:'ALL_NEW',
    }

    const result = await dynamoDB.update(params).promise();
    return{
        statusCode: 200,
        body: JSON.stringify(
            {
                message:'Profile Updated Successfully.',
                updatedProfile: result.Attributes,
            }
        ),
    }
  } catch (error) {
    console.log('Error updating profile', error);
    return{
        statusCode:500,
        body: JSON.stringify({message:"Failed to update profile."}),
    };
  }
};