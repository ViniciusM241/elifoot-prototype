import Link from "next/link";

export default function Card({ className, title, linkLabel, link, children }) {
  return (
    <div className={`card${className ? ` ${className}` : ""}`}>
      <div className="d-flex justify-content-between mb-xxxs">
        <h3 className="text-color-white">{title}</h3>
        {linkLabel && link && <Link href={link}>{linkLabel}</Link>}
      </div>
      {children}
    </div>
  );
}
