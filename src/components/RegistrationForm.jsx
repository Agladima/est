import React, { useState } from "react";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";

const RegistrationForm = () => {
  const totalSteps = 4;
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    dob: "",
    lc: "",
    yearJoined: "",
    role: "",
    firstConference: "",
    expectations: "",
    socialHandle: "",
    allergies: "",
    antidote: "",
    roomSharing: "",
    emergencyContact: "",
    relationship: "",
    specialInstructions: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const nextStep = () =>
    currentStep < totalSteps && setCurrentStep(currentStep + 1);
  const prevStep = () => currentStep > 1 && setCurrentStep(currentStep - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    currentStep === totalSteps
      ? alert("Form submitted: " + JSON.stringify(formData, null, 2))
      : nextStep();
  };

  // 🎨 Theme colors for each step
  const themes = {
    1: { leftBg: "#FBB90A", rightBg: "#fff", inputBg: "#000", text: "#fff" }, // Yellow
    2: { leftBg: "#2BB20B", rightBg: "#fff", inputBg: "#000", text: "#fff" }, // Green
    3: { leftBg: "#4126AB", rightBg: "#fff", inputBg: "#000", text: "#fff" }, // Purple
    4: { leftBg: "#E50E28", rightBg: "#fff", inputBg: "#000", text: "#fff" }, // Red
  };

  const theme = themes[currentStep];

  return (
    <div style={styles.wrapper}>
      {/* Left Side */}
      <div style={{ ...styles.left, backgroundColor: theme.leftBg }}>
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
        <h1 style={styles.bigText}>
          STEP <br /> INTO THE <br />
          <span style={styles.nextWord}>NEXT</span>
        </h1>
      </div>

      {/* Right Side */}
      <div style={{ ...styles.right, backgroundColor: theme.rightBg }}>
        <div style={styles.topBar}>
          <span>
            {currentStep}/{totalSteps}
          </span>
          <span style={styles.icon}>⏺</span>
        </div>

        <form style={styles.form} onSubmit={handleSubmit}>
          {/* Step 1 */}
          {currentStep === 1 && (
            <>
              <Input
                label="NAME"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                theme={theme}
              />
              <Input
                label="EMAIL ADDRESS"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                theme={theme}
              />
              <Select
                label="GENDER"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                options={["Male", "Female", "Other"]}
                theme={theme}
              />
              <Input
                label="DATE OF BIRTH"
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                theme={theme}
              />
            </>
          )}

          {/* Step 2 */}
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
              />
              <Select
                label="YEAR YOU JOINED AIESEC"
                name="yearJoined"
                value={formData.yearJoined}
                onChange={handleChange}
                options={["2020", "2021", "2022", "2023", "2024", "2025"]}
                theme={theme}
              />
              <Select
                label="ROLE"
                name="role"
                value={formData.role}
                onChange={handleChange}
                options={["TM", "TL", "LCVP", "LCP", "MCVP", "MCP"]}
                theme={theme}
              />
              <Input
                label="FIRST CONFERENCE"
                type="text"
                name="firstConference"
                value={formData.firstConference}
                onChange={handleChange}
                theme={theme}
              />
            </>
          )}

          {/* Step 3 */}
          {currentStep === 3 && (
            <>
              <Input
                label="EXPECTATIONS"
                type="text"
                name="expectations"
                value={formData.expectations}
                onChange={handleChange}
                theme={theme}
              />
              <Input
                label="SOCIAL MEDIA HANDLE"
                type="text"
                name="socialHandle"
                value={formData.socialHandle}
                onChange={handleChange}
                theme={theme}
              />
              <Input
                label="ALLERGIES"
                type="text"
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
                theme={theme}
              />
              <Input
                label="ANTIDOTE"
                type="text"
                name="antidote"
                value={formData.antidote}
                onChange={handleChange}
                theme={theme}
              />
            </>
          )}

          {/* Step 4 */}
          {currentStep === 4 && (
            <>
              <Select
                label="ROOM SHARING"
                name="roomSharing"
                value={formData.roomSharing}
                onChange={handleChange}
                options={["Yes", "No"]}
                theme={theme}
              />
              <Input
                label="EMERGENCY CONTACT"
                type="text"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                theme={theme}
              />
              <Input
                label="RELATIONSHIP WITH CONTACT"
                type="text"
                name="relationship"
                value={formData.relationship}
                onChange={handleChange}
                theme={theme}
              />
              <Textarea
                label="SPECIAL INSTRUCTIONS"
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleChange}
                theme={theme}
              />
            </>
          )}

          {/* Nav Buttons */}
          <div style={styles.navButtons}>
            {currentStep > 1 && (
              <button type="button" onClick={prevStep} style={styles.backBtn}>
                <FaLongArrowAltLeft style={{ marginRight: "6px" }} /> Back
              </button>
            )}
            <button type="submit" style={styles.nextBtn}>
              {currentStep === totalSteps ? (
                <>
                  Submit <FaLongArrowAltRight style={{ marginLeft: "6px" }} />
                </>
              ) : (
                <>
                  Next <FaLongArrowAltRight style={{ marginLeft: "6px" }} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* Small reusable components */
const Input = ({ label, theme, ...props }) => (
  <div style={{ ...styles.inputGroup, background: theme.inputBg }}>
    <label style={{ ...styles.label, color: theme.text }}>{label}</label>
    <input
      {...props}
      style={{
        ...styles.input,
        borderBottomColor: theme.text,
        color: theme.text,
      }}
    />
  </div>
);

const Select = ({ label, name, value, onChange, options, theme }) => (
  <div style={{ ...styles.inputGroup, background: theme.inputBg }}>
    <label style={{ ...styles.label, color: theme.text }}>{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      style={{
        ...styles.select,
        borderBottomColor: theme.text,
        color: theme.text,
        backgroundColor: theme.inputBg,
      }}
    >
      <option value="" style={{ color: "#000", background: "#fff" }}>
        Select
      </option>
      {options.map((opt) => (
        <option
          key={opt}
          value={opt}
          style={{ color: "#000", background: "#fff" }}
        >
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const Textarea = ({ label, theme, ...props }) => (
  <div style={{ ...styles.inputGroup, background: theme.inputBg }}>
    <label style={{ ...styles.label, color: theme.text }}>{label}</label>
    <textarea
      {...props}
      style={{
        ...styles.textarea,
        borderBottomColor: theme.text,
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
    color: "#000",
  },
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
  bigText: {
    fontSize: "4rem",
    lineHeight: 1.1,
    textTransform: "uppercase",
    marginTop: 60,
  },
  nextWord: { fontSize: "6rem", fontWeight: "bold" },
  right: {
    flex: 1,
    padding: 50,
    display: "flex",
    flexDirection: "column",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 40,
    fontWeight: "bold",
  },
  icon: { fontSize: "1.5rem" },
  form: { display: "flex", flexDirection: "column", gap: 20 },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    padding: "10px 15px",
  },
  label: {
    fontSize: "0.8rem",
    fontWeight: "bold",
    marginBottom: 5,
  },
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
    justifyContent: "space-between",
    marginTop: 30,
  },
  backBtn: {
    padding: "10px 20px",
    fontSize: "1rem",
    fontWeight: "bold",
    border: "none",
    background: "transparent",
    color: "#000",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  nextBtn: {
    padding: "10px 20px",
    fontSize: "1rem",
    fontWeight: "bold",
    border: "none",
    background: "transparent",
    color: "#000",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
};

export default RegistrationForm;
