import { ProcessHttpClientResponseException } from '@pnp/odata';

export class ErrorHelper {
  public static getErrorWithDetails(error: any): Error {
    let errorToReturn: any = error;
    const odataErrorPropertyName = 'odata.error';

    if (error instanceof ProcessHttpClientResponseException || error.hasOwnProperty('data')) {
      if (error.data &&
        error.data.responseBody &&
        error.data.responseBody[odataErrorPropertyName] &&
        error.data.responseBody[odataErrorPropertyName].message &&
        error.data.responseBody[odataErrorPropertyName].message.value
      ) {
        errorToReturn = new Error(error.data.responseBody[odataErrorPropertyName].message.value);
      }
    }

    return errorToReturn;
  }
}
