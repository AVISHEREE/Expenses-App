import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AnimatedCharacter = ({ message, variant = "default" }) => {
  const [isActive, setIsActive] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");

  const variants = {
    default: {
      primary: "#3C3D37", // Deep Blue
      secondary: "#697565", // Bright Sky Blue
      accent: "#ECDFCC", // Aquamarine
    },
    alert: {
      primary: "#420C09", // Deep Red
      secondary: "#E63946", // Crimson Red
      accent: "#FFB4A2", // Light Coral
    },
    success: {
      primary: "#0F3D0F", // Forest Green
      secondary: "#2BA84A", // Bright Green
      accent: "#A7F3D0", // Mint Green
    },
    warning: {
      primary: "#5C3D00", // Dark Gold
      secondary: "#F4A261", // Sunset Orange
      accent: "#FFE8A1", // Pale Yellow
    },
  };

  const messages = {
    default: [
      `Hi! Let's manage expenses`,
      "Tap for quick actions",
      "Weekly budget remaining: $500",
      "You've saved 12% this month!",
    ],
    alert: ["Unusual spending detected!", "Budget exceeded in 2 categories"],
    success: ["Savings goal achieved! 🎉", "Payment received successfully"],
    warning: ["Low balance alert", "Upcoming bill: Electricity"],
  };

  useEffect(() => {
    const msgs = messages[variant] || messages.default;
    setCurrentMessage(message || msgs[Math.floor(Math.random() * msgs.length)]);
  }, [message, variant]);

  return (
    <div className="fixed left-4 bottom-6 cursor-pointer flex items-center gap-4">
      {/* Assistant Character */}
      <motion.div
        className="relative group"
        onHoverStart={() => setIsActive(true)}
        onHoverEnd={() => setIsActive(false)}
        animate={{ y: isActive ? -5 : 0 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.div
          className="w-16 h-24 relative"
          animate={{ rotate: isActive ? [0, -5, 3, 0] : 0 }}
        >
          {/* Head */}
          <div
            className="absolute top-0 w-full h-10 rounded-full"
            style={{ backgroundColor: variants[variant].secondary }}
          >
            {/* Antennas */}
            <div
              className="absolute -top-3 left-4 w-1 h-4 rounded-full"
              style={{ backgroundColor: variants[variant].accent }}
            />
            <div
              className="absolute -top-4 right-4 w-2 h-5 rounded-full origin-bottom"
              style={{
                backgroundColor: variants[variant].accent,
                transform: isActive ? "rotate(15deg)" : "rotate(0deg)",
              }}
            />
            {/* Eyes */}
            <div className="flex justify-center gap-2 pt-2">
              <div className="w-2 h-2 bg-white rounded-full animate-blink" />
              <div className="w-2 h-2 bg-white rounded-full animate-blink" />
            </div>
          </div>

          {/* Body */}
          <div
            className="absolute top-10 w-full h-12 rounded-lg shadow-lg"
            style={{ backgroundColor: variants[variant].primary }}
          >
            {/* Screen Display */}
            <div className="p-2">
              <div
                className="w-full h-full rounded bg-white/10 backdrop-blur-md flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5"
                  style={{ color: variants[variant].accent }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Base */}
          <div
            className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full"
            style={{ backgroundColor: variants[variant].secondary }}
          />
        </motion.div>

        {/* Status Pulse */}
        <motion.div
          className="absolute inset-0 rounded-full opacity-0"
          style={{ backgroundColor: variants[variant].primary }}
          animate={{ opacity: [0, 0.2, 0], scale: [1, 1.4, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </motion.div>
      <motion.div
        className="relative min-w-[180px] max-w-[240px] p-4 rounded-xl shadow-lg backdrop-blur-md"
        style={{
          backgroundColor: `${variants[variant].accent}33`,
          border: `2px solid ${variants[variant].secondary}`,
        }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <p
          className="text-sm font-semibold text-center"
          style={{ color: "white"}}
        >
          {currentMessage}
        </p>
      </motion.div>
    </div>
  );
};

export default AnimatedCharacter;
