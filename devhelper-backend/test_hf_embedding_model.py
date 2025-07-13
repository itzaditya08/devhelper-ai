from app.llm.hf_local_embedding_model import embed_query

query = "What is the capital of India?"
embedding = embed_query(query)

print("✅ Embedding Vector:")
print(embedding)
print(f"Length of Embedding: {len(embedding)}")
