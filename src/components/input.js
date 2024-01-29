import { useTranslation } from "react-i18next";
import "./styles.css";

export default function Input({
  type,
  name,
  value,
  onChange,
  id,
  label,
  placeholder,
  className,
  required,
  pattern,
}) {
  const { t } = useTranslation();

  return (
    <div className={className}>
      <label htmlFor={id || name} className="form-label text-2">
        {label}
      </label>
      <input
        id={id || name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        pattern={pattern}
        className="form-control"
      />
      <div className="invalid-feedback">{t("common:form.validationWrong")}</div>
    </div>
  );
}
