import axios from "axios";

/**
 * ## Fetches IP address details
 *
 * This function takes an IP address as input and sends a request to the ipwho.is API to retrieve detailed information about the IP address. It returns a promise that resolves to the data received from the API. This function can be used to obtain geolocation data, connection type, and other relevant details about an IP address.
 *
 * @param {string} ip - The IP address for which details are needed.
 * @returns {Promise<any>} A promise that resolves to the data object containing details about the IP address.
 *
 * @example
 * ```typescript
 * cGetIpDetails('192.168.1.1').then(data => {
 *   console.log(data);
 * }).catch(error => {
 *   console.error('Error fetching IP details:', error);
 * });
 * ```
 */
export const cGetIpDetails = (ip: string): Promise<any> =>
  axios.get(`https://ipwho.is/${ip}`).then((res) => res.data);
