import React, { useState } from 'react';
import { SafeAreaView, TextInput, Button, Text, ScrollView, View } from 'react-native';

export default function App() {
  const [messages, setMessages] = useState([{ role: 'ai', content: '🙏 नमस्कार! मी Radhe AI आहे. काहीही विचारा.' }]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');

    try {
      const res = await fetch('http://your_backend_url/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [userMessage] })
      });
      const data = await res.json();
      const botReply = data.choices[0].message;
      setMessages(prev => [...prev, botReply]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', content: 'त्रुटी: सर्व्हरशी संपर्क नाही.' }]);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <ScrollView style={{ flex: 1 }}>
        {messages.map((msg, idx) => (
          <Text key={idx} style={{ marginVertical: 5, color: msg.role === 'user' ? 'blue' : 'green' }}>
            {msg.role === 'user' ? 'तुम्ही:' : 'Radhe AI:'} {msg.content}
          </Text>
        ))}
      </ScrollView>
      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="तुमचा प्रश्न लिहा..."
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Button title="पाठवा" onPress={sendMessage} />
    </SafeAreaView>
  );
}
