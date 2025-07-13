from sentence_transformers import SentenceTransformer
from typing import List

# Load the model only once (you can move this to a class if needed)
model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")


def embed_texts(texts: List[str]) -> List[List[float]]:
    """
    Embed a list of texts using the locally loaded SentenceTransformer model.
    
    Args:
        texts (List[str]): List of input texts.

    Returns:
        List[List[float]]: Corresponding list of embeddings.
    """
    embeddings = model.encode(texts)
    return embeddings


def embed_query(query: str) -> List[float]:
    """
    Embed a single query text.

    Args:
        query (str): Input text.

    Returns:
        List[float]: Embedding vector for the input.
    """
    return embed_texts([query])[0]
