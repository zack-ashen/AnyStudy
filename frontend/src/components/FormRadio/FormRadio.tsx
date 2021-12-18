import { SetStateAction, useState, Dispatch } from 'react'; 

import './FormRadio.css';

type FormRadioProps = {
  options: string[];
  setSelected: Dispatch<SetStateAction<number>>;
  selected: number;
}

type FormRadioButtonProps = {
  text: string;
  isSelected: boolean;
  index: number;
}

const FormRadio = ({options, setSelected, selected}: FormRadioProps) => {
  // const [selectedIndex, setSelectedIndex] = useState(selected);

  const FormRadioButton = ({text, isSelected, index}: FormRadioButtonProps) => {
    const handleChange = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (selected !== index) {
        setSelected(index);
      }
    }

    return isSelected ? (
      <button className="formRadioSelected" value={text}>{text}</button>
    ) : (
      <button className="formRadioDeselected" value={text} onClick={handleChange}>{text}</button>
    );
  }

  return (
    <div className="FormRadio">
      {options.map((text, index) => index === selected ? 
        (
          <FormRadioButton text={text} isSelected={true} key={index} index={index}/>
        ) 
        : (
          <FormRadioButton text={text} isSelected={false} key={index} index={index}/> 
        ))}
    </div>
  )
}

export default FormRadio;
