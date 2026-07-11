import {Autocomplete, Box, Card, Flex, Text} from '@sanity/ui'
import {TriangleAlert} from 'lucide-react'
import {DynamicIcon, dynamicIconImports} from 'lucide-react/dynamic'
import {useCallback, useMemo, useState} from 'react'
import {set, unset, type StringInputProps} from 'sanity'

type IconName = keyof typeof dynamicIconImports

const iconNames = Object.keys(dynamicIconImports) as IconName[]

const iconOptions = iconNames.map((name) => ({
  value: name,
  label: name,
}))

function IconPreview({name, size = 20}: {name?: string; size?: number}) {
  if (!name) {
    return (
      <Text muted size={1}>
        ?
      </Text>
    )
  }

  return (
    <DynamicIcon
      name={name as IconName}
      fallback={() => <TriangleAlert size={size} />}
      size={size}
    />
  )
}

export function LucideIconInput(props: StringInputProps) {
  const {value, onChange, readOnly} = props
  const [query, setQuery] = useState('')

  const filteredOptions = useMemo(() => {
    if (!query.trim()) {
      return iconOptions.slice(0, 200)
    }

    const normalizedQuery = query.toLowerCase()
    return iconOptions.filter((option) => option.value.includes(normalizedQuery)).slice(0, 100)
  }, [query])

  const selectedOption = useMemo(
    () => (value ? iconOptions.find((option) => option.value === value) : undefined),
    [value],
  )

  const handleChange = useCallback(
    (nextValue: string | null) => {
      onChange(nextValue ? set(nextValue) : unset())
    },
    [onChange],
  )

  const renderOption = useCallback(
    (option: {value: string; label: string}) => (
      <Card as="button" padding={2} radius={2} tone="inherit">
        <Flex align="center" gap={3}>
          <Box style={{display: 'flex', alignItems: 'center'}}>
            <IconPreview name={option.value} size={18} />
          </Box>
          <Text size={1} weight="medium">
            {option.label}
          </Text>
        </Flex>
      </Card>
    ),
    [],
  )

  if (value && selectedOption && !query) {
    return (
      <Card border padding={3} radius={2} tone="default">
        <Flex align="center" gap={3} justify="space-between">
          <Flex align="center" gap={3}>
            <IconPreview name={value} />
            <Text size={1} weight="medium">
              {value}
            </Text>
          </Flex>
          {!readOnly && (
            <Text
              as="button"
              muted
              onClick={() => handleChange(null)}
              size={1}
              style={{cursor: 'pointer'}}
            >
              Clear
            </Text>
          )}
        </Flex>
      </Card>
    )
  }

  return (
    <Autocomplete
      autoFocus={Boolean(value && !selectedOption)}
      disabled={readOnly}
      id="lucide-icon-picker"
      onChange={handleChange}
      onQueryChange={(nextQuery) => setQuery(nextQuery ?? '')}
      openButton
      options={filteredOptions}
      placeholder={value ? 'Replace icon...' : 'Search for an icon...'}
      renderOption={renderOption}
      value={selectedOption?.value}
    />
  )
}
