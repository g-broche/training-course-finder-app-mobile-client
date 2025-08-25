import { useAuth } from "../../context/AuthContext";
import { Announce } from "../../types/dto";
import AnnounceAuthorChatInterface from "./announce-author-chat-interface";
import AnnounceResponderChatInterface from "./announce-responder-chat-interface";
import GuestChatInterface from "./guest-chat-interface";

type Props = {
    announce: Announce;
};



export default function ChatMenu({ announce }: Props) {
    const { authState } = useAuth();
    return (
        <>
            {authState.user == null && <GuestChatInterface />}
            {authState.user && authState.user.displayName === announce.author.displayName && <AnnounceAuthorChatInterface />}
            {authState.user && authState.user.displayName != announce.author.displayName && <AnnounceResponderChatInterface />}
        </>
    );
}