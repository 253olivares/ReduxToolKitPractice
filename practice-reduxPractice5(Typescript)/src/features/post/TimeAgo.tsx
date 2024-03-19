import {parseISO, formatDistanceToNow, formatDistance} from 'date-fns'

import React from 'react'

// time ago component that takes our time stamp
const TimeAgo = ({timestamp}: {timestamp:string}) => {

  // sets a empty string to start
    let timeAgo:string ='';

    // if we have a timestamp then we import our date fns library that translate our data into readable format
    if(timestamp) {
      // parse
        const date: Date = parseISO(timestamp);
        // formate our date
        const timePeroid:string = formatDistanceToNow(date);
        // create a render
        timeAgo =`${timePeroid} ago`

    }

  return (
    // render our time ago depending on when the todo was created
    <span title='timestamp'>
        &nbsp; <i>{timeAgo}</i>
    </span>
  )
}

export default TimeAgo