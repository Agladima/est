import React, { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import ArrowRight from "./ArrowRight";

const RegistrationForm = () => {
  const totalSteps = 4;
  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    date_of_birth: "",
    lc: "",
    year_they_joined: "",
    role: "",
    first_conference: "",
    expectations: "",
    social_media: "",
    allergies: "",
    allergy_treatment: "",
    can_stay_with_opposite_sex: "",
    emergency_contact: "",
    emergency_contact_relationship: "",
    instructions: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const validateStep = () => {
    const stepFields = {
      1: ["name", "email", "gender", "date_of_birth"],
      2: ["lc", "year_they_joined", "role", "first_conference"],
      3: ["expectations", "social_media", "allergies", "allergy_treatment"],
      4: [
        "can_stay_with_opposite_sex",
        "emergency_contact",
        "emergency_contact_relationship",
        "instructions",
      ],
    };

    const fields = stepFields[currentStep] || [];
    let valid = true;
    let newErrors = {};

    for (let field of fields) {
      const value = formData[field].trim();
      if (!value) {
        newErrors[field] = true;
        valid = false;
      }
      if (
        field === "email" &&
        (!value.includes("@") ||
          (!value.endsWith(".com") && !value.endsWith("@aiesec.net")))
      ) {
        newErrors[field] = true;
        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const nextStep = () => {
    if (!validateStep()) return;
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => currentStep > 0 && setCurrentStep(currentStep - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    if (currentStep === totalSteps) {
      try {
        setLoading(true);

        const payload = {
          ...formData,
          first_conference: formData.first_conference.toLowerCase() === "yes",
          can_stay_with_opposite_sex:
            formData.can_stay_with_opposite_sex.toLowerCase() === "yes",
        };

        const res = await fetch(
          "https://ain-backend.fly.dev/api/next-ife/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );

        if (!res.ok) throw new Error("Failed to submit form");

        const data = await res.json();
        alert("✅ Registration successful!");
        console.log("Response:", data);

        setFormData({
          name: "",
          email: "",
          gender: "",
          date_of_birth: "",
          lc: "",
          year_they_joined: "",
          role: "",
          first_conference: "",
          expectations: "",
          social_media: "",
          allergies: "",
          allergy_treatment: "",
          can_stay_with_opposite_sex: "",
          emergency_contact: "",
          emergency_contact_relationship: "",
          instructions: "",
        });
        setErrors({});
        setCurrentStep(0);
      } catch (err) {
        alert("❌ Error: " + err.message);
      } finally {
        setLoading(false);
      }
    } else {
      nextStep();
    }
  };

  const images = {
    0: "/hero.png",
    1: "/one.png",
    2: "/two.png",
    3: "/three.png",
    4: "/four.png",
  };

  const stepColours = [
    {
      color: "#ffffff",
      bgColor: "#000000",
    },
    {
      color: "#000000",
      bgColor: "#4126AB",
    },
    {
      color: "#000000",
      bgColor: "#E50E28",
    },
  ];

  const themes = {
    0: { rightBg: "#fff", inputBg: "#000", text: "#000" },
    1: { rightBg: "#fff", inputBg: "#000", text: "#fff" },
    2: { rightBg: "#fff", inputBg: "#000", text: "#fff" },
    3: { rightBg: "#fff", inputBg: "#000", text: "#fff" },
    4: { rightBg: "#fff", inputBg: "#000", text: "#fff" },
  };

  const theme = themes[currentStep];
  //  <img
  //         src={images[currentStep]}
  //         alt={`Step ${currentStep}`}
  //         className="registration-left-image"
  //       />
  return (
    <div className="registration-wrapper">
      <div
        className="registration-left"
        style={{
          backgroundColor:
            stepColours[currentStep === 0 ? 0 : ((currentStep - 1) % 2) + 1]
              .bgColor,
          color:
            stepColours[currentStep === 0 ? 0 : ((currentStep - 1) % 2) + 1]
              .color,
        }}
      >
        <div className="text-left">
          <div className="top-text">
            <span>Discover</span>
            <span>What's</span>
          </div>
          <span className="bottom-text">NEXT</span>
        </div>
        {currentStep > 0 && (
          <div className="registration-progress-bar">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`registration-progress-segment ${
                  i < currentStep ? "completed" : ""
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className={`registration-right step-${currentStep}`}>
        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="top-bar">
            <div className="registration-top-bar" style={{ minWidth: "20px" }}>
              {currentStep > 0 && (
                <span>
                  {currentStep}/{totalSteps}
                </span>
              )}
            </div>

            <img
              src="/logos/next-logo.png"
              alt="NEXT Seminar Logo 2"
              className="top-logo"
            />
          </div>
          {currentStep === 0 && (
            <div className="registration-intro-content">
              <div className="registration-intro-text">
                <p className="registration-intro-paragraph">
                  You're about to secure your spot at the very first NEXT
                  Seminar.
                  <br />
                  <br />
                  A new name. A new era.
                  <br />
                  <br />
                  A groundbreaking experience designed for ideas, connections,
                  and opportunities that move the future forward.
                  <br />
                  <br />
                  Seats are limited. Why wait?
                </p>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <>
              <Input
                label="NAME"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                theme={theme}
                error={errors.name}
              />
              <Input
                label="EMAIL ADDRESS"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                theme={theme}
                error={errors.email}
              />
              <Select
                label="GENDER"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                options={["Male", "Female", "Other"]}
                theme={theme}
                error={errors.gender}
              />
              <Input
                label="DATE OF BIRTH"
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                theme={theme}
                error={errors.date_of_birth}
              />
            </>
          )}

          {currentStep === 2 && (
            <>
              <Select
                label="LC"
                name="lc"
                value={formData.lc}
                onChange={handleChange}
                options={[
                  "Abeokuta",
                  "Abuja",
                  "Akure",
                  "Benin",
                  "Benue",
                  "Calabar",
                  "Ekiti",
                  "Enugu",
                  "Ibadan",
                  "Ife",
                  "Ilorin",
                  "Jos",
                  "Kano",
                  "Lagos",
                  "Port Harcourt",
                  "Zaria",
                ]}
                theme={theme}
                error={errors.lc}
              />
              <Select
                label="YEAR YOU JOINED AIESEC"
                name="year_they_joined"
                value={formData.year_they_joined}
                onChange={handleChange}
                options={[
                  "2025",
                  "2024",
                  "2023",
                  "2022",
                  "2021",
                  "2020",
                  "2019",
                  "2018",
                  "2017",
                  "2016",
                  "2015",
                  "2014",
                  "2013",
                  "2012",
                  "2011",
                  "2010",
                  "2009",
                  "2008",
                  "2007",
                  "2006",
                  "2005",
                  "2004",
                  "2003",
                  "2002",
                  "2001",
                  "2000",
                  "1999",
                ]}
                theme={theme}
                error={errors.year_they_joined}
              />
              <Select
                label="ROLE"
                name="role"
                value={formData.role}
                onChange={handleChange}
                options={["TM", "TL", "LCVP", "LCP", "MCVP", "MCP", "ALUMNI"]}
                theme={theme}
                error={errors.role}
              />
              <Select
                label="FIRST CONFERENCE"
                name="first_conference"
                value={formData.first_conference}
                onChange={handleChange}
                options={["Yes", "No"]}
                theme={theme}
                error={errors.first_conference}
              />
            </>
          )}

          {currentStep === 3 && (
            <>
              <Input
                label="EXPECTATIONS"
                type="text"
                name="expectations"
                value={formData.expectations}
                onChange={handleChange}
                theme={theme}
                error={errors.expectations}
              />
              <Input
                label="SOCIAL MEDIA HANDLE"
                type="text"
                name="social_media"
                value={formData.social_media}
                onChange={handleChange}
                theme={theme}
                error={errors.social_media}
              />
              <Input
                label="ALLERGIES"
                type="text"
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
                theme={theme}
                error={errors.allergies}
              />
              <Input
                label="ALLERGY TREATMENT"
                type="text"
                name="allergy_treatment"
                value={formData.allergy_treatment}
                onChange={handleChange}
                theme={theme}
                error={errors.allergy_treatment}
              />
            </>
          )}

          {currentStep === 4 && (
            <>
              <Select
                label="CAN STAY WITH OPPOSITE SEX"
                name="can_stay_with_opposite_sex"
                value={formData.can_stay_with_opposite_sex}
                onChange={handleChange}
                options={["Yes", "No", "Absolutely Not"]}
                theme={theme}
                error={errors.can_stay_with_opposite_sex}
              />
              <Input
                label="EMERGENCY CONTACT"
                type="text"
                name="emergency_contact"
                value={formData.emergency_contact}
                onChange={handleChange}
                theme={theme}
                error={errors.emergency_contact}
              />
              <Input
                label="RELATIONSHIP WITH CONTACT"
                type="text"
                name="emergency_contact_relationship"
                value={formData.emergency_contact_relationship}
                onChange={handleChange}
                theme={theme}
                error={errors.emergency_contact_relationship}
              />
              <Textarea
                label="SPECIAL INSTRUCTIONS"
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                theme={theme}
                error={errors.instructions}
              />
            </>
          )}

          {currentStep === 0 && (
            <div className="registration-proceed-wrapper">
              <button
                type="button"
                onClick={nextStep}
                className="registration-proceed-btn"
              >
                Register Now <ArrowRight />
              </button>
            </div>
          )}
          {currentStep > 0 && (
            <div className="registration-nav-buttons">
              <div className="">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="registration-back-btn"
                  >
                    <ArrowRight /> BACK
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="registration-next-btn"
                disabled={loading}
              >
                {loading
                  ? "Submitting..."
                  : currentStep === totalSteps
                  ? "SUBMIT"
                  : "NEXT"}{" "}
                <ArrowRight />
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

/* Components */
const Input = ({ label, theme, error, ...props }) => (
  <div
    className={`registration-input-group ${
      theme.inputBg === "#000" ? "dark" : "light"
    }`}
  >
    <label
      className={`registration-label ${
        theme.text === "#fff" ? "white" : "black"
      }`}
    >
      {label}
    </label>
    <input
      {...props}
      className={`registration-input ${error ? "error" : ""} ${
        theme.text === "#fff" ? "white" : "black"
      }`}
    />
  </div>
);

const Select = ({ label, theme, error, ...props }) => (
  <div
    className={`registration-input-group ${
      theme.inputBg === "#000" ? "dark" : "light"
    }`}
  >
    <label
      className={`registration-label ${
        theme.text === "#fff" ? "white" : "black"
      }`}
    >
      {label}
    </label>
    <select
      {...props}
      className={`registration-select ${error ? "error" : ""} ${
        theme.text === "#fff" ? "white" : "black"
      } ${theme.inputBg === "#000" ? "dark" : "light"}`}
    >
      <option value="">Select</option>
      {props.options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const Textarea = ({ label, theme, error, ...props }) => (
  <div
    className={`registration-input-group ${
      theme.inputBg === "#000" ? "dark" : "light"
    }`}
  >
    <label
      className={`registration-label ${
        theme.text === "#fff" ? "white" : "black"
      }`}
    >
      {label}
    </label>
    <textarea
      {...props}
      className={`registration-textarea ${error ? "error" : ""} ${
        theme.text === "#fff" ? "white" : "black"
      }`}
    />
  </div>
);

export default RegistrationForm;
