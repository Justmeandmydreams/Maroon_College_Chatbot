const API_URL = "https://maroon-chatbot-backend.azurewebsites.net/chat";

function addMessage(message, sender) {
    const chatBox = document.getElementById("chat-box");

    const messageDiv = document.createElement("div");
    messageDiv.className = sender === "user" ? "user-message" : "bot-message";
    messageDiv.textContent = message;

    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function sendMessage() {
    const input = document.getElementById("user-input");
    const message = input.value.trim();

    if (!message) return;

    addMessage(message, "user");
    input.value = "";

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message })
        });

        const data = await response.json();
        addMessage(data.reply, "bot");

    } catch (error) {
        addMessage(
            "Maroon is currently unavailable. Please try again later.",
            "bot"
        );
    }
}

function sendQuickQuestion(question) {
    document.getElementById("user-input").value = question;
    sendMessage();
}