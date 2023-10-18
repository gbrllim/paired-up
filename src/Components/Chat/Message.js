import { ImageCarousel } from "../Feed/ImageCarousel";

const DUMMY_USERID = "dummyuser"; // to use these as subs
const DUMMY_PAIRID = "dummypair"; // to use these as subs

//<Message chatMessage={chatMessage} key={message.key} postIndex={index} />
export function Message(props) {
  const DB_CHAT_KEY = `chat`;
  {
    console.log(props);
  }

  return (
    // to work out the edit button later
    <div
      className={`flex flex-row ${
        props.sender === "self" ? "justify-end" : "justify-start"
      }`}
    >
      {/* {props.sender === 'other' ? <img src= 'insert profile pic here' /> : null} */}
      <div
        className=" max-h-1/5 m-2 rounded-lg bg-text p-2"
        key={props.chatMessage.key}
      >
        {props.chatMessage.val.files ? (
          <ImageCarousel
            urlArray={
              props.chatMessage.val.files ? props.chatMessage.val.files : []
            }
          />
        ) : null}
        {props.chatMessage.val.message}
        <br />
        <p className="text-right text-xs">
          {props.chatMessage.val.date.slice(12)}
        </p>
      </div>
      {/* {props.sender === 'self' ? <img src= 'insert profile pic here' /> : null} */}
    </div>
  );
}
