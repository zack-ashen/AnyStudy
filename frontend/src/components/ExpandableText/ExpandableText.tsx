import { useState, useEffect } from 'react'

import './ExpandableText.css'

type ExpandableTextProps = {
  text: string;
  cutoff: number; // character cuttoff
  style:React.CSSProperties;
}

enum Expandable {
  Expanded,
  NotExpanded,
  NotExpandable, // text doesn't need to be expanded
}

const ExpandableText = ({ text, cutoff, style }: ExpandableTextProps) => {
  const [displayText, setDisplayText] = useState<string>(text);
  const [expand, setExpand] = useState<Expandable>(Expandable.NotExpanded);

  useEffect(() => {
    if (expand === Expandable.Expanded || expand === Expandable.NotExpandable) {
      setDisplayText(text);
    } else {
      const textList = displayText.split("");
      if (textList.length > cutoff) {
        let ind = cutoff--;
        for (let i = 0; i < cutoff; i++) {
          if (textList[i] === ".") {
            ind = i;
          }
        }
        setDisplayText((textList.slice(0, ind++).join("")) + "...");
      } else {
        setExpand(Expandable.NotExpandable)
      }
    }
  }, [expand])

  switch (expand) {
    case Expandable.Expanded:
      return (
        <p style={style}>
          {displayText}  
          <span className="expandLink" onClick={() => setExpand(Expandable.NotExpanded)}>Show Less</span>
        </p>
      )
    case Expandable.NotExpanded:
      return (
        <p style={style}>
          {displayText}
          <span className="expandLink" onClick={() => setExpand(Expandable.Expanded)}>Show More</span>
        </p>
      )
    case Expandable.NotExpandable:
      return <p style={style}>{displayText}</p>
  } 
}

export default ExpandableText;