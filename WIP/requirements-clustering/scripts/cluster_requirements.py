#!/usr/bin/env python3
"""
Requirement Clustering and Visualization Script

This script processes business requirements, groups similar ones into clusters,
and visualizes the results using OpenAI embeddings and K-Means clustering.

Features:
- Embedding Generation: Converts requirements into vector embeddings
- Clustering: Groups similar requirements using K-Means
- Visualization: 2D scatter plot + JSON groupings

Author: Based on work by Josip Domazet
License: Educational use
"""

import os
import json
import numpy as np
from dotenv import load_dotenv
import openai
from openai import OpenAI
from pinecone import Pinecone, ServerlessSpec
from sklearn.cluster import KMeans
from sklearn.manifold import TSNE
import matplotlib.pyplot as plt

# Load environment variables
load_dotenv()


def initialize_openai():
    """Initialize OpenAI API with key from environment."""
    openai_api_key = os.getenv("OPENAI_API_KEY")
    if not openai_api_key:
        raise ValueError(
            "OpenAI API key not found. Please set OPENAI_API_KEY in the .env file."
        )
    return OpenAI(api_key=openai_api_key)


def get_requirements():
    """
    Load requirements list.

    In production, this would load from a JSON/Markdown file.
    Returns EarlyBird requirements as example.
    """
    return [
        "The system must guarantee breakfast delivery in less than 25 minutes to all parts of the city.",
        "The system must allow offering prepackaged breakfasts like mini-breakfast, luxury breakfast, etc.",
        "Customers must be able to assemble individual breakfasts from simple products.",
        "Prepackaged products may contain simple products or other prepackaged products.",
        "Typical orders must consist of various amounts of prepackaged and/or simple products.",
        "Each product must have associated attributes: unit (e.g., grams) and price (in Euros).",
        "Customers must be able to place orders only over the phone.",
        "Customers must call the company number and provide their customer number.",
        "The system must validate customer numbers based on their format (area code, digits, checksum).",
        "The system must not allow collective orders from several customers.",
        "The system must authenticate customers, including a check for blacklisted customers.",
        "Customers must be able to add products directly to the shopping cart by naming them.",
        "Customers must be able to request suitable product recommendations based on specified criteria (e.g., calorie count and price).",
        "Customers must be able to use a previous order as a blueprint for a new order.",
        "The system must allow combining multiple methods of assembling a shopping cart within a single order but restrict each order to one blueprint at most.",
        "An order must be able to serve as a blueprint many times.",
        "The system must store one predefined address per customer for delivery.",
        "Packing clerks must be able to assemble orders based on shopping cart contents.",
        "Packing clerks must be able to print a label for the order containing the packing clerk's name, customer's first name, surname, address, order number, and assigned delivery clerk.",
        "Packing clerks must be able to attach the labels to the paper bags.",
        "Packing clerks must be able to print an invoice showing the label data plus the ordered products, their quantities, and total price.",
        "Packing clerks must ensure each reprinted invoice has a unique copy number.",
        "Delivery clerks must calculate optimal itineraries for delivering multiple orders.",
        "Delivery clerks must print itineraries, take the corresponding bags and invoices, and collect customer signatures for order confirmation.",
        "Delivery clerks must ensure customers sign a copy of the invoice, which is retained by the company, while the customer keeps another copy.",
        "Customers must be able to inquire about the status of an order by providing the order number.",
        "The system must indicate whether the delivery clerk is on the way.",
        "Customers must be able to cancel an order by providing the order number, but only before the order has been assembled.",
        "Canceled orders cannot be undone.",
        "Orders cannot be updated; customers must cancel and place a new order if changes are needed.",
        "The system must be web-based, automating all current processes, replacing phone ordering.",
        "The system must replace text processing systems for labeling.",
        "The system must replace spreadsheet tools for itinerary calculation.",
        "The application must support the following browsers (specific versions to be defined).",
        "The user groups are customers, packing clerks, delivery clerks, and managers.",
        "Customers must confirm deliveries via browser on a smartphone by entering a password.",
        "The application must provide a browser-based, unauthenticated product search feature.",
        "Customers must be able to place orders via text message using a predefined string format including customer number, password, product codes, and quantities.",
        "Each product must have a unique product code for SMS orders.",
        "The system must handle SMS orders within the limitations of text message length.",
        "The system must respond to SMS orders with a text message containing the assigned order number.",
        "Customers must be able to cancel orders via text message by providing the order number in a predefined format.",
        "The system must generate and transfer payment records to the existing payment system upon order assembly.",
        "Payment records must include customer number, order number, total amount in Euros, and expected payment date.",
        "The system must automatically generate and print a nightly business report for managers, detailing orders of the day, products, amounts, packing clerks, delivery clerks, customers, addresses, and order numbers."
    ]


