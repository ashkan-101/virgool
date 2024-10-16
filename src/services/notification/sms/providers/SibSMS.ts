import ISMSMessage from "../contracts/ISMSMessage";
import ISMSProvider from "../contracts/ISMSProvider";
import https from 'https'

export default class SibSMS implements ISMSProvider{
  public send(message: ISMSMessage): void {
    const apiKey: string = 'awawawaw'
    const sender  : string = '100003000'
    const url =  `http://api.sms-webservice.com/api/V3/Send?ApiKey=${apiKey}&Text=${message.message}&Sender=${sender}&Recipients=${message.to}`
    https.get(url, (res) => {})
  }                                              
}