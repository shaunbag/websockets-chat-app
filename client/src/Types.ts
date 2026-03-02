export type MessageType = 'message' | 'users' | 'addUser' | 'reaction' | 'heartbeat';

export type Reaction = {
    emoji: string;
    count: number;
}

export type Message = {
  type: MessageType;
  from: string;
  content: string;
  createdAt: number;
  reactions: Reaction[];
  media: string[];
}

export type User = {
  name: string;
  id: string;
}
