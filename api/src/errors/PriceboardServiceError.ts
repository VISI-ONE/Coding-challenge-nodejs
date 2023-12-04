export class PriceboardServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PriceboardServiceError';
  }
}
