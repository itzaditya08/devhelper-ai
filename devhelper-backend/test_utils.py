# test_utils.py

from app.core.utils import unzip_file, get_all_code_files, read_file_content
import os

# Paths
zip_file_path = "test_codebase.zip"
unzip_target_folder = "temp/unzipped"

# ✅ Step 1: Unzip the File
print("🔧 Unzipping file...")
extracted_files = unzip_file(zip_file_path, unzip_target_folder)
print(f"✅ Extracted {len(extracted_files)} files.")
print("\n".join(extracted_files))

# ✅ Step 2: Get All Code Files
print("\n🔍 Getting all code files...")
code_files = get_all_code_files(unzip_target_folder)
print(f"✅ Found {len(code_files)} code files.")
print("\n".join(code_files))

# ✅ Step 3: Read and Print First 200 Characters of Each
print("\n📖 Reading content of each code file:\n")
for path in code_files:
    content = read_file_content(path)
    print(f"📄 {os.path.basename(path)}")
    print(content[:200])
    print("-" * 40)
