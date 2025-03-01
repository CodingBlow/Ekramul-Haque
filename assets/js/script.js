

const logoData =
  "https://images-platform.99static.com//J5qrmXmfrWVnvaGUmd4eMdAVfBA=/0x0:960x960/fit-in/590x590/projects-files/28/2810/281005/19c9949e-676b-4615-a6b9-7d61d4611943.png";
const ICONS = {
  user: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAXElEQVR4nGNgGAWjgJGauqOiopj+/v37PzH40aNH/5mYmP4T1VBUVMT09+/f/8Tgv3///mdiYvqPV0NUVBTTnz9//hOD//z585+Jiek/Tg1RUVFMv3///k8M/vXr138mJqb/ABk2GP+6mQxJAAAAAElFTkSuQmCC",
  phone: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAhUlEQVR4nK2S0QqAIBAE+7YvKugDgiAIIugP+oD6p4IgCIIgCILoA+r/1e7VhW7H3uPA7jAzu3tC/BSllB2GYTvP8x5A3ff9sq7rJY7jBQAkSXJomqYCACmlHcdx2/d9CwB1XZ/SNN0BgOM4F2vtFQBijLkZY3YAIKXcW2svACCE2FprLwDAGNt3XbcEAM75qW3bJQAIIU5N0ywB4A1S7h/0rD9iBgAAAABJRU5ErkJggg==",
  calendar: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAvElEQVR4nK2S0QqCQBBF5yN7qYgK+oAgqBdJH6R+SURBEBRRZFFBvYj6/1WrO9miZmtHHM7l3rlnZ2YH+EeUUrX3vg4h1ADqvu8XWutJlmUzY8y6KIqNc24VQtgAqKMoGmqtF957E0JYx3E8BQCl1Mx7b0MIS2PMHABijJmHEE5lWc4BQAgxdc6dnXNTACDn3M5aOwEAcs4dnHNTAFBKzay1RwAgrfXWWjsGAGPMzlhrJwBgrd1ba8cA/wYAfhZFt1j0wN0AAAAASUVORK5CYII=",
  notes: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAwElEQVR4nK2S0QqCQBBF5yN7qYgK+oAgqBdJH6R+SURBEBRRZFFBvYj6/1WrO9miZmtHHM7l3rlnZ2YH+EeUUrX3vg4h1ADqvu8XWutJlmUzY8y6KIqNc24VQtgAqKMoGmqtF957E0JYx3E8BQCl1Mx7b0MIS2PMHABijJmHEE5lWc4BQAgxdc6dnXNTACDn3M5aOwEAcs4dnHNTAFBKzay1RwAgrfXWWjsGAGPMzlhrJwBgrd1ba8cA/wYAfhZFt1j0wN0AAAAASUVORK5CYII=",
};

