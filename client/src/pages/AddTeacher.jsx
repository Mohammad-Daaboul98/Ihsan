import React from "react";
import { Form } from "react-router-dom";
import { FormRow } from "../components";

const AddTeacher = () => {
  return (
    <Form method="post">
      <FormRow
        type="text"
        name="userName"
        id="userName"
        labelText="اسم المستخدم"
      />
      <FormRow
        type="password"
        name="password"
        id="password"
        labelText="كلمة المرور"
      />
      <FormRow type="date" name="date" id="date" labelText="عمر الاستاذ" lang="ar"/>
      <FormRow
        type="text"
        name="teacherName"
        id="teacherName"
        labelText="اسم الاستاذ"
      />
      <FormRow
        type="text"
        name="teacherWork"
        id="teacherWork"
        labelText="عمل الاستاذ"
      />
      <FormRow
        type="text"
        name="teacherStudy"
        id="teacherStudy"
        labelText="المستوى العلمي"

      />

      <FormRow
        type="text"
        name="teacherPhone"
        id="teacherPhone"
        labelText="رقم الهاتق"
      />
    </Form>
  );
};

export default AddTeacher;
