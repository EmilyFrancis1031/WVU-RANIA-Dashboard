import os
import geocoder

import google.generativeai as genai
import speech_recognition as sr
import whisper
from dotenv import load_dotenv
from google.generativeai.types import HarmCategory, HarmBlockThreshold
from langchain_community.tools import DuckDuckGoSearchRun
from datetime import date

# Load environment variables
load_dotenv()

# Get the location based on ip
location = geocoder.ip('me')

# Initialize DuckDuckGo search
search = DuckDuckGoSearchRun()

# Initialize recognizer and Whisper model
r = sr.Recognizer()
whisper_model = whisper.load_model("tiny")

# Configure Google API for LLM
genai.configure(api_key=os.environ.get("GOOGLE_API_KEY"))
llm_model = genai.GenerativeModel("gemini-1.0-pro-latest")
conversation = llm_model.start_chat(history=[])

# while True:
#     with sr.Microphone() as source:
#         r.adjust_for_ambient_noise(source, duration=1)
#         print("Ask Bard:")
#         try:
#             audio = r.listen(source, timeout=5)
#         except sr.WaitTimeoutError:
#             print("Listening timed out while waiting for phrase to start")
#             continue  # Skip to the next iteration if user doesn't start speaking
#
#     print("Processing speech to text...")
#
#     # Save local audio
#     with open("microphone.wav", "wb") as f:
#         f.write(audio.get_wav_data())
#
#     # Transcribe the spoken words from the user
#     result = whisper_model.transcribe("microphone.wav")
#     print(f'Asking Bard: "{result["text"]}"')
#
#     # Generate response from LLM
#     response = conversation.send_message(result["text"])
#     print(conversation.last.text)


while True:
    query = input("Ask bard: ")

    query = f'''
    You will receive a query that you must answer as good as possible.
    Your answer will be based on the current date, location, conversation
    history, and what you know.
    
    The current date is {date.today().strftime('%A, %B %d, %Y')}.
    
    The location is {location.address}.
    
    Here are the results of a DuckDuckGo search: ${search.run(f'{query}')}

    Using what you know and these results respond to the message below.
    If the DuckDuckGo search does not provide enough information you may
    ignore the results and give an answer using other messages from this
    conversation. Do not mention the DuckDuckGo at all in your response
    in any way and respond as concisely as possible while still using
    full sentences.
    
    Format your response as JSON and structure it as shown below:
    {{
        "type": "answer" | "task" | "cancel",
        "response": {{
            "text": "Insert your answer to the query here if the type is set to answer",
        }}
    }}
    
    Set the type to answer if the user is asking you something or chatting conversationally.
    Set the type to task if the user is asking you to perform a task.
    Set the type to cancel if the user no longer wishes to continue the conversation.
    Examples of cancel would be "Nevermind", "Stop", or anything similar.

    Query: ${query}'''

    try:
        # TODO: Adjust permission level. It is currently set to allow all
        response = conversation.send_message(query, stream=True, safety_settings={
            HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_NONE,
            HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_NONE,
            HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_NONE,
            HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_NONE
        })

        # Print out the response as it is retrieved
        for chunk in response:
            print(chunk.text, end='')

        print()
    except Exception as e:
        print(e)
        # TODO: Improve error handling
        print('An unexpected error has occurred. Please try again.')
