import json
import os
from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings
from langchain.schema import Document

# Initialize embeddings
embeddings = OpenAIEmbeddings()

# Create vector database directories if they don't exist
os.makedirs("vectordb/collections/components", exist_ok=True)
os.makedirs("vectordb/collections/themes", exist_ok=True)

# Initialize vector stores
components_store = Chroma(
    collection_name="components",
    embedding_function=embeddings,
    persist_directory="vectordb/collections/components"
)

themes_store = Chroma(
    collection_name="themes",
    embedding_function=embeddings,
    persist_directory="vectordb/collections/themes"
)

# Load shadcn components
with open("library/components/next/shadcn/shadcn.json", "r") as f:
    shadcn_components = json.load(f)

# Load Tailwind variables
with open("library/tailwind_var.json", "r") as f:
    tailwind_vars = json.load(f)

# Process components
component_docs = []
for component_name, component_data in shadcn_components.items():
    metadata = {
        "type": "component",
        "name": component_name,
        "theme": "new-york-zinc",
        "framework": "next.js"
    }
    content = f"Component: {component_name}\n"
    content += f"Description: {component_data.get('description', '')}\n"
    content += f"Props: {json.dumps(component_data.get('props', {}))}\n"
    content += f"Styles: {json.dumps(component_data.get('styles', {}))}\n"
    
    component_docs.append(Document(
        page_content=content,
        metadata=metadata
    ))

# Process Tailwind variables
theme_docs = []
for category, variables in tailwind_vars.items():
    metadata = {
        "type": "theme_variables",
        "category": category,
        "theme": "new-york-zinc",
        "framework": "tailwind"
    }
    content = f"Category: {category}\n"
    content += f"Variables: {json.dumps(variables)}\n"
    
    theme_docs.append(Document(
        page_content=content,
        metadata=metadata
    ))

# Add documents to vector stores
if component_docs:
    components_store.add_documents(component_docs)
    components_store.persist()

if theme_docs:
    themes_store.add_documents(theme_docs)
    themes_store.persist()

print("Vector database initialized with shadcn-ui New York Zinc theme components and Tailwind CSS variables.") 