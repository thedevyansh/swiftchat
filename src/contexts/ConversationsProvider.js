import React, { useContext, useState, useEffect, useCallback } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useContacts } from "./ContactsProvider";
import { useSocket } from "./SocketProvider";
import * as tf from "@tensorflow/tfjs";

const ConversationsContext = React.createContext();

export function useConversations() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({ id, children }) {
  const [conversations, setConversations] = useLocalStorage(
    "conversations",
    []
  );
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
  const { contacts } = useContacts();
  const socket = useSocket();

  function createConversation(recipients) {
    setConversations((prevConversations) => {
      return [...prevConversations, { recipients, messages: [] }];
    });
  }

  const addMessageToConversation = useCallback(
    ({ recipients, text, sender, isImportant }) => {
      setConversations((prevConversations) => {
        let madeChange = false;
        //const newMessage = { sender, text };
        const newMessage = { sender, text, isImportant };
        const newConversations = prevConversations.map((conversation) => {
          if (arrayEquality(conversation.recipients, recipients)) {
            madeChange = true;
            return {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            };
          }

          return conversation;
        });

        if (madeChange) {
          return newConversations;
        } else {
          return [...prevConversations, { recipients, messages: [newMessage] }];
        }
      });
    },
    [setConversations]
  );

  function sendMessage(recipients, text) {
    chatResult(text, recipients);
    socket.emit("send-message", {
      recipients,
      text,
      isImportant: window.isImportant,
    });
  }

  useEffect(() => {
    if (socket == null) return;
    socket.on("receive-message", addMessageToConversation);

    return () => socket.off("receive-message");
  }, [socket, addMessageToConversation]);

  function chatResult(chatString, recipients) {
    let chatInterFlags = { job: 2, business: 2, tech: 2, medical: 2, work: 2 };

    function refineInputMessage(chatString) {
      chatString = chatString.toLowerCase();
      chatString = chatString.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ");
      chatString = chatString.trim();
      let finalString = " " + chatString + " ";

      return finalString;
    }

    function convertToTensor(finalString, features) {
      let temp = [];
      for (let i = 0; i < features.length; i++) {
        var searchString = new RegExp(features[i], "g");
        var x = finalString.match(searchString);
        var count = x ? x.length : 0;
        if (count > 0) temp.push(count);
        else temp.push(0);
      }
      return temp;
    }

    function predict(featureName, inputTensor, chatString, recipients) {
      if (window.INTERMODEL[featureName]) {
        let finalInput = [inputTensor];
        let result = window.INTERMODEL[featureName].predict(
          tf.tensor(finalInput)
        );
        const answer = result.dataSync()[0] >= 0.5 ? 0 : 1; //final predicted value from that model(0 or 1)

        if (featureName !== "final") {
          chatInterFlags[featureName] = answer;

          let x = Object.values(chatInterFlags);
          var changeFlag = x.indexOf(2);

          if (changeFlag === -1) {
            predict("final", x, chatString, recipients); //function for final prediction
          }
        } else {
          // let genAns = answer ^ 1;
          window.isImportant = answer;
          addMessageToConversation({
            recipients,
            text: chatString,
            sender: id,
            isImportant: window.isImportant,
          });
        }
      } else {
        setTimeout(function () {
          predict(featureName, inputTensor, chatString, recipients);
        }, 50);
      }
    }

    function sendTensorToModel(chatString, featureName, recipients) {
      let feature1 = JSON.parse(localStorage.getItem(featureName));

      let inputTensor = convertToTensor(
        refineInputMessage(chatString),
        feature1
      );
      predict(featureName, inputTensor, chatString, recipients);
    }

    sendTensorToModel(chatString, "job", recipients);
    sendTensorToModel(chatString, "business", recipients);
    sendTensorToModel(chatString, "tech", recipients);
    sendTensorToModel(chatString, "medical", recipients);
    sendTensorToModel(chatString, "work", recipients);
  };

  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map((recipient) => {
      const contact = contacts.find((contact) => {
        return contact.id === recipient;
      });

      const name = (contact && contact.name) || recipient;

      return { id: recipient, name };
    });

    const messages = conversation.messages.map((message) => {
      const contact = contacts.find((contact) => {
        return contact.id === message.sender;
      });

      const name = (contact && contact.name) || message.sender;
      const fromMe = id === message.sender;

      return { ...message, senderName: name, fromMe };
    });

    const selected = index === selectedConversationIndex;
    return { ...conversation, messages, recipients, selected };
  });

  const value = {
    conversations: formattedConversations,
    createConversation,
    selectConversationIndex: setSelectedConversationIndex,
    selectedConversation: formattedConversations[selectedConversationIndex],
    sendMessage,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
}

function arrayEquality(a, b) {
  if (a.length !== b.length) return false;

  a.sort();
  b.sort();

  return a.every((element, index) => {
    return element === b[index];
  });
}
