import whisper

import speech_recognition as sr


r = sr.Recognizer()
model = whisper.load_model("tiny")

while True:
    with sr.Microphone() as source:
        print("Say something!")

        # Adjust the listening timeout and phrase time limit for faster response
        audio = r.listen(source, timeout=2.5)  # Adjust these values as needed

    print("Processing...")

    # Save the audio to a file
    with open("microphone.wav", "wb") as f:
        f.write(audio.get_wav_data())

    # Transcribe the audio file
    result = model.transcribe("microphone.wav")
    print(result["text"])
