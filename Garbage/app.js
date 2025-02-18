const AWS = require('aws-sdk');
const crypto = require('crypto');

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "NewUsers";

exports.lambdaHandler = async (event) => {
    try {
        const body = JSON.parse(event.body);
        const { name, email, password, shipping_address } = body;

        // Validate input
        if (!name || !email || !password || !shipping_address) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "All fields are required" })
            };
        }

        // Hash password before storing
        const passwordHash = crypto.createHash('sha256').update(password).digest('hex');

        // Save user to DynamoDB
        await dynamoDB.put({
            TableName: TABLE_NAME,
            Item: {
                email,
                name,
                passwordHash,
                shipping_address
            }
        }).promise();

        return {
            statusCode: 201,
            body: JSON.stringify({ message: "User registered successfully" })
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};

  