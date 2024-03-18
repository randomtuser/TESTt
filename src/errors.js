export class FetchingError extends Error {
  constructor(message) {
    super(message);
    this.name = 'FetchingError';
  }
}

export class UploadBucketError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UploadBucketError';
  }
}

export class SendCommand extends Error {
  constructor(message) {
    super(message);
    this.name = 'SendCommand';
  }
}
