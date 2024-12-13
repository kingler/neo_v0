import os
import json
from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings
from langchain.schema import Document

def load_json_file(file_path):
    with open(file_path, 'r') as f:
        return json.load(f)

def init_vector_db():
    # Initialize embeddings
    embeddings = OpenAIEmbeddings()
    
    # Initialize Chroma vector store
    persist_directory = "vectordb/storage"
    
    # Create directories if they don't exist
    os.makedirs(persist_directory, exist_ok=True)
    
    # Initialize vector store
    vectorstore = Chroma(
        persist_directory=persist_directory,
        embedding_function=embeddings
    )
    
    return vectorstore

def add_theme_to_vectordb(vectorstore, theme_path):
    theme_data = load_json_file(theme_path)
    
    # Create document for the theme
    theme_doc = Document(
        page_content=json.dumps(theme_data["theme"]),
        metadata={
            "type": "theme",
            "name": theme_data["theme"]["name"],
            "version": theme_data["theme"]["version"],
            **theme_data["metadata"]
        }
    )
    
    # Add to vector store
    vectorstore.add_documents([theme_doc])
    vectorstore.persist()

def add_components_to_vectordb(vectorstore, components_path):
    components_data = load_json_file(components_path)
    
    documents = []
    for component_name, component_data in components_data.items():
        doc = Document(
            page_content=json.dumps(component_data),
            metadata={
                "type": "component",
                "name": component_name
            }
        )
        documents.append(doc)
    
    # Add to vector store
    vectorstore.add_documents(documents)
    vectorstore.persist()

def main():
    print("Initializing vector database...")
    vectorstore = init_vector_db()
    
    # Add New York Zinc theme
    print("Adding New York Zinc theme...")
    add_theme_to_vectordb(vectorstore, "vectordb/collections/themes/new-york-zinc.json")
    
    # Add shadcn components
    print("Adding shadcn components...")
    add_components_to_vectordb(vectorstore, "library/components/next/shadcn/shadcn.json")
    
    print("Vector database initialization complete!")

if __name__ == "__main__":
    main() 