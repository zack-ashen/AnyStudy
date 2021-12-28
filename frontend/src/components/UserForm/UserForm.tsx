import { useState, useEffect, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons';
import Select, {Theme, OptionTypeBase} from 'react-select'
import { useHistory } from "react-router-dom";

import { UserDetails, GradYear, Major, ShortCourse } from '../../types';
import Stepper from '../Stepper/Stepper';
import FormRadio from '../FormRadio/FormRadio';
import { toast } from '../ToastNotification/ToastManager';
import useCourseOptions from '../../hooks/useCourseOptions';
import { useRequest } from '../../contexts/request';
import AuthContext from '../../contexts/auth';

import './UserForm.css';

type FormPageProps = {
  next: (updatedFormData: UserDetails) => void;
  prev?: (updatedFormData: UserDetails) => void;
  formData: UserDetails;
}

const UserMajorFormPage = ({ next, formData }: FormPageProps) => {
  // const [major, setMajor] = useState<Major>(formData.major);
  const [majorValue, setMajorValue] = useState<OptionTypeBase>({value: formData.major.major, label: formData.major.major});
  const [options, setOptions] = useState([{value: formData.major.major, label: formData.major.major}]);
  const [majors, setMajors] = useState<Major[]>();
  const [selectThemeError, setSelectThemeError] = useState(false);

  useEffect(() => {
    fetch('/api/majors')
      .then(res => res.json())
      .then(data => {
        setMajors(data);
        setOptions(data.map((m: Major) => {
          return {
            value: m.major,
            label: m.major
          }
        }))
      })
  }, []);

  const validate = () => {
    if (!majorValue || majorValue.value === "") {
      toast.show({message: "You need to specify a major!"});
      setSelectThemeError(true);
      return false;
    } else if (!majors) {
      toast.show({message: "Internal Error: Unable to fetch majors."});
      setSelectThemeError(true);
      return false;
    }
    return true;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();  
    if (validate()) {
      const major = majors!.find(m => m.major === majorValue!.value)!
      next({...formData, major});
    }
  }

  const selectTheme = (theme: Theme) => {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary: '#3D63E2',
        neutral20: selectThemeError ? '#eb1e46' : theme.colors.neutral20
      },
      borderRadius: 12,
      spacing: {
        baseUnit: 7,
        controlHeight: 5,
        menuGutter: 20
      }
    }
  }

 return (
    <form className="UserMajorFormPage FormPage" onSubmit={handleSubmit}>
      <label className="userFormLabel">What's your major?</label>
      <Select 
        options={options} 
        className="userSelectField" 
        value={majorValue} 
        onChange={(m) => setMajorValue(m)} 
        theme={selectTheme}
        placeholder=""
        autoFocus
        isClearable/>
      <div className="directionalButtons">
        <div></div>
        <button type="submit" className="nextButton"><FontAwesomeIcon icon={faLongArrowAltRight} /></button>
      </div>
    </form>
  );
}

const UserYearFormPage = ({ prev, next, formData }: FormPageProps) => {
  const years = Object.values(GradYear)
  const [yearIndex, setYearIndex] = useState(years.findIndex((year) => year === formData.year));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    next({...formData, year: years[yearIndex]})
  }

  return (
    <form className="UserYearFormPage FormPage" onSubmit={handleSubmit}>
      <label className="userFormLabel">What year are you?</label>
      <FormRadio options={years} selected={yearIndex === -1 ? 1 : yearIndex} setSelected={setYearIndex} />
      <div className="directionalButtons">
        <button className="backButton" onClick={() => {if (prev) {prev({...formData, year: years[yearIndex]})}}}><FontAwesomeIcon icon={faLongArrowAltLeft}/></button>
        <button className="nextButton"><FontAwesomeIcon icon={faLongArrowAltRight}/></button>
      </div>
    </form>
  );
}

const PlannedCoursesFormPage = ({ prev, next, formData }: FormPageProps) => {
  const [courseIds, setCourseIds] = useState<number[]>(formData.futureCourses);
  const {options, courses} = useCourseOptions();
  const [courseValues, setCourseValues] = useState<OptionTypeBase[]>([])

  useEffect(() => {
    const updatedCourseValues : OptionTypeBase[] = [];
    courseIds.forEach((id) => {
      const course = courses.find(c => c.id === id);
      if (course) {
        const option : OptionTypeBase = {value: course.id.toString(), label: course.code + ': ' + course.title}
        updatedCourseValues.push(option);
      }
    })
    setCourseValues(updatedCourseValues);
  }, [courses])


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    next({...formData, futureCourses: courseIds});
  }

  const handleChange = (c: any) => {
    const valArr = c.map((course: any) => parseInt(course.value))
    setCourseIds(valArr);
    setCourseValues(c);
  }

  const selectTheme = (theme: Theme) => {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary: '#3D63E2'
      },
      borderRadius: 12,
      spacing: {
        baseUnit: 7,
        controlHeight: 5,
        menuGutter: 20
      }
    }
  }

  return (
    <form className="PlannedClassesFormPage FormPage" onSubmit={handleSubmit}>
      <label className="userFormLabel">What classes do you plan on taking that you are looking forward to?</label>
      <Select 
        options={options} 
        theme={selectTheme}
        className="userSelectField" 
        onChange={handleChange}
        value={courseValues}
        placeholder=""
        autoFocus
        isMulti
        isClearable/>

      <div className="directionalButtons">
        <button className="backButton" onClick={() => {if (prev) {prev({...formData, futureCourses: courseIds})}}}><FontAwesomeIcon icon={faLongArrowAltLeft}/></button>
        <button className="nextButton"><FontAwesomeIcon icon={faLongArrowAltRight}/></button>
      </div>
    </form>
  );
}

