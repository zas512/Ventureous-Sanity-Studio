import {TriangleAlert} from 'lucide-react'
import {DynamicIcon, type dynamicIconImports} from 'lucide-react/dynamic'
import type {PreviewProps} from 'sanity'

type IconName = keyof typeof dynamicIconImports

export function LucideIconPreview(
  props: PreviewProps & {
    icon?: string
  },
) {
  const {icon, renderDefault} = props

  return renderDefault({
    ...props,
    media: icon ? (
      <DynamicIcon name={icon as IconName} fallback={() => <TriangleAlert size={24} />} size={24} />
    ) : (
      props.media
    ),
  })
}
