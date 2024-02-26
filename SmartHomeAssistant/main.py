import os
import whisper
import speech_recognition as sr
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()

# Initialize recognizer and Whisper model
r = sr.Recognizer()
whisper_model = whisper.load_model("tiny")

# Configure Google API for LLM
genai.configure(api_key=os.environ.get("GOOGLE_API_KEY"))
llm_model = genai.GenerativeModel("gemini-pro")
conversation = llm_model.start_chat(history=[])

while True:
    with sr.Microphone() as source:
        print("Ask Bard:")
        try:
            audio = r.listen(source, timeout=5)
        except sr.WaitTimeoutError:
            print("Listening timed out while waiting for phrase to start")
            continue  # Skip to the next iteration if user doesn't start speaking

    print("Processing speech to text...")

    # Save local audio
    with open("microphone.wav", "wb") as f:
        f.write(audio.get_wav_data())

    # Transcribe the spoken words from the user
    result = whisper_model.transcribe("microphone.wav")
    print(f'Asking Bard: "{result["text"]}"')

    # Generate response from LLM
    response = conversation.send_message(result["text"])
    print(conversation.last.text)
