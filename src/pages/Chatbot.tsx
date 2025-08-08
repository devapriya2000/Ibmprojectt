import React, { useState } from "react";

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "You", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      });

      const data = await response.json();
      const botReply = data.reply || "No reply";

      setMessages((prev) => [...prev, { sender: "Bot", text: botReply }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [...prev, { sender: "Bot", text: "Error getting reply" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.chatContainer}>
      <h2 style={styles.title}>💬 Chat with Bot</h2>
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              ...(msg.sender === "You" ? styles.userMessage : styles.botMessage),
            }}
          >
            <strong>{msg.sender}</strong>
            <p style={styles.text}>{msg.text}</p>
          </div>
        ))}
      </div>
      <div style={styles.inputArea}>
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} disabled={loading} style={styles.button}>
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
};

// ✅ Clean, modern CSS-in-JS styles
const styles: { [key: string]: React.CSSProperties } = {
  chatContainer: {
    maxWidth: "500px",
    margin: "50px auto",
    background: "#f5f7fa",
    borderRadius: "10px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    overflow: "hidden",
    fontFamily: "Segoe UI, sans-serif",
  },
  title: {
    margin: 0,
    padding: "15px",
    background: "#4f46e5",
    color: "#fff",
    fontSize: "18px",
    textAlign: "center",
  },
  chatBox: {
    padding: "15px",
    height: "350px",
    overflowY: "auto",
    background: "#ffffff",
  },
  message: {
    marginBottom: "15px",
    padding: "10px 15px",
    borderRadius: "10px",
    maxWidth: "80%",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    wordWrap: "break-word",
  },
  userMessage: {
    backgroundColor: "#e0f7fa",
    alignSelf: "flex-end",
    marginLeft: "auto",
  },
  botMessage: {
    backgroundColor: "#e8eaf6",
    alignSelf: "flex-start",
    marginRight: "auto",
  },
  text: {
    margin: "5px 0 0",
  },
  inputArea: {
    display: "flex",
    borderTop: "1px solid #ddd",
    background: "#f9f9f9",
    padding: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
    marginRight: "10px",
  },
  button: {
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    fontSize: "16px",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
};

export default Chatbot;
