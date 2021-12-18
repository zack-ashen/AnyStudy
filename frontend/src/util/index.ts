import { Course } from "../types";

export const uuid = () => {
  let dt = new Date().getTime();

  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
};

export const jsonToCourse = (data: any): Course => {
  const description = data.descr;
  const id = data._id;
  const tags = data.tags.split("|");
  return {
    id: id,
    description: description,
    tags: tags,
    title: data.title,
    code: data.code,
    subject: data.subject,
    rating: data.rating,
  };
};

export const isLoggedIn = () => {
  return localStorage.getItem("userId");
};