def get_embeddings(oai, requirements):
    """
    Generate or load embeddings for requirements.

    Uses text-embedding-ada-002 model (1536 dimensions).
    Caches embeddings to avoid repeated API calls.
    """
    embeddings_file = '../output/embeddings.txt'

    if os.path.exists(embeddings_file):
        print("✓ Embeddings file found. Loading from cache...")
        with open(embeddings_file, 'r') as f:
            return [json.loads(line.strip()) for line in f.readlines()]

    print("⚙ Generating embeddings (this may take a minute)...")
    embeddings = []

    for i, req in enumerate(requirements, 1):
        print(f"  [{i}/{len(requirements)}] Embedding requirement...")
        response = oai.embeddings.create(
            model="text-embedding-ada-002",
            input=req
        )
        embeddings.append(response.data[0].embedding)

    # Save embeddings to cache
    os.makedirs(os.path.dirname(embeddings_file), exist_ok=True)
    with open(embeddings_file, 'w') as f:
        for emb in embeddings:
            f.write(f'{json.dumps(emb)}\n')

    print(f"✓ Embeddings saved to {embeddings_file}")
    return embeddings


def setup_pinecone():
    """
    Initialize Pinecone vector database (optional).

    Returns Pinecone index for storing/querying embeddings.
    Note: Pinecone is optional - clustering works without it.
    """
    print("⚙ Setting up Pinecone...")
    pinecone_api_key = os.getenv("PINECONE_API_KEY")

    if not pinecone_api_key:
        print("⚠ Pinecone API key not found. Skipping Pinecone setup.")
        return None

    pc = Pinecone(api_key=pinecone_api_key)
    index_name = "earlybird-requirements"

    if index_name not in [index.name for index in pc.list_indexes()]:
        pc.create_index(
            name=index_name,
            dimension=1536,
            metric="cosine",
            spec=ServerlessSpec(cloud="aws", region="us-east-1")
        )

    return pc.Index(index_name)


def upsert_embeddings_to_pinecone(index, embeddings):
    """Store embeddings in Pinecone for later querying."""
    if index is None:
        return

    print("⚙ Upserting embeddings to Pinecone...")
    for i, embedding in enumerate(embeddings):
        index.upsert([(f"requirement-{i}", embedding)])
    print("✓ Embeddings upserted to Pinecone")


def cluster_embeddings(embeddings, requirements, num_clusters=12):
    """
    Cluster embeddings using K-Means.

    Args:
        embeddings: List of 1536-dim vectors
        requirements: Original requirement texts
        num_clusters: Number of clusters (microservices)

    Returns:
        Array of cluster assignments (0 to num_clusters-1)
    """
    print(f"⚙ Clustering {len(requirements)} requirements into {num_clusters} clusters...")

    kmeans = KMeans(n_clusters=num_clusters, random_state=42, n_init=10)
    clusters = kmeans.fit_predict(embeddings)

    # Print cluster preview
    print("\n📊 Cluster Preview:")
    for cluster_id in range(num_clusters):
        count = sum(1 for label in clusters if label == cluster_id)
        print(f"  Cluster {cluster_id}: {count} requirements")

    print()
    return clusters


def save_clusters_to_file(clusters, requirements, num_clusters):
    """Save clustered requirements to JSON file."""
    output_file = "../output/clusters.json"
    print(f"💾 Saving clusters to {output_file}...")

    output = {
        f"Cluster {i}": [
            requirements[j] for j, label in enumerate(clusters) if label == i
        ]
        for i in range(num_clusters)
    }

    os.makedirs(os.path.dirname(output_file), exist_ok=True)
    with open(output_file, "w") as f:
        json.dump(output, f, indent=2)

    print("✓ Clusters saved")


