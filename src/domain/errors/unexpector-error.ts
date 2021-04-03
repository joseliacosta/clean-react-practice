export class UnexpectedError extends Error {
  constructor() {
    super('Aconteceu algo de errado :/')
    this.name = 'UnexpectedError'
  }
}
