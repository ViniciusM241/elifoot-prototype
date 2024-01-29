"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import Button from "@/components/button";
import Input from "@/components/input";
import api from "@/helpers/api";
import { setToken } from "@/helpers/token";

export default function Form() {
  const { t } = useTranslation();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError(false);

    if (!formData.email || !formData.password) {
      return;
    }

    setIsLoading(true);

    const res = await api.post("/auth", formData);

    setIsLoading(false);

    if (res?.status === 200) {
      setToken(res.data.token);
      router.push("/perfil");
    } else {
      setError(true);
    }
  };

  const handleOnChange = (e) => {
    setFormData((oldState) => ({
      ...oldState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form className="needs-validation" onSubmit={submit} noValidate>
      <Input
        type="email"
        label={t("form.email.label")}
        placeholder={t("form.email.placeholder")}
        name={"email"}
        onChange={handleOnChange}
        value={formData.email || ""}
        required
      />
      <Input
        type="password"
        label={t("form.password.label")}
        placeholder={t("form.password.placeholder")}
        className={`mt-xxxs${error ? " is-invalid" : ""}`}
        name={"password"}
        onChange={handleOnChange}
        value={formData.password || ""}
        required
      />
      <div className="invalid-feedback was-validated">
        Usuário ou senha incorretos
      </div>
      <div className="d-flex justify-content-between w-100 mt-xs">
        <Button type="submit" variant="primary" disabled={isLoading}>
          {t("form.submitBtn")}
        </Button>
        <Link href="/cadastro" className="text-color-black text-end ml-md">
          {t("form.register")}
        </Link>
      </div>
    </form>
  );
}
