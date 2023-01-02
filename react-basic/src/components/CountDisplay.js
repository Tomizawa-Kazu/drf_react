import React from 'react'

const CountDisplay = ({name, count}) => {
  console.log(`Display ${name}`)
  return (
    <div>
      {count}
    </div>
  )
}

export default React.memo(CountDisplay)