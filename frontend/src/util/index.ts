import { Course } from '../types'

const jsonToCourse = ( data: any ): Course => {
  const description = data.descr
  const id = data._id;
  const tags = data.tags.split("|");
  return { 
    id:id, 
    description: description, 
    tags: tags, 
    title: data.title, 
    code: data.code,
    subject: data.subject,
    rating: data.rating }
}

export default jsonToCourse;