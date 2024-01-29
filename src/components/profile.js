"use client";

import "./styles.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import Button from "./button";

import api from "@/helpers/api";
import { getToken } from "@/helpers/token";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function useOutsideClick(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}

export default function Profile() {
  const pathname = usePathname();
  const { t } = useTranslation();
  const menuRef = useRef();
  const [user, setUser] = useState();
  const [isActive, setIsActive] = useState(false);

  useOutsideClick(menuRef, () => setIsActive(false));

  const toggleIsActive = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    async function get() {
      const token = getToken();

      const res = await api.get("/users/perfil", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res?.status === 200) {
        setUser(res.data);
      } else {
        console.log("aqui");
        setUser(null);
      }
    }

    get();
  }, [pathname]);

  return (
    <>
      {user ? (
        <div
          ref={menuRef}
          className="d-flex align-items-center"
          onClick={toggleIsActive}
        >
          <p className="mr-xsm">{user?.info?.name}</p>
          <AccountCircleIcon fontSize="large" />
          {isActive ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          {isActive && (
            <div className="float-menu">
              <ul>
                <li className="float-menu__item">
                  <Link href={"/perfil"}>{t("common:nav.profile")}</Link>
                </li>
                <li className="float-menu__item">
                  <Link href={"/sair"}>{t("common:nav.logout")}</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <Link href={"/login"}>
          <Button>{t("common:nav.signBtn")}</Button>
        </Link>
      )}
    </>
  );
}
