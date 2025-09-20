import React, { useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

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

  const themes = {
    0: { rightBg: "#fff", inputBg: "#000", text: "#000" },
    1: { rightBg: "#fff", inputBg: "#000", text: "#fff" },
    2: { rightBg: "#fff", inputBg: "#000", text: "#fff" },
    3: { rightBg: "#fff", inputBg: "#000", text: "#fff" },
    4: { rightBg: "#fff", inputBg: "#000", text: "#fff" },
  };

  const theme = themes[currentStep];

  return (
    <>
      <style>
        {`
          button {
            border: none !important;
            outline: none !important;
            background: none !important;
          }
          button:hover, button:focus {
            border: none !important;
            outline: none !important;
          }
          @media (max-width: 768px) {
            .wrapper { flex-direction: column !important; height: auto !important; }
            .left { order: -1; height: 40vh; }
            .left img { object-fit: cover; }
            .right { padding: 20px !important; }
            .form { gap: 15px !important; }
            .navButtons {  flex-direction: row !important; 
        justify-content: space-between !important; 
        width: 100%; 
        gap: 10px; }
            .proceedBtn { width: 100%; justify-content: center; }
          }
        `}
      </style>

      <div style={styles.wrapper} className="wrapper">
        <div style={styles.left} className="left">
          <img
            src={images[currentStep]}
            alt={`Step ${currentStep}`}
            style={styles.leftImage}
          />
          {currentStep > 0 && (
            <div style={styles.progressBar}>
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    ...styles.progressSegment,
                    backgroundColor: i < currentStep ? "#000" : "#fff",
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <div
          style={{ ...styles.right, backgroundColor: theme.rightBg }}
          className="right"
        >
          {currentStep > 0 && (
            <div style={styles.topBar}>
              <span>
                {currentStep}/{totalSteps}
              </span>
              <span style={styles.icon}>⏺</span>
            </div>
          )}

          <form style={styles.form} onSubmit={handleSubmit} className="form">
            {currentStep === 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <div style={{ textAlign: "left", marginTop: "60px" }}>
                  <p style={{ color: theme.text, fontSize: "1.1rem" }}>
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
                <div style={styles.proceedWrapper}>
                  <button
                    type="button"
                    onClick={nextStep}
                    style={styles.proceedBtn}
                    className="proceedBtn"
                  >
                    PROCEED{" "}
                    <FaLongArrowAltRight style={{ marginLeft: "6px" }} />
                  </button>
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
                    "Enugu",
                    "Ibadan",
                    "Ife",
                    "Ilorin",
                    "Jos",
                    "Kano",
                    "Lagos",
                    "Port Harcourt",
                  ]}
                  theme={theme}
                  error={errors.lc}
                />
                <Select
                  label="YEAR YOU JOINED AIESEC"
                  name="year_they_joined"
                  value={formData.year_they_joined}
                  onChange={handleChange}
                  options={["2020", "2021", "2022", "2023", "2024", "2025"]}
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

            {currentStep > 0 && (
              <div style={styles.navButtons} className="navButtons">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    style={styles.backBtn}
                  >
                    BACK
                  </button>
                )}
                <button type="submit" style={styles.nextBtn} disabled={loading}>
                  {loading
                    ? "Submitting..."
                    : currentStep === totalSteps
                    ? "SUBMIT"
                    : "NEXT"}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

/* Components */
const Input = ({ label, theme, error, ...props }) => (
  <div style={{ ...styles.inputGroup, background: theme.inputBg }}>
    <label style={{ ...styles.label, color: theme.text }}>{label}</label>
    <input
      {...props}
      style={{
        ...styles.input,
        borderBottomColor: error ? "red" : theme.text,
        color: theme.text,
      }}
    />
  </div>
);

const Select = ({ label, theme, error, ...props }) => (
  <div style={{ ...styles.inputGroup, background: theme.inputBg }}>
    <label style={{ ...styles.label, color: theme.text }}>{label}</label>
    <select
      {...props}
      style={{
        ...styles.select,
        borderBottomColor: error ? "red" : theme.text,
        color: theme.text,
        backgroundColor: theme.inputBg,
      }}
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
  <div style={{ ...styles.inputGroup, background: theme.inputBg }}>
    <label style={{ ...styles.label, color: theme.text }}>{label}</label>
    <textarea
      {...props}
      style={{
        ...styles.textarea,
        borderBottomColor: error ? "red" : theme.text,
        color: theme.text,
      }}
    />
  </div>
);

const styles = {
  wrapper: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    fontFamily: "Arial Black, sans-serif",
  },
  left: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: "#f0f0f0",
  },
  leftImage: { width: "100%", height: "100%", objectFit: "cover" },
  progressBar: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    display: "flex",
    height: 6,
    gap: 8,
  },
  progressSegment: { flex: 1 },
  right: { flex: 1, padding: 50, display: "flex", flexDirection: "column" },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 40,
    fontWeight: "bold",
  },
  icon: { fontSize: "1.5rem" },
  form: { display: "flex", flexDirection: "column", gap: 20, height: "100%" },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    padding: "10px 15px",
  },
  label: { fontSize: "0.8rem", fontWeight: "bold", marginBottom: 5 },
  input: {
    background: "transparent",
    border: "none",
    borderBottom: "2px solid",
    padding: 8,
    fontSize: "1rem",
    outline: "none",
  },
  select: {
    background: "transparent",
    border: "none",
    borderBottom: "2px solid",
    padding: 8,
    fontSize: "1rem",
    outline: "none",
  },
  textarea: {
    background: "transparent",
    border: "none",
    borderBottom: "2px solid",
    padding: 8,
    fontSize: "1rem",
    outline: "none",
    minHeight: 80,
  },
  navButtons: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 15,
  },
  backBtn: {
    padding: "10px 20px",
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#000",
    cursor: "pointer",
    background: "none",
    border: "none",
    outline: "none",
  },
  nextBtn: {
    padding: "10px 20px",
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#000",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    background: "none",
    border: "none",
    outline: "none",
  },
  proceedWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: 30,
  },
  proceedBtn: {
    padding: "10px 20px",
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#000",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    background: "none",
    border: "none",
    outline: "none",
  },
};

export default RegistrationForm;
