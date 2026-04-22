import { type SchemaTypeDefinition } from 'sanity'
import { projectType } from './project'
import { serviceType } from './service'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType, serviceType],
}
