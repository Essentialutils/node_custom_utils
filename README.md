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

# File upload

1. Local server.

   ```typescript
   // Uploads a file to the local server.
   const uploadedFileUrl = await FileUploadToLocalServer({
     req,
     pathToUpload,
     imageKeyWord,
   });
   ```

   ```typescript
   // Deletes a file located at the specified path.
   DeleteLocalServerFile(filePathToDelete);
   ```

1. S3 Spaces

   ```typescript
   // Allowed file extensions for upload
   const allowedExtensions = [".jpg", ".png", ".jpeg"];

   // Upload the file to the specified bucket
   const uploadedFileKey = await FileUploadToSpacesBucket({
     req,
     pathToUpload,
     imageKeyWord,
     fileTypes: allowedExtensions,
   });
   ```

   ```typescript
   // Attempt to delete the file
   const isDeleted = await DeleteFileSpacesBucket(fileKey);
   ```

# Verify the Integrity of Color Hash Codes

1. Checks if the given string represents a valid hexadecimal color code.

   ```typescript
   "#123".cIsValidColorCode(); // true
   "#12345".cIsValidColorCode(); // false
   "red".cIsValidColorCode(); // false
   ```

# Handle string-based URL manipulation.

1.  Parses the query parameters from a given URL string and returns them as a Map.

    ```typescript
    const urlString = "https://example.com/path?name=John&age=30";
    const queryParams = cGetQueryParams(urlString);
    console.log(queryParams.get("name")); // Output: 'John'
    console.log(queryParams.get("age")); // Output: '30'
    ```

1.  Validates a URL string.

    ```typescript
    const isValid = cIsValidUrl("https://www.example.com");
    console.log(isValid); // Output: true
    ```

1.  The `cUpdateQueryParam` function is an extension of the global `String` object in TypeScript. It provides a method for updating or adding query parameters to a URL string. This can be especially useful in web development when you need to modify URLs dynamically.

    ```typescript
    // Original URL
    const originalUrl = "https://example.com/page?name=John";

    // Updated URL with a new query parameter or modified existing parameter
    const updatedUrl = originalUrl.cUpdateQueryParam("age", "30");

    console.log(updatedUrl);
    // Output: 'https://example.com/page?name=John&age=30'
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

## Converts a JSON string to a JavaScript object.

```typescript
const jsonData = '{"name": "John", "age": 30}';
const jsonObject = cToJson(jsonData);
console.log(jsonObject); // Output: { name: 'John', age: 30 }
```

```typescript
const data = { name: "Alice", age: 25 };
const convertedData = cToJson(data);
console.log(convertedData); // Output: { name: 'Alice', age: 25 }
```

```typescript
const invalidData = "not a valid JSON";
try {
  const result = cToJson(invalidData); // Throws an error
} catch (error) {
  console.error(error.message); // Output: "The data cannot be converted into a JSON format."
}
```

## Filters the input list to keep only the unique objects.

> cGetUniqueObjects()

```typescript
// Example Usage
const inputList = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 1, name: "Alice" }, // Duplicate object
];

const uniqueObjects = cGetUniqueObjects(inputList);
console.log(uniqueObjects);
```

## Base64

> Encodes a string into Base64 format. `cEncodeToBase64()`

```typescript
let originalString = "Hello World!";
let encodedString = originalString.cEncodeToBase64();
console.log(`Encoded String: ${encodedString}`);
```

> Decodes a Base64 encoded string. `cDecodeFromBase64()`

```typescript
let originalString = "Hello World!";
let decodedString = encodedString.cDecodeFromBase64();
console.log(`Decoded String: ${decodedString}`);
```

## Converts a value to a boolean in a safe manner.

```typescript
const result = cToBooleanSafe("true"); // Returns true
const result2 = cToBooleanSafe("false"); // Returns false
const result3 = cToBooleanSafe(1); // Returns true
```

## sha256

```typescript
cSha256("data");
```

## Asynchronously converts a CSV file to a JSON array.

```typescript
csvToJson("/path/to/file.csv").then((data) => console.log(data));
```

## Asynchronously converts an array of JSON objects to a CSV file.

```typescript
jsonToCsv([{ name: "John", age: 30 }], "users").then((path) =>
  console.log(path)
);
```

## Generates an array of objects, each representing a distinct month (and year) within a specified date range.

```typescript
const details = cGetYearMonthDetailsBetweenDates("2022-01-01", "2022-03-01");
```

Output:
[
{ year: 2022, monthNumber: 1, monthName: "January" },
{ year: 2022, monthNumber: 2, monthName: "February" },
{ year: 2022, monthNumber: 3, monthName: "March" }
]

## Gets the months that fall between two given dates.

1. > Get full month names between January 1, 2022, and March 1, 2022

   ```typescript
   cGetMonthBetweenDates("2022-01-01", "2022-03-01", true);
   ```

   // Returns ["January", "February", "March"]

1. > Get month numbers between January 1, 2022, and March 1, 2022
   ```typescript
   cGetMonthBetweenDates("2022-01-01", "2022-03-01");
   ```
   // Returns ["1", "2", "3"]

## Checks if two dates fall within the same calendar year.

1.  ```typescript
    cHaveSameYear("2023-01-01", "2023-12-31");
    ```

    // Returns true

1.  ```typescript
    cHaveSameYear("2023-12-31", "2024-01-01");
    ```
    // Returns false

## Changes the month and optionally the day of a given date string.

1.  ```typescript
    // Change the month of March 15, 2023, to February
    cChangeDateMonthAndDay("2023-03-15", 2);
    // Returns "2023-02-15"
    ```

1.  ```typescript
    // Change the month and day of March 15, 2023, to February 28
    cChangeDateMonthAndDay("2023-03-15", 2, 28);
    // Returns "2023-02-28"
    ```
1.  ```typescript
    // Attempt to set an invalid date (February 30th)
    cChangeDateMonthAndDay("2023-03-15", 2, 30);
    // Logs "Invalid day for the given month" and returns "2023-03-15"
    ```

## Converts a floating-point number to an integer.

1. ```typescript
   cConvertDoubleToInt(NaN);
   ```
   > returns 0
1. ```typescript
   cConvertDoubleToInt(1.0);
   ```
   > returns 100
1. ```typescript
   cConvertDoubleToInt(123.45);
   ```
   > returns 12345

## Fetches IP address details

```typescript
cGetIpDetails("192.168.1.1")
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Error fetching IP details:", error);
  });
```

## Contributers

- [Salmanul Faris K](https://github.com/iamfrs) ( Developer )
- [Sharafas OM](https://github.com/sharafas-om) ( Maintainer and Publisher )
