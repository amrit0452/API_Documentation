// searchProduct.js
const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();


// handling GET request

module.exports.search = async (event) => {
  const { keywords, category, subcategory, minPrice, maxPrice } = event.queryStringParameters;

  // Initialize expression attributes
  let filterExpression = "contains(#name, :keywords)";
  let expAttrNames = {
    "#name": "name",
  };
  let expAttrValues = {
    ":keywords": keywords,
  };

  // Adding additional filters based on the optional parameters
  if (category) {
    filterExpression += " AND #category = :category";
    expAttrNames["#category"] = "category";
    expAttrValues[":category"] = category;
  }
  if (subcategory) {
    filterExpression += " AND #subcategory = :subcategory";
    expAttrNames["#subcategory"] = "subcategory";
    expAttrValues[":subcategory"] = subcategory;
  }
  if (minPrice) {
    filterExpression += " AND #price >= :minPrice";
    expAttrNames["#price"] = "price";
    expAttrValues[":minPrice"] = minPrice;
  }
  if (maxPrice) {
    filterExpression += " AND #price <= :maxPrice";
    expAttrValues[":maxPrice"] = maxPrice;
  }

  // Query the Products table
  const params = {
    TableName: "Products",
    FilterExpression: filterExpression,
    ExpressionAttributeNames: expAttrNames,
    ExpressionAttributeValues: expAttrValues,
  };

  try {
    const result = await dynamoDB.scan(params).promise();

    if (result.Items.length > 0) {
      return {
        statusCode: 200,
        body: JSON.stringify(result.Items),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "No products found matching your criteria" }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error fetching products" }),
    };
  }
};
