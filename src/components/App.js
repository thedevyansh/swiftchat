import { useEffect } from "react";
import Login from "./Login";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Dashboard from "./Dashboard";
import { ContactsProvider } from "../contexts/ContactsProvider";
import { ConversationsProvider } from "../contexts/ConversationsProvider";
import { SocketProvider } from "../contexts/SocketProvider";
import "./App.css";
import { loadModels } from "../sentimentAnalysis/loadmodels";

function App() {
  const [id, setId] = useLocalStorage("id", "");

  useEffect(() => {
    const files = ["business", "job", "medical", "tech", "work"];

    for (let i = 0; i < 5; i++) {
      let jsonValue = localStorage.getItem(files[i]);

      if (jsonValue == null) {
        fetch("../../features/" + files[i] + ".json", {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
          .then((res) => res.json())
          .then((myJson) => {
            localStorage.setItem(files[i], JSON.stringify(myJson));
          });
      }
    }
    loadModels();
  }, []);

  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProvider>
        <ConversationsProvider id={id}>
          <Dashboard id={id} />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  );

  return id ? dashboard : <Login onIdSubmit={setId} />;
}

export default App;
