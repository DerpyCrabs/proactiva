import Spreadsheet from 'react-spreadsheet'
import { Spreadsheet as SpreadsheetType } from 'common-types'
import React from 'react'

export default function SpreadsheetEditor({
  data,
  setData,
}: {
  data: SpreadsheetType['data']
  setData: (d: SpreadsheetType['data']) => void
}) {
  return (
    <div style={{ overflow: 'scroll', maxHeight: '60vh' }}>
      <Spreadsheet data={data} onChange={setData} />
    </div>
  )
}
