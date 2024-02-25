import os
import whisper
import speech_recognition as sr
from dotenv import load_dotenv
import google.generativeai as genai


load_dotenv()

r = sr.Recognizer()
whisper_model = whisper.load_model('tiny')

genai.configure(api_key=os.environ.get('GOOGLE_API_KEY'))
llm_model = genai.GenerativeModel('gemini-pro')

while True:
    with sr.Microphone() as source:
        print("Ask bard:")

        # Adjust the listening timeout and phrase time limit for faster response
        audio = r.listen(source, timeout=2.5)  # Adjust these values as needed

    print("Processing speech to text...")

    # Save the audio to a file
    with open("microphone.wav", "wb") as f:
        f.write(audio.get_wav_data())

    result = whisper_model.transcribe("microphone.wav")

    print(f'Asking Bard: "{result["text"]}"')

    response = llm_model.generate_content(result['text'])

    print(response.text)
