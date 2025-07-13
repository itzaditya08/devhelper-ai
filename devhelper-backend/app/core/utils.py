# app/core/utils.py

import os
import zipfile
from fastapi import UploadFile
from typing import List, Dict

def save_upload_file_to_disk(upload_file: UploadFile, destination_folder: str) -> str:
    """
    Saves the uploaded file to the destination folder.
    Returns the absolute path to the saved file.
    """
    os.makedirs(destination_folder, exist_ok=True)
    file_path = os.path.join(destination_folder, upload_file.filename)

    with open(file_path, "wb") as buffer:
        buffer.write(upload_file.file.read())

    return file_path


def unzip_file(zip_path: str, extract_to: str) -> List[str]:
    """
    Unzips a .zip file into the given directory.
    Returns a list of all extracted file paths.
    """
    extracted_files = []

    with zipfile.ZipFile(zip_path, "r") as zip_ref:
        zip_ref.extractall(extract_to)
        extracted_files = zip_ref.namelist()

    return [os.path.join(extract_to, f) for f in extracted_files]


def load_code_files(folder_path: str, extensions: List[str] = None) -> List[Dict[str, str]]:
    """
    Loads all code files in the folder and returns a list of dicts with filename and content.
    """
    file_paths = get_all_code_files(folder_path, extensions)
    loaded_files = []

    for path in file_paths:
        try:
            with open(path, "r", encoding="utf-8") as f:
                content = f.read()
                relative_path = os.path.relpath(path, folder_path)
                loaded_files.append({"file_name": relative_path, "content": content})
        except Exception as e:
            print(f"❌ Skipped file {path} due to error: {e}")

    return loaded_files



def get_all_code_files(folder_path: str, extensions: List[str] = None) -> List[str]:
    """
    Recursively scans a folder and returns all code file paths with given extensions.
    """
    if extensions is None:
        extensions = [".py", ".js", ".ts", ".java", ".cpp", ".c", ".html", ".css", ".json", ".md"]

    code_files = []

    for root, _, files in os.walk(folder_path):
        for file in files:
            if any(file.endswith(ext) for ext in extensions):
                code_files.append(os.path.join(root, file))

    return code_files


def read_file_content(file_path: str) -> str:
    """
    Reads and returns the content of a text file.
    If the file cannot be decoded, it skips it gracefully.
    """
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            return f.read()
    except Exception as e:
        print(f"⚠️  Could not read file {file_path}: {e}")
        return ""