const LikedCoursesFormPage = ({ prev, next, formData }: FormPageProps) => { 
  const [courseIds, setCourseIds] = useState<number[]>(formData.likedCourses);
  const {options, courses} = useCourseOptions();
  const [courseValues, setCourseValues] = useState<OptionTypeBase[]>([])

  useEffect(() => {
    const updatedCourseValues : OptionTypeBase[] = [];
    courseIds.forEach((id) => {
      const course = courses.find(c => c.id === id);
      if (course) {
        const option : OptionTypeBase = {value: course.id.toString(), label: course.code + ': ' + course.title}
        updatedCourseValues.push(option);
      }
    })
    setCourseValues(updatedCourseValues);
  }, [courses])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    next({...formData, likedCourses: courseIds});
  }

  const handleChange = (c: any) => {
    const valArr = c.map((course: any) => parseInt(course.value));
    setCourseIds(valArr);
    setCourseValues(c);
  }

  const selectTheme = (theme: Theme) => {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary: '#3D63E2'
      },
      borderRadius: 12,
      spacing: {
        baseUnit: 7,
        controlHeight: 5,
        menuGutter: 20
      }
    }
  }

  return (
    <form className="LikedClassesFormPage FormPage" onSubmit={handleSubmit}>
      <label className="userFormLabel">What classes have you already taken that you enjoyed?</label>
      <Select 
        options={options} 
        theme={selectTheme}
        value={courseValues}
        className="userSelectField" 
        onChange={handleChange}
        placeholder=""
        autoFocus
        isMulti
        isClearable/>

      <div className="directionalButtons">
        <button className="backButton" onClick={() => {if (prev) {prev({...formData, likedCourses: courseIds})}}}><FontAwesomeIcon icon={faLongArrowAltLeft}/></button>
        <button className="nextButton"><FontAwesomeIcon icon={faLongArrowAltRight}/></button>
      </div>
    </form> 
  );
}

const DislikedCoursesFormPage = ({ prev, next, formData }: FormPageProps) => {
  const [courseIds, setCourseIds] = useState<number[]>(formData.dislikedCourses);
  const {options, courses} = useCourseOptions();
  const [courseValues, setCourseValues] = useState<OptionTypeBase[]>([])

  useEffect(() => {
    const updatedCourseValues : OptionTypeBase[] = [];
    courseIds.forEach((id) => {
      const course = courses.find(c => c.id === id);
      if (course) {
        const option : OptionTypeBase = {value: course.id.toString(), label: course.code + ': ' + course.title}
        updatedCourseValues.push(option);
      }
    })
    setCourseValues(updatedCourseValues);
  }, [courses])


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    next({...formData, dislikedCourses: courseIds});
  }

  const handleChange = (c: any) => {
    const valArr = c.map((course: any) => parseInt(course.value))
    setCourseIds(valArr);
    setCourseValues(c);
  }

  const selectTheme = (theme: Theme) => {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        primary: '#3D63E2'
      },
      borderRadius: 12,
      spacing: {
        baseUnit: 7,
        controlHeight: 5,
        menuGutter: 20
      }
    }
  }

  return (
    <form className="LikedClassesFormPage FormPage" onSubmit={handleSubmit}>
      <label className="userFormLabel">What classes have you already taken that you did not enjoy?</label>
      <Select 
        options={options} 
        theme={selectTheme}
        value={courseValues}
        className="userSelectField" 
        onChange={handleChange}
        placeholder=""
        autoFocus
        isMulti
        isClearable/>

      <div className="directionalButtons">
        <button className="backButton" onClick={() => {if (prev) {prev({...formData, dislikedCourses: courseIds})}}}><FontAwesomeIcon icon={faLongArrowAltLeft}/></button>
        <button className="nextButton"><FontAwesomeIcon icon={faLongArrowAltRight}/></button>
      </div>
    </form> 
  );
}


const UserForm = () => {
  const [formData, setFormData] = useState<UserDetails>({
    likedCourses: [],
    major: {major: "", college: []},
    year: GradYear.FRESHMAN,
    futureCourses: [],
    dislikedCourses: []
  })
  const { withDefaults } = useRequest();
  const { user, refreshUser } = useContext(AuthContext);
  const [step, setStep] = useState(1);
  const history = useHistory();

  const prevStep = (updatedFormData: UserDetails) => {
    setFormData(updatedFormData);
    setStep(step-1);
  }

  const nextStep = (updatedFormData: UserDetails) => {
    setFormData(updatedFormData);
    setStep(step+1);
  }

  const submit = (formData: UserDetails) => {
    console.log(formData); 
    fetch(`/api/user/${user?.id}/user_details`, 
      withDefaults({
        method: 'POST',
        body: JSON.stringify({
          userDetails: formData
        })
      }))
    refreshUser();
    history.push('/course-selection')
  }
  
  const renderFormStep = (step: Number) => { 
    switch (step) {
      case 1:
        return <UserMajorFormPage next={nextStep} formData={formData}/>
      case 2:
        return <UserYearFormPage next={nextStep} prev={prevStep} formData={formData}/>
      case 3:
        return <PlannedCoursesFormPage next={nextStep} prev={prevStep} formData={formData}/>
      case 4:
        return <LikedCoursesFormPage next={nextStep} prev={prevStep} formData={formData}/>;
      case 5:
        return <DislikedCoursesFormPage next={submit} prev={prevStep} formData={formData}/>
      default:
        return <></>
    }
  }

  return (
    <div className="UserForm">
      <Stepper step={step}/>
      {renderFormStep(step)}
    </div>
  );
}

export default UserForm;
