import EmojiPicker, { Theme, type EmojiClickData } from 'emoji-picker-react';
import type { Message, Reaction } from '../Types';
import { useState } from 'react';

type Props = {
    message: Message;
    updateMessage: (messages: Message) => void;
    wsRef: React.RefObject<WebSocket | null>;
}

export default function ChatBubble({ message, updateMessage, wsRef }: Props) {

    const [showEmojis, setShowEmojis] = useState(false);
    const [hovered, setHovered] = useState(false)

    function addReaction(emojiObject: EmojiClickData) {
        const reactions: Reaction[] = message.reactions.map(reaction => 
            reaction.emoji === emojiObject.emoji ? {...reaction, count: reaction.count += 1} : reaction
        )

        const newReactions = reactions.some(r => r.emoji === emojiObject.emoji) 
        ? 
        reactions 
        : 
        [...reactions, { emoji: emojiObject.emoji, count: 1}]
        
        const messageToChange: Message = {
            ...message,
            type: 'reaction',
            reactions: newReactions
        }
        
        updateMessage(messageToChange)
        setShowEmojis(false)
        wsRef.current?.send(JSON.stringify(messageToChange))
    }


    return (
        <div className='chat-bubble-container' onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
                <div className='chat-bubble'>
                  
                    <strong style={{ marginTop: '10px' }}>{message.from}:</strong>
                    <br/>
                    {
                        message.media.map(item => {
                            let regex = new RegExp(/[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/);

                            let vidregex = new RegExp(/(youtube)/)

                            if (item === null || item.length === 0) {
                                return null;
                            }
                            if(vidregex.test(item)){
                                return <iframe src={item.replace("watch?v=","embed/")}/>
                            }
                            if(regex.test(item)){
                                return <img src={item} alt='not found' width={300}/>
                            }
                        })
                    }
                    <p style={{ marginTop: '10px' }}>{message.content}</p>
                    <div className='reactions' style={{
                        backgroundColor: 'transparent',
                        border: message.reactions.length > 0 ? '1px solid greenyellow' : 'none ',
                    }}>
                        {
                            message.reactions.map(reaction => {
                                return <div key={reaction.emoji}>{reaction.emoji} {reaction.count}</div>
                            })
                        }
                    </div>
                </div>
                        <div>
                            <button
                                style={{
                                    backgroundColor: 'transparent',
                                    transform: 'translateY(20px)',
                                    display: hovered ? 'inline-block' : 'none',
                                    position: 'absolute',
                                }}
                                onClick={() => setShowEmojis(true)}>🤪</button>
                        </div>

                <div className="emoji-picker" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                    <EmojiPicker theme={Theme.DARK} open={showEmojis} onEmojiClick={(emojiObject) => {
                        addReaction(emojiObject);
                    }} />
                </div>
            </div>
    )
}