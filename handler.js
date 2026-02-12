const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

const dynamodb = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = process.env.NOTES_TABLE;

exports.handler = async (event) => {
    const { httpMethod, body, pathParameters } = event;

    try {
        switch(httpMethod) {
            case "POST":
                return await createNote(JSON.parse(body));
            case "GET":
                return await getNote(pathParameters.id);
            case "PUT":
                return await updateNote(pathParameters.id, JSON.parse(body));
            case "DELETE":
                return await deleteNote(pathParameters.id);
            default:
                return response(400, { message: "Unsupported route" });
        }
    } catch (error) {
        return response(500, { message: error.message });
    }
};

const createNote = async (data) => {
    const note = {
        id: uuidv4(),
        title: data.title,
        content: data.content,
        createdAt: new Date().toISOString(),
    };

    await dynamodb.put({
        TableName: TABLE_NAME,
        Item: note,
    }).promise();

    return response(201, note);
};

const getNote = async (id) => {
    const result = await dynamodb.get({
        TableName: TABLE_NAME,
        Key: { id },
    }).promise();

    return response(200, result.Item);
};

const updateNote = async (id, data) => {
    await dynamodb.update({
        TableName: TABLE_NAME,
        Key: { id },
        UpdateExpression: "set title = :t, content = :c",
        ExpressionAttributeValues: {
            ":t": data.title,
            ":c": data.content,
        },
        ConditionExpression: "attribute_exists(id)",
        ReturnValues: "ALL_NEW"
    }).promise();

    return response(200, result.Attributes);
};

const deleteNote = async (id) => {
    await dynamodb.delete({
        TableName: TABLE_NAME,
        Key: { id },
    }).promise();

    return response(200, { message: "Note deleted" });
};

const response = (statusCode, body) => ({
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
});