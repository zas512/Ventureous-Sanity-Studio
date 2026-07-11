import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {markdownSchema} from 'sanity-plugin-markdown'
import {schemaTypes} from './schemaTypes'
import {Logo} from './components/logo'
import {getPresentationUrl} from './utils/helper'
import {locations} from './utils//location'
import {structure} from './utils/structure'
import {presentationTool} from 'sanity/presentation'
import {unsplashImageAsset} from 'sanity-plugin-asset-source-unsplash'
import {media} from 'sanity-plugin-media'
import {presentationUrl} from './plugins/presentation-url'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? ''
const dataset = process.env.SANITY_STUDIO_DATASET ?? 'production'
const title = process.env.SANITY_STUDIO_TITLE

export default defineConfig({
  name: 'default',
  title: title,
  projectId: projectId,
  icon: Logo,
  dataset: dataset,
  releases: {
    enabled: true,
  },
  plugins: [
    presentationTool({
      resolve: {
        locations,
      },
      previewUrl: {
        origin: getPresentationUrl(),
        previewMode: {
          enable: '/api/presentation-draft',
        },
      },
    }),
    structureTool({
      structure,
    }),
    presentationUrl(),
    visionTool(),
    unsplashImageAsset(),
    media(),
    markdownSchema(),
  ],
  document: {
    newDocumentOptions: (prev, {creationContext}) => {
      const {type} = creationContext
      if (type === 'global') {
        return prev.filter(
          (template) =>
            ![
              'homePage',
              'navbar',
              'footer',
              'settings',
              'blogIndex',
              'assist.instruction.context',
              'media.tag',
            ].includes(template?.templateId),
        )
      }
      return prev
    },
  },
  schema: {
    types: schemaTypes,
    templates: [
      {
        id: 'nested-page-template',
        title: 'Nested Page',
        schemaType: 'page',
        value: (props: {slug?: string; title?: string}) => ({
          ...(props.slug ? {slug: {current: props.slug, _type: 'slug'}} : {}),
          ...(props.title ? {title: props.title} : {}),
        }),
        parameters: [
          {
            name: 'slug',
            type: 'string',
          },
        ],
      },
    ],
  },
})