def visualize_embeddings(embeddings, clusters):
    """
    Create 2D visualization of clusters using t-SNE.

    Reduces 1536-dim embeddings to 2D for plotting.
    """
    print("📈 Visualizing clusters with t-SNE...")

    embeddings_array = np.array(embeddings)

    if len(embeddings_array.shape) != 2:
        raise ValueError(
            f"Expected 2D array, got shape {embeddings_array.shape}"
        )

    if len(embeddings_array) != len(clusters):
        raise ValueError(
            f"Mismatch: {len(embeddings_array)} embeddings "
            f"vs {len(clusters)} clusters"
        )

    # t-SNE dimensionality reduction
    n_samples = embeddings_array.shape[0]
    perplexity = min(30, n_samples - 1)

    tsne = TSNE(n_components=2, random_state=42, perplexity=perplexity)
    reduced_embeddings = tsne.fit_transform(embeddings_array)

    # Define colors
    cluster_ids = np.unique(clusters)
    colors = [
        'red', 'blue', 'green', 'orange', 'purple', 'yellow',
        'cyan', 'magenta', 'lime', 'pink', 'brown', 'gray'
    ]

    if len(cluster_ids) > len(colors):
        raise ValueError("Need more colors for cluster count")

    color_map = {cluster_id: colors[i] for i, cluster_id in enumerate(cluster_ids)}
    cluster_colors = [color_map[cluster] for cluster in clusters]

    # Create scatter plot
    plt.figure(figsize=(12, 8))
    plt.scatter(
        reduced_embeddings[:, 0],
        reduced_embeddings[:, 1],
        c=cluster_colors,
        s=100,
        alpha=0.6
    )

    # Legend
    legend_labels = [f"Cluster {cid}" for cid in cluster_ids]
    handles = [
        plt.Line2D([0], [0], marker='o', color=color_map[cid],
                   markersize=10, linestyle='')
        for cid in cluster_ids
    ]

    plt.legend(
        handles, legend_labels, title="Clusters",
        loc="upper left", bbox_to_anchor=(1.05, 1), borderaxespad=0
    )

    plt.title("Requirement Clusters (t-SNE Visualization)", fontsize=16)
    plt.xlabel("Dimension 1 (Reduced)")
    plt.ylabel("Dimension 2 (Reduced)")

    plt.figtext(
        0.5, -0.05,
        "This diagram visualizes semantic similarity of requirements. "
        "Points close together belong to the same domain/microservice.",
        wrap=True, horizontalalignment='center', fontsize=10
    )

    plt.tight_layout()
    output_file = '../output/clusters.png'
    plt.savefig(output_file, dpi=150, bbox_inches='tight')
    print(f"✓ Visualization saved to {output_file}")
    plt.show()


def main():
    """Main orchestration function."""
    print("=" * 60)
    print("  Requirement Clustering & Microservice Architecture")
    print("=" * 60)
    print()

    # Step 1: Initialize OpenAI
    oai = initialize_openai()

    # Step 2: Load requirements
    requirements = get_requirements()
    print(f"📋 Loaded {len(requirements)} requirements\n")

    # Step 3: Generate/load embeddings
    embeddings = get_embeddings(oai, requirements)

    # Step 4: Optional Pinecone setup
    pinecone_index = setup_pinecone()
    if pinecone_index:
        upsert_embeddings_to_pinecone(pinecone_index, embeddings)

    # Step 5: Cluster requirements
    num_clusters = 12  # Adjust based on your needs
    clusters = cluster_embeddings(embeddings, requirements, num_clusters)

    # Step 6: Save results
    save_clusters_to_file(clusters, requirements, num_clusters)

    # Step 7: Visualize
    visualize_embeddings(embeddings, clusters)

    print()
    print("=" * 60)
    print("✅ Clustering complete!")
    print("=" * 60)
    print()
    print("Next steps:")
    print("1. Review output/clusters.json - do clusters make sense?")
    print("2. Name each cluster (e.g., 'Order Management', 'Product Catalog')")
    print("3. Write ARCHITECTURE.md for each cluster")
    print("4. Define interfaces between clusters")
    print()


if __name__ == "__main__":
    main()
