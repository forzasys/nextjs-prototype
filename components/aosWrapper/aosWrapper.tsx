"use client";
import { useEffect } from "react";
import "aos/dist/aos.css";

export default function AOSWrapper() {

    useEffect(() => {
      const loadAOS = async () => {
        const AOS = (await import("aos")).default;
        AOS.init({
          once: true,
          offset: 0,
        });
      };

      const timeout = setTimeout(loadAOS, 200);
      return () => clearTimeout(timeout);
    }, []);

    return null;
}