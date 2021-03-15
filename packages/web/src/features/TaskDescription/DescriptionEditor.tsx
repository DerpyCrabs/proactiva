import './DescriptionEditor.css'

import Editor from 'rich-markdown-editor'

export default function DescriptionEditor({
  description,
  setDescription,
}: {
  description: string
  setDescription: (d: string) => void
}) {
  const handleChange = (getValue: () => string) => {
    const value = getValue()
    setDescription(value)
  }
  return (
    <Editor
      id='description'
      defaultValue={description}
      onChange={handleChange}
      dark={true}
    />
  )
}
