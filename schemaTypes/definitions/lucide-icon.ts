import {defineType} from 'sanity'
import {LucideIconInput} from '../../components/lucide-icon-input'

export const lucideIcon = defineType({
  title: 'Lucide Icon',
  name: 'lucide-icon',
  type: 'string',
  components: {
    input: LucideIconInput,
  },
})
