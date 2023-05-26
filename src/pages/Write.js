import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { LoginContext } from "../App";
import { Label, TextInput, Textarea } from "flowbite-react";

const Write = () => {
  const [value, setValue] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = (values, action) => {
    const { file, ...v } = values;
    const data = new FormData();
    data.append("data", JSON.stringify(v));
    data.append("file", file);
    axios
      .post("https://minpro-blog.purwadhikabootcamp.com/api/blog", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((response) => {
        console.log(response);
        setValue(response.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Formik
      initialValues={{
        file: null,
        title: "",
        content: "",
        country: "",
        CategoryId: "",
        keywords: "",
      }}
      // validationSchema={CreateSchema}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <form className="flex flex-col gap-4" onSubmit={props.handleSubmit}>
          <div className="flex flex-col justify-center items-center ">
            <div className="mb-2 block">
            <Label
              htmlFor="title"
              value="Blog Title"
            />
              <TextInput
                id="title"
                type="text"
                placeholder="Title"
                name="title"
                onChange={props.handleChange}
                value={props.values.title}
              />
              <Label
              htmlFor="country"
              value="Country"
              />
              <TextInput
                type="text"
                placeholder="country"
                name="country"
                onChange={props.handleChange}
                value={props.values.country}
              />
              <Label
              htmlFor="keyword"
              value="Keywords"
              />
              <TextInput
                type="text"
                placeholder="keywords"
                name="keywords"
                onChange={props.handleChange}
                value={props.values.keywords}
              />

              <div id="textarea">
                <div className="mb-2 block">
                <Label
                  htmlFor="content"
                  value="Your content here"
                />
                <Textarea
                  id="content"
                  type="text"
                  placeholder="content here"
                  rows={4}
                  value={props.values.content}
                  onChange={(event) => {
                    props.setFieldValue("content", event.target.value);
                  }}
                />
                </div>
              </div>
            </div>
            <div className="menu">
              <div className="item">
                <h1>Publish</h1>
                <span>
                  <b>Status:</b> Draft
                </span>
                <span>
                  <b>Visibility:</b> Public
                </span>
                <input
                  style={{ display: "none" }}
                  type="file"
                  name="file"
                  id="file"
                  onChange={(e) => {
                    props.setFieldValue("file", e.currentTarget.files[0]);
                  }}
                />
                <label className="file" htmlFor="file">
                  Upload Image
                </label>
                <div className="buttons">
                  <button>Post!</button>
                </div>
              </div>
              <div className="item">
                <h1>Category</h1>
                <div className="cat">
                  <input
                    type="radio"
                    name="CategoryId"
                    value="1"
                    id="Bisnis"
                    onChange={props.handleChange}
                  />
                  <label htmlFor="Bisnis">Bisnis</label>
                </div>
                <div className="cat">
                  <input
                    type="radio"
                    name="CategoryId"
                    value="2"
                    id="Ekonomi"
                    onChange={props.handleChange}
                  />
                  <label htmlFor="Ekonomi">Ekonomi</label>
                </div>
                <div className="cat">
                  <input
                    type="radio"
                    name="CategoryId"
                    value="3"
                    id="Teknologi"
                    onChange={props.handleChange}
                  />
                  <label htmlFor="Teknologi">Teknologi</label>
                </div>
                <div className="cat">
                  <input
                    type="radio"
                    name="CategoryId"
                    value="4"
                    id="Olahraga"
                    onChange={props.handleChange}
                  />
                  <label htmlFor="Olahraga">Olahraga</label>
                </div>
                <div className="cat">
                  <input
                    type="radio"
                    name="CategoryId"
                    value="5"
                    id="Kuliner"
                    onChange={props.handleChange}
                  />
                  <label htmlFor="Kuliner">Kuliner</label>
                </div>
                <div className="cat">
                  <input
                    type="radio"
                    name="CategoryId"
                    value="6"
                    id="Internasional"
                    onChange={props.handleChange}
                  />
                  <label htmlFor="Internasional">Internasional</label>
                </div>
                <div className="cat">
                  <input
                    type="radio"
                    name="CategoryId"
                    value="7"
                    id="Fiksi"
                    onChange={props.handleChange}
                  />
                  <label htmlFor="Fiksi">Fiksi</label>
                </div>
              </div>
              <form />
            </div>
          </div>
          {JSON.stringify(props.values)}
        </form>
      )}
    </Formik>
  );
};

export default Write;