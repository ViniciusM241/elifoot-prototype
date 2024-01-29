"use client";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import Button from "@/components/button";
import Input from "@/components/input";

export default function Form() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  });

  const handleOnChange = (e) => {
    setFormData((oldState) => ({
      ...oldState,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <form className="needs-validation" onSubmit={submit} noValidate>
      <div className="row">
        <div className="col-12">
          <Input
            type="text"
            label={t("form.name.label")}
            placeholder={t("form.name.placeholder")}
            name={"name"}
            onChange={handleOnChange}
            value={formData.name || ""}
            required
          />
        </div>
      </div>
      <div className="row mt-xxxs">
        <div className="col-6">
          <Input
            type="email"
            label={t("form.email.label")}
            placeholder={t("form.email.placeholder")}
            name={"email"}
            onChange={handleOnChange}
            value={formData.email || ""}
            required
          />
        </div>
        <div className="col-6">
          <Input
            type="email"
            label={t("form.confirmEmail.label")}
            placeholder={t("form.confirmEmail.placeholder")}
            name={"confirmEmail"}
            onChange={handleOnChange}
            value={formData.confirmEmail || ""}
            pattern={formData.email}
            required
          />
        </div>
      </div>
      <div className="row mt-xxxs">
        <div className="col-6">
          <Input
            type="password"
            label={t("form.password.label")}
            placeholder={t("form.password.placeholder")}
            className="mt-xxxs"
            name={"password"}
            onChange={handleOnChange}
            value={formData.password || ""}
            required
          />
        </div>
        <div className="col-6">
          <Input
            type="password"
            label={t("form.confirmPassword.label")}
            placeholder={t("form.confirmPassword.placeholder")}
            className="mt-xxxs"
            name={"confirmPassword"}
            onChange={handleOnChange}
            value={formData.confirmPassword || ""}
            pattern={formData.password}
            required
          />
        </div>
      </div>
      <div className="d-flex justify-content-between w-100 mt-xs">
        <Button type="submit" variant="primary">
          {t("form.submitBtn")}
        </Button>
        <Link href="/login" className="text-color-black text-end ml-md">
          {t("form.login")}
        </Link>
      </div>
    </form>
  );
}
