"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
export default function Dependencies() {
  const router = usePathname();

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");

    (function () {
      "use strict";

      var forms = document.querySelectorAll(".needs-validation");

      Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener(
          "submit",
          function (event) {
            if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
            }

            form.classList.add("was-validated");
          },
          false,
        );
      });
    })();
  }, [router]);

  return <></>;
}
