import { slider1, slider2, slider3, slider4, slider5 } from '../../assets';

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
    case 3:
      return <object type="image/svg+xml" data={slider3} className="Stepper">svg-animation</object>
    case 4:
      return <object type="image/svg+xml" data={slider4} className="Stepper">svg-animation</object>
    case 5:
      return <object type="image/svg+xml" data={slider5} className="Stepper">svg-animation</object>
    default:
      return <></>
  }
}

export default Stepper;
