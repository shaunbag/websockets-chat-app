import EmojiPicker, { Theme, type EmojiClickData } from "emoji-picker-react";
import { useUserStore } from "../store";
import { useEffect, useRef, useState } from "react";
import type { MessageType } from "../Types";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';

type Props = {
    sendMessage: (type: MessageType, name: string, message: string, images: string[]) => void;
    connected: boolean;
}

export default function ChatInput({ sendMessage, connected }: Props) {

    const { username } = useUserStore();
    const [messageToSend, setMessageToSend] = useState<string>('');
    const [showEmojis, setShowEmojis] = useState<boolean>(false);
    const [image, setImage] = useState<string>('');
    const [images, setImages] = useState<string[]>([]);
    const [showImageInput, setShowImageInput] = useState<boolean>(false);
    const attachFileRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                attachFileRef.current &&
                showImageInput &&
                !attachFileRef.current.contains(event.target as Node)
            ) {
                setShowImageInput(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [attachFileRef, showImageInput]);

    function handleEmoji(emojiObject: EmojiClickData) {
        setMessageToSend(prev => prev + " " + emojiObject.emoji);
        setShowEmojis(false);
    }

    function handleSendMessage(){
        sendMessage('message', username, messageToSend.trim(), images)
        setMessageToSend('')
        setImages([])
    }

    return (
        <div className="input-container" style={{ display: connected ? 'flex' : 'none' }}>
            <div>
                <button onClick={() => setShowImageInput(true)}><AttachFileIcon /></button>
            </div>
            <input
                type="text"
                className="chat-input"
                value={messageToSend}
                onChange={(e) => setMessageToSend(e.target.value)}
                placeholder="Type a message..."
                onKeyDown={(e) => {
                    console.log(e)
                    if (e.key === 'Enter') {
                       handleSendMessage();
                    }
                }}
            />
            <button onClick={() => setShowEmojis(prev => !prev)}>Mojis</button>
            <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <EmojiPicker theme={Theme.DARK} open={showEmojis} onEmojiClick={(emojiObject) => {
                    handleEmoji(emojiObject)
                }} />
            </div>
            <div>
                <button onClick={handleSendMessage}><SendIcon /></button>
            </div>
            {
                showImageInput && (
                    <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} ref={attachFileRef}>
                        <input type='text' value={image} onChange={(e) => setImage(e.target.value)} />
                        <button onClick={() => {
                            setImages(prev => [...prev, image]);
                            setImage('');
                            setShowImageInput(false);
                        }}>Attach Image</button>
                    </div>
                )
            }
        </div>
    )

}