import ISMSMessage from "./ISMSMessage";

export default interface ISMSProvider {
  send(message: ISMSMessage): void
}