// Form Submission Handler
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded"); // Confirm DOM is ready
  const form = document.getElementById("appointment-form");
  if (!form) {
    console.error("Appointment form not found");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log("Appointment form submitted");

    // Form Elements
    const elements = {
      name: document.getElementById("name"),
      age: document.getElementById("age"),
      phone: document.getElementById("phone"),
      address: document.getElementById("address"),
      date: document.getElementById("date"),
      weight: document.getElementById("weight"),
      message: document.getElementById("message"),
    };

    // Validate Elements
    if (Object.values(elements).some((el) => !el)) {
      console.error("Form elements missing:", Object.keys(elements).filter(key => !elements[key]));
      showError("Form elements missing");
      return;
    }

    // Get Current Time Automatically
    const appointmentTime = new Date().toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    // Get Values
    const formData = {
      patientName: elements.name.value,
      age: elements.age.value,
      phone: elements.phone.value,
      address: elements.address.value,
      date: elements.date.value,
      appointmentTime: appointmentTime,
      weight: elements.weight.value,
      message: elements.message.value || "N/A",
      timestamp: Date.now(),
    };
    console.log("Form data:", formData);

    try {
      showLoading();
      console.log("Saving to Firebase");

      // Save to Firebase
      const newRef = database.ref("appointments").push();
      await newRef.set(formData);
      console.log("Data saved to Firebase with key:", newRef.key);

      // Generate Professional PDF
      if (!window.jspdf || !window.jspdf.jsPDF) {
        throw new Error("jsPDF library not loaded");
      }
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      console.log("PDF generation started");

      // 1. Professional Color Scheme (Dark Blue & Gold)
      const primaryColor = [15, 28, 63];
      const accentColor = [212, 175, 55];
      const neutralColor = [100, 100, 100];

      // 2. Letterhead-Style Header
      doc.setFillColor(...primaryColor);
      doc.rect(0, 0, 210, 40, "F");
      doc.addImage(logoData, "PNG", 160, 8, 35, 25);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...accentColor);
      doc.setFontSize(14);
      doc.text("Dr. Ekramul Haque", 15, 20);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(255, 255, 255);
      doc.text("Specialist in Paralysis & Neuro Rehabilitation", 15, 26);
      doc.text("Personalized Care with Advanced Treatment", 15, 31);

      // 3. Watermark Security Feature
      doc.setTextColor(200, 200, 200);
      doc.setFontSize(80);
      doc.text("OFFICIAL", 40, 220, { angle: 45 });
      doc.text("USE ONLY", 60, 240, { angle: 45 });

      // 4. Modern Typography Layout
      doc.setFontSize(20);
      doc.setTextColor(...primaryColor);
      doc.setFont("helvetica", "bold");
      doc.text("APPOINTMENT CONFIRMATION", 105, 60, { align: "center" });

      // 5. Grid Layout with Backgrounds
      const startY = 70;

      // Patient Information Block
      doc.setFillColor(245, 245, 245);
      doc.roundedRect(10, startY, 190, 60, 3, 3, "F");
      doc.setFontSize(12);
      doc.setTextColor(...primaryColor);
      doc.text("PATIENT INFORMATION", 20, startY + 8);
      doc.setFontSize(10);
      doc.setTextColor(40, 40, 40);

      const patientDetails = [
        { icon: ">", label: "Patient Name", value: formData.patientName },
        { icon: ">", label: "Age", value: formData.age },
        { icon: ">", label: "Phone", value: formData.phone },
        { icon: ">", label: "Address", value: formData.address },
        { icon: ">", label: "Weight (kg)", value: formData.weight },
      ];

      patientDetails.forEach((detail, index) => {
        const yPos = startY + 15 + index * 7;
        doc.text(`${detail.icon}  ${detail.label}:`, 20, yPos);
        doc.text(detail.value, 60, yPos);
      });

      // Appointment Details
      doc.setFontSize(12);
      doc.setTextColor(...primaryColor);
      doc.text("APPOINTMENT DETAILS", 20, startY + 75);
      doc.setFontSize(10);

      const appointmentData = [
        ["> Date", formData.date],
        ["> Time", formData.appointmentTime],
        ["> Notes", formData.message],
      ];

      appointmentData.forEach(([label, value], index) => {
        const yPos = startY + 83 + index * 7;
        doc.setTextColor(...primaryColor);
        doc.text(label, 20, yPos);
        doc.setTextColor(40, 40, 40);
        doc.text(value, 60, yPos);
      });

      // 8. Terms & Conditions
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(
        "_________________________________________________________________________",
        15,
        245
      );
      doc.setFontSize(8);
      const terms = [
        "TERMS & CONDITIONS:",
        "1. Appointments must be cancelled/rescheduled at least 24 hours in advance",
        "2. Late arrivals beyond 15 minutes may require rescheduling",
        "3. Clinic is not responsible for lost personal belongings",
        "4. Insurance claims must be filed within 7 days of service",
        "5. Prescription refills require 48 hours notice",
      ];
      terms.forEach((term, index) => {
        doc.text(term, 20, 250 + index * 4);
      });

      // 9. Security Features Section
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text("Document Security Features:", 20, 280);
      doc.text(
        "• UV-reactive ink • Microprint border • Unique holographic pattern",
        20,
        284
      );

      // 10. Corporate Footer
      doc.setFillColor(...primaryColor);
      doc.rect(0, 277, 210, 10, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8);
      doc.text("CONFIDENTIAL - For official use only", 15, 283);
      doc.text("Page 1 of 1", 190, 283, { align: "right" });

      // 11. Embossed Seal Effect
      doc.setLineWidth(0.5);
      doc.setDrawColor(...accentColor);
      doc.ellipse(160, 120, 15, 15, "D");
      doc.setFontSize(9);
      doc.setTextColor(...accentColor);
      doc.text("OFFICIAL\nSEAL", 160, 120, { align: "center" });

      // Save PDF
      doc.save(`Appointment_${newRef.key}.pdf`);
      console.log("PDF saved");

      // Explicitly show success message
      showSuccess();
      console.log("Success message triggered");
      e.target.reset();
    } catch (error) {
      console.error("Error in form submission:", error);
      showError(error.message);
    } finally {
      hideLoading();
      console.log("Loading hidden");
    }
  });
});

// Utility Functions
function showLoading() {
  const loading = document.querySelector("#appointment-form .loading");
  if (loading) {
    loading.style.display = "block";
    console.log("Loading shown");
  } else {
    console.error("Loading element not found");
  }
  hideMessages();
}

function hideLoading() {
  const loading = document.querySelector("#appointment-form .loading");
  if (loading) {
    loading.style.display = "none";
    console.log("Loading hidden");
  } else {
    console.error("Loading element not found");
  }
}

function showSuccess() {
  const sentMessage = document.querySelector("#appointment-form .sent-message");
  if (sentMessage) {
    sentMessage.style.display = "block";
    console.log("Success message displayed");
  } else {
    console.error("Sent message element not found");
  }
  const errorMessage = document.querySelector("#appointment-form .error-message");
  if (errorMessage) errorMessage.style.display = "none";
}

function showError(message) {
  const errorMessage = document.querySelector("#appointment-form .error-message");
  if (errorMessage) {
    errorMessage.style.display = "block";
    errorMessage.textContent = message;
    console.log("Error message displayed:", message);
  } else {
    console.error("Error message element not found");
  }
  const sentMessage = document.querySelector("#appointment-form .sent-message");
  if (sentMessage) sentMessage.style.display = "none";
}

function hideMessages() {
  const sentMessage = document.querySelector("#appointment-form .sent-message");
  const errorMessage = document.querySelector("#appointment-form .error-message");
  if (sentMessage) {
    sentMessage.style.display = "none";
    console.log("Sent message hidden");
  } else {
    console.error("Sent message element not found");
  }
  if (errorMessage) {
    errorMessage.style.display = "none";
    console.log("Error message hidden");
  } else {
    console.error("Error message element not found");
  }
}