
export type Sender = 'user' | 'lugi';

export interface Message {
  id: string;
  text: string;
  sender: Sender;
}
