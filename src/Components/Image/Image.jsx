import { img } from "motion/react-client";
import React, { useState } from "react";

export default function Image({ src, css }) {
  function imgErrorHdl(e) {
    e.target.src =
      "https://cdn.vectorstock.com/i/preview-1x/35/52/placeholder-rgb-color-icon-vector-32173552.jpg";
    console.log("error");
  }
  return <img src={src} className={css} onError={imgErrorHdl} />;
}
