import { useState, useEffect } from 'react'

import './TextBlurb.css'

type ExpandableText = {
  text: string;
  cutoff: number; // character cuttoff
}

enum Expandable {
  Expanded,
  NotExpanded,
  NotExpandable, // text doesn't need to be expanded
}

const ExpandableText = ({ text, cutoff }: ExpandableText) => {
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
      return <p>{displayText}<span onClick={() => setExpand(Expandable.NotExpanded)}>Show Less</span></p>
    case Expandable.NotExpanded:
      return <p>{displayText}<span onClick={() => setExpand(Expandable.Expanded)}>Show More</span></p>
    case Expandable.NotExpandable:
      return <p>{displayText}</p>
  } 
}

export default ExpandableText;