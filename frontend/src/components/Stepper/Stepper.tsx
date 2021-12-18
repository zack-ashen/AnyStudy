import { slider1, slider2 } from '../../assets';

import './Stepper.css';


type StepperProps = {
  step: Number;
}

const Stepper = ({ step }: StepperProps) => {
  switch (step) {
    case 1:
      return <object type="image/svg+xml" data={slider1} className="Stepper">svg-animation</object>
    case 2:
      return <object type="image/svg+xml" data={slider2} className="Stepper">svg-animation</object>
    default:
      return <></>
  }
}

export default Stepper;
