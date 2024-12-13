import json
import os
from chromadb import Client, Settings
from chromadb.config import Settings

def load_json_file(file_path):
    with open(file_path, 'r') as f:
        return json.load(f)

def init_vector_db():
    # Initialize ChromaDB client
    client = Client(Settings(
        persist_directory="vectordb/storage",
        is_persistent=True
    ))
    
    # Get existing collection or create new one
    collection_name = "shadcn_themes"
    try:
        theme_collection = client.get_collection(
            name=collection_name
        )
        print(f"Using existing collection: {collection_name}")
    except Exception:
        theme_collection = client.create_collection(
            name=collection_name,
            metadata={"description": "shadcn-ui theme variables and components"}
        )
        print(f"Created new collection: {collection_name}")
    
    return client, theme_collection

def add_theme_data(collection, theme_name, theme_data, components_data):
    # Process Tailwind variables
    documents = []
    metadatas = []
    ids = []
    
    # Add theme variables (handling list structure)
    for var_obj in theme_data:
        if isinstance(var_obj, dict):
            category = var_obj.get('category', '')
            variables = var_obj.get('variables', {})
            
            for var_name, var_value in variables.items():
                doc_id = f"theme_var_{category}_{var_name}"
                documents.append(json.dumps({
                    "category": category,
                    "variable": var_name,
                    "value": var_value
                }))
                metadatas.append({
                    "type": "theme_variable",
                    "theme": theme_name,
                    "category": category
                })
                ids.append(doc_id)
    
    # Add component data (handling list structure)
    for component_obj in components_data:
        if isinstance(component_obj, dict):
            component_name = component_obj.get('name', '')
            doc_id = f"component_{component_name}"
            documents.append(json.dumps(component_obj))
            metadatas.append({
                "type": "component",
                "theme": theme_name,
                "component_name": component_name
            })
            ids.append(doc_id)
    
    # Add to collection
    if documents:
        collection.add(
            documents=documents,
            metadatas=metadatas,
            ids=ids
        )
        print(f"Added {len(documents)} documents to the collection")

def main():
    # Load theme data
    tailwind_vars = load_json_file("library/tailwind_var.json")
    shadcn_components = load_json_file("library/components/next/shadcn/shadcn.json")
    
    # Initialize vector database
    client, theme_collection = init_vector_db()
    
    # Add New York Zinc theme data
    add_theme_data(
        theme_collection,
        "new-york-zinc",
        tailwind_vars,
        shadcn_components
    )
    
    print("Vector database initialized and populated with New York Zinc theme data")

if __name__ == "__main__":
    main() 