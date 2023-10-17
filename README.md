[![npm](https://img.shields.io/npm/v/node_custom_utils.svg)](https://www.npmjs.org/package/node_custom_utils)
[![downloads per month](http://img.shields.io/npm/dm/node_custom_utils.svg)](https://www.npmjs.org/package/node_custom_utils)


# Generate Snowflake and Unique IDs

1. Create an instance of the ID class with a machine ID

   ```typescript
   const idGenerator = new ID(1);
   ```

   ```typescript
   // Generate a Snowflake ID
   const snowflakeID = idGenerator.getSnowflakeID();
   console.log(`Snowflake ID: ${snowflakeID}`);
   ```

   ```typescript
   // Generate a Unique ID
   const uniqueID = idGenerator.getUniqueID();
   console.log(`Unique ID: ${uniqueID}`);
   ```

# Utility Functions for Manipulating URL Strings.

1. Parses the query parameters from a given URL string and returns them as a Map.

   ```typescript
   const urlString = "https://example.com/path?name=John&age=30";
   const queryParams = cGetQueryParams(urlString);
   console.log(queryParams.get("name")); // Output: 'John'
   console.log(queryParams.get("age")); // Output: '30'
   ```

1. Validates a URL string.

   ```typescript
   const isValid = cIsValidUrl("https://www.example.com");
   console.log(isValid); // Output: true
   ```

# Example Usage of Utility Functions

1. Define a sample **Express** route handler

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

1. Check if a value has data

   ```typescript
   const hasValue = hasData("Sample Data"); // true if the value is not empty
   ```

1. Check if a date is valid

   ```typescript
   const isDateValid = isValidDate("2023-09-07"); // true if the date is valid
   ```

1. Check if a date and time is valid

   ```typescript
   const isDateTimeValid = isValidDateTime("2023-09-07 14:30:00"); // true if the date and time are valid
   ```

1. Add one day to a date

   ```typescript
   const newDate = adjustDateByDays(new Date("2023-09-07"));
   ```

1. Get an image URL with a placeholder if no data is available

   ```typescript
   const imageUrl = getImg("https://example.com/image.jpg"); // Provided URL if data exists, otherwise a placeholder URL
   ```

1. Compare two JSON objects for deep equality

   ```typescript
   const obj1 = { key1: "value1", key2: { nestedKey: "nestedValue" } };
   const obj2 = { key1: "value1", key2: { nestedKey: "nestedValue" } };

   const areEqual = compareJSONObjects(obj1, obj2); // true if objects are deeply equal
   ```

1. Convert a number to a string or empty string if it's zero

   ```typescript
   const stringValue = convertNumberToStringOrEmpty(0); // "" (empty string)
   ```
