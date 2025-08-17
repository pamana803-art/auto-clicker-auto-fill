// utils/processDocuments.js
import { getCollection } from 'astro:content'

export async function processDocsForRAG() {
  const docs = await getCollection('docs')

  return docs.map((doc) => ({
    id: doc.id,
    title: doc.data.title,
    content: doc.body,
    metadata: {
      description: doc.data.description,
      tags: doc.data.tags || [],
      url: `/docs/${doc.slug}`
    }
  }))
}
