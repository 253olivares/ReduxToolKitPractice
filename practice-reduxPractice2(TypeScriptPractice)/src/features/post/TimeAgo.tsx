import {parseISO, formatDistanceToNow, formatDistance} from 'date-fns'

import React from 'react'

const TimeAgo = ({timestamp}: {timestamp:string}) => {

    let timeAgo:string ='';

    if(timestamp) {
        const date: Date = parseISO(timestamp);
        const timePeroid:string = formatDistanceToNow(date);
        timeAgo =`${timePeroid} ago`

    }

  return (
    <span title='timestamp'>
        &nbsp; <i>{timeAgo}</i>
    </span>
  )
}

export default TimeAgo