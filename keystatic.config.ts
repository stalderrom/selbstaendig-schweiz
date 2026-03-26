import { config, collection, fields } from '@keystatic/core'

const CATEGORY_OPTIONS = [
  { label: 'Allgemein', value: 'allgemein' },
  { label: 'Selbständig machen / Gründung', value: 'selbstaendig-machen-gruendung' },
  { label: 'Steuern', value: 'steuern' },
  { label: 'Versicherungen', value: 'versicherungen' },
  { label: 'Buchhaltung & Finanzen', value: 'buchhaltung-und-finanzen' },
  { label: 'Marketing & Kundenakquise', value: 'marketing-und-kundenakquise' },
  { label: 'Tools & Software', value: 'tools-und-software' },
  { label: 'Berufsratgeber', value: 'berufsratgeber' },
  { label: 'Einkommen & Geschäftsmodelle', value: 'einkommen-und-geschaeftsmodelle' },
]

export default config({
  storage: { kind: 'local' },

  collections: {
    articles: collection({
      label: 'Artikel',
      slugField: 'title',
      path: 'content/articles/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Titel' } }),
        metaTitle: fields.text({ label: 'Meta Title (SEO)', validation: { isRequired: false } }),
        description: fields.text({
          label: 'Meta Description (SEO)',
          multiline: true,
        }),
        keywords: fields.array(
          fields.text({ label: 'Keyword' }),
          { label: 'Keywords', itemLabel: (props) => props.value || 'Keyword' }
        ),
        category: fields.select({
          label: 'Kategorie',
          options: CATEGORY_OPTIONS,
          defaultValue: 'allgemein',
        }),
        author: fields.text({ label: 'Autor', defaultValue: 'Redaktion' }),
        publishedAt: fields.date({ label: 'Veröffentlicht am' }),
        updatedAt: fields.date({ label: 'Aktualisiert am' }),
        published: fields.checkbox({
          label: 'Veröffentlicht',
          description: 'Artikel auf der Website anzeigen',
          defaultValue: true,
        }),
        featuredImage: fields.image({
          label: 'Beitragsbild',
          directory: 'public/images/articles',
          publicPath: '/images/articles/',
        }),
        // Existing frontmatter fields that Keystatic should preserve but not edit
        slug: fields.ignored(),
        faq: fields.ignored(),
        howto: fields.ignored(),
        related: fields.ignored(),
        content: fields.mdx({
          label: 'Inhalt',
          extension: 'md',
          options: {
            image: {
              directory: 'public/images/articles',
              publicPath: '/images/articles/',
            },
          },
        }),
      },
    }),
  },
})
