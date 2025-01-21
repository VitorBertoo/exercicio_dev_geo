export interface ITokenProvider {
  sign(payload: string | object | Buffer): Promise<string | boolean>;
  verify(payload: string): Promise<string | object | Buffer | boolean>;
}
