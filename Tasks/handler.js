const AWS = require("aws-sdk");
const bcrypt = require("bcryptjs");

const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.register = async (event) => {
  try {
    // Parse the incoming request body
    const body = JSON.parse(event.body);
    const { name, email, password, shipping_address } = body;

    if (!name || !email || !password || !shipping_address) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required fields" }),
      };
    }
    

    // Hash the password before storing it
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save the user data in DynamoDB
    const params = {
      TableName: "NewUsers",
      Item: {
        email,
        name,
        passwordHash: hashedPassword, // Store the hashed password
        shipping_address,
      },
    };

    await dynamoDB.put(params).promise();

    console.log("Received event:", JSON.stringify(event.body, null, 2));

    return {
      statusCode: 201,
      body: JSON.stringify({ message: "User registered successfully!" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error", details: error.message }),
    };
  }
};
