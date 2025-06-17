import google.generativeai as genai
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

api_key = os.getenv("GOOGLE_API_KEY")
if not api_key:
    print("Error: GOOGLE_API_KEY not found in environment variables.")
    exit() # Exit if no API key

genai.configure(api_key=api_key)

print("Listing available Gemini models and their supported methods:")
try:
    for m in genai.list_models():
        print(f"Name: {m.name}, Supported Methods: {m.supported_generation_methods}")
except Exception as e:
    print(f"An error occurred while listing models: {e}")
