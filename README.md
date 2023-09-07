# Generate Snowflake and Unique IDs

1) Create an instance of the ID class with a machine ID

    ```typescript
    const idGenerator = new ID(machineId);

    // Generate a Snowflake ID
    const snowflakeID = idGenerator.getSnowflakeID();
    console.log(`Snowflake ID: ${snowflakeID}`);

    // Generate a Unique ID
    const uniqueID = idGenerator.getUniqueID();
    console.log(`Unique ID: ${uniqueID}`);
    ```

# Example Usage of Utility Functions

1) Define a sample `Express` route handler

    ```typescript
    const sampleRouteHandler = (req: Request, res: Response) => {
        try {
            // Construct a JSON response using the `toJson` function
            toJson(res, {
                data: responseData, // Sample data to be included in the response
                message: "Sample response for README",
            });
        } catch (error) {
            // Handle errors and construct an error response using the `errorResponse` function
            errorResponse(res, error);
        }
    };
    ```
1) Check if a value has data

    ```typescript
    const hasValue = hasData("Sample Data"); // true if the value is not empty
    ```
1) Check if a date is valid

    ```typescript
    const isDateValid = isValidDate("2023-09-07"); // true if the date is valid
    ```
1) Check if a date and time is valid

    ```typescript
    const isDateTimeValid = isValidDateTime("2023-09-07 14:30:00"); // true if the date and time are valid
    ```
1) Add one day to a date

    ```typescript
    const newDate = addOneDay("2023-09-07"); // Date representing the next day
    ```
1) Get an image URL with a placeholder if no data is available

    ```typescript
    const imageUrl = getImg("https://example.com/image.jpg"); // Provided URL if data exists, otherwise a placeholder URL
    ```
1) Compare two JSON objects for deep equality

    ```typescript
    const obj1 = { key1: "value1", key2: { nestedKey: "nestedValue" } };
    const obj2 = { key1: "value1", key2: { nestedKey: "nestedValue" } };

    const areEqual = compareJSONObjects(obj1, obj2); // true if objects are deeply equal
    ```

1) Convert a number to a string or empty string if it's zero

    ```typescript
    const stringValue = convertNumberToStringOrEmpty(0); // "" (empty string)
    ```





