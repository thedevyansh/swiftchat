import { useState } from "react";
import { useConversations } from "../contexts/ConversationsProvider";
import OpenConversation from "./OpenConversation";
import Sidebar from "./Sidebar";
import ShowGroupMembers from "./ShowGroupMembers";

export default function Dashboard({ id }) {
  const { selectedConversation } = useConversations();
  const [showListOfMembers, setShowListOfMembers] = useState(false);

  function showMembers() {
    setShowListOfMembers((showList) => !showList);
  }

  return (
    <div className="d-flex" style={{ height: "100vh" }}>
      <Sidebar id={id} />
      {selectedConversation && (
        <OpenConversation showMemberList={showMembers} />
      )}
      {selectedConversation && selectedConversation.recipients.length !== 1 && showListOfMembers && (
        <ShowGroupMembers />
      )}
    </div>
  );
}
