import pywebcopy
import os

# URL of the website to copy
url = "https://ui.shadcn.com/blocks"

# Directory to save the copied website
directory = os.path.join(os.getcwd(), "copied_website")

# Copy the website
pywebcopy.save_website(url, directory)
