import { Button, FormControl, HStack, Input } from "@chakra-ui/react";
import { useContext, useState } from "react";

import AuthContext from "src/context/auth";
import { server } from "src/utils/server";

const MessageInput = ({ roomId }: { roomId: string }): JSX.Element => {
  const [message, setMessage] = useState("");
  const { auth } = useContext(AuthContext);

  const sendMessage = async () => {
    if (message == "") return;

    server
      .post(
        `/room/${roomId}`,
        { message },
        { headers: { Authorization: `Bearer ${auth.accessToken}` } }
      )
      .then((res) => {
        if (res.status != 200) return;
        setMessage("");
      });
  };

  return (
    <HStack w="60vw">
      <FormControl>
        <Input
          placeholder="Message"
          w="full"
          value={message}
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key == "Enter") sendMessage();
          }}
        />
      </FormControl>
      <Button onClick={() => sendMessage()} colorScheme="orange">
        Send
      </Button>
    </HStack>
  );
};

export default MessageInput;
