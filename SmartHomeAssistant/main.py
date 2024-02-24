import whisper
import speech_recognition as sr


r = sr.Recognizer()
model = whisper.load_model('medium')

while True:
    with sr.Microphone() as source:
        print("Say something!")
        audio = r.listen(source)

    print("Processing...")

    with open("microphone.wav", "wb") as f:
        f.write(audio.get_wav_data())

    result = model.transcribe("microphone.wav")
    print(result['text'])